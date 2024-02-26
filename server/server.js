//
require('dotenv').config();
const express = require("express");
const cors = require('cors');
const nodemailer = require('nodemailer');

// get secured keys from .env
const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY
const CLIENT_URL = process.env.CLIENT_URL
const MAIL = process.env.MAIL

const app = express();
app.use(cors({
  origin: CLIENT_URL
}));
app.use(express.json());

const stripe = require("stripe")(STRIPE_PRIVATE_KEY)

const storeItems = new Map([
  [1, {  name: "Buffas hoodie  M", priceInCents: 3500 }],
  [2, {  name: "Buffas hoodie  L", priceInCents: 3500 }],
  [3, {  name: "Buffas hoodie  XL", priceInCents: 3500 }],
]);

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: MAIL,
    pass: process.env.MAIL_APP_PASSWORD // Use an app password if 2-factor authentication is enabled
  }
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    console.log(req.body.items)
    const formData = req.body.formData
    console.log(formData)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id);
        console.log(storeItem)
        return {
          price_data: {
            currency: 'eur',
            product_data: {
              name: storeItem.name, // Assuming storeItem has a 'name' property
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: 1,
        };
      }),
      custom_fields: [{
        // Custom fields if needed
      }],
      success_url: CLIENT_URL + `/success`,
      cancel_url: CLIENT_URL + `/shop`,
    });


    // DECREASES THE STOCK BY 1

    try {
        const product_name = formData.item_type
        const size = formData.size
        const response = await fetch('http://localhost:4000/decrease-stock', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'
            },
            body: JSON.stringify({ product_name, size })
        });
        // check for errors
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }
        const responseData = await response.json();
        console.log(responseData.message); // Log success message


          // HERE IT ADDS A CUSTOMER INTO THE CUSTOMERS TABLE 
          // ONLY IF STOCK IS DECREASED IT CREATES A NEW CUSTOMER
          
        try {
            console.log('\nSending POST request to server'); // Log a message before sending the POST request
            const response = await fetch('http://localhost:4000/customers', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', // Set Content-Type header
                },
                body: JSON.stringify(formData), // Convert form data to JSON
            });
            console.log('POST request sent successfully'); // Log a message after successfully sending the POST request
            // check for errors
            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error);
            }
            console.log('Data added successfully'); // Data successfully added to the database
        } catch (error) {
            console.error('Error adding data:', error);
        }
      
    } catch (error) {
        console.error('Error decreasing stock:', error.message);
    }


    // SENDING EMAILS TO US AND THE CLIENT

    // Send email to the client
    const mailOptions = {
      from: MAIL,
      to: formData.email,
      subject: 'Order Confirmation',
      text: 'Thank you very much for the shop.'
    };
    
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    // // Send email to us
    // const mailOptionsForBuffas = {
    //   from: process.env.MAIL,
    //   to: process.env.MAIL,
    //   subject: 'Order Confirmation',
    //   text: 'Thank you very much for the shop.'
    // };
    
    // transporter.sendMail(mailOptionsForBuffas, function(error, info) {
    //   if (error) {
    //     console.error('Error sending email:', error);
    //   } else {
    //     console.log('Email sent:', info.response);
    //   }
    // });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});




const bodyParser = require('body-parser');
const mysql = require('mysql');


// MYSQL REQUEST

// create mysql conection 
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

app.use(bodyParser.json());

app.post('/customers', (req, res) => {
  const { name, surname, email, city, country, post_code, street, flat, item_type, size } = req.body;

  const values = [name, surname, email, city, country, post_code, street, flat, item_type, size];

  connection.query(process.env.MYSQL_POST, values, (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'An error occurred while inserting data' });
    } else {
      console.log('Data inserted successfully:', results);
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  });
});

app.put('/decrease-stock', (req, res) => {
  const { product_name, size } = req.body;

  // Check the current stock before updating
  connection.query(process.env.MYSQL_GET_STOCK, [product_name, size], (error, results) => {
      console.log(product_name, size)
      if (error) {
          console.error('Error getting stock:', error);
          res.status(500).json({ error: 'An error occurred while fetching stock' });
      } else {
          if (results.length === 0 ) {
              // If no stock information is found or the stock is already <= 5, do not update
              res.status(400).json({ error: 'There is no such a size' });}
          else if (results[0].stock_quantity <= 7){
            res.status(400).json({ error: 'Stock is already 7 or less' });
          
          } else {
              // Proceed with the update
              connection.query(process.env.MYSQL_PUT, [product_name, size], (error, results) => {
                  if (error) {
                      console.error('Error updating stock:', error);
                      res.status(500).json({ error: 'An error occurred while updating stock' });
                  } else {
                      if (results.affectedRows === 0) {
                          // If no rows were affected, it means the product with the given name and size doesn't exist
                          res.status(404).json({ error: 'Product not found' });
                      } else {
                          // Success message
                          console.log('Stock retrieved successfully:', results);
                          res.status(200).json({ message: 'Stock updated successfully' });
                      }
                  }
              });
          }
      }
  });
});

app.get('/get-stock', (req, res) => {
  const { product_name, size } = req.query; // Retrieve parameters from query string
  connection.query(process.env.MYSQL_GET_STOCK, [product_name, size], (error, results) => {
    if (error) {
        console.error('Error getting stock:', error);
        res.status(500).json({ error: 'An error occurred while fetching stock' });
    } else {
      if (results.length === 0 ) {
        // If no stock information is found do not update
        res.status(400).json({ error: 'There is no such a size' });}
      else{
        const stockQuantity = results[0].stock_quantity;
        console.log(`Stock for size ${size} checked successfully:`, stockQuantity);
        //res.status(200).json({ message: 'Stock updated successfully', stockQuantity });
        res.status(200).json({ stockQuantity });
      }
    }
  });
});

app.post('/send-mail', (req, res) => {
  try {
    

    // Sending email
    const mailOptionsForBuffas = {
      from: MAIL,
      to: MAIL,
      subject: 'Order Confirmation',
      text: 'Thank you very much for the shop.'
    };
    
    transporter.sendMail(mailOptionsForBuffas, function(error, info) {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


app.listen(4000, () => console.log("Node server listening on port 4000!"));