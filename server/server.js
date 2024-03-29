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


// PAYMENTS

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

app.post("/create-checkout-session", async (req, res) => {
  try {
    const formData = req.body
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
      success_url: CLIENT_URL + `/success?${new URLSearchParams(formData).toString()}`,
      cancel_url: CLIENT_URL + `/shop`,
    });

    res.json({ url: session.url });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



// MYSQL REQUEST

const bodyParser = require('body-parser');
const mysql = require('mysql');

// create mysql conection 
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

app.use(bodyParser.json());

// Mysql calls to the server
app.put('/handle-purchase', (req, res) => {
  const formData = req.body;
  const product_name = formData.item_type;

  const { name, surname, email, city, country, post_code, street, flat, item_type, size } = formData;
  const values = [name, surname, email, city, country, post_code, street, flat, item_type, size];


  // Check the current stock before updating
  connection.query(process.env.MYSQL_GET_STOCK, [product_name, size], (error, results) => {
      if (error) {
          console.error('Error getting stock:', error);
          res.status(500).json({ error: 'An error occurred while fetching stock' });
      } else {
          if (results.length === 0 ) {
                // If no stock information is found or the stock is already <= 5, do not update
                console.error('There is not enough stock:', error);
                res.status(400).json({ error: 'There is no such a size' });}
          else if (results[0].stock_quantity > 10){

                res.status(400).json({ error: 'Stock is already 0 or less' });
          } else {

              // Proceed with the update in the stock
              connection.query(process.env.MYSQL_PUT, [product_name, size], (error, results) => {
                  if (error) {
                      console.error('Error updating stock:', error);
                      res.status(500).json({ error: 'An error occurred while updating stock' });
                  } else {
                      console.log('Stock updated successfully:', results);
                          
                      // Create a new customer information tuple
                      connection.query(process.env.MYSQL_POST, values, (error, results) => {
                        if (error) {
                          console.error('Error inserting data:', error);
                          res.status(500).json({ error: 'An error occurred while inserting data' });
                        } else {
                          console.log('Data inserted successfully:', results);
                          res.status(200).json({ message: 'Data inserted successfully' });
                        }
                      });
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

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: MAIL,
    pass: process.env.MAIL_APP_PASSWORD // Use an app password if 2-factor authentication is enabled
  }
});

app.post('/send-email', (req, res) => {
  try {

    const buyerMail = req.body.email;
    
    // // Sending email to ourselves
    // const mailDetailsForUs = {
    //   from: MAIL,
    //   to: MAIL,
    //   subject: 'Order Confirmation',
    //   text: 'Thank you very much for the shop.'
    // };
    
    // transporter.sendMail(mailDetailsForUs, function(error, info) {
    //   if (error) {
    //     console.error('Error sending email to yourself:', error);
    //   } else {
    //     console.log('Email sent to yourself:', info.response);
    //   }
    // });

    // Sending email to the customer
    const mailDetailsForBuyer = {
      from: MAIL,
      to: buyerMail,
      subject: 'Order Confirmation',
      text: 'Thank you very much for the shop.'
    };
    
    transporter.sendMail(mailDetailsForBuyer, function(error, info) {
      if (error) {
        console.error('Error sending email to buyer:', error);
      } else {
        console.log('Email sent to buyer:', info.response);
      }
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


app.listen(4000, () => console.log("Node server listening on port 4000!"));