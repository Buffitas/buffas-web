import { React, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import './css/Success.css'

function Success() {
    const navigate= useNavigate()
    const goToHomePage = () => {
      navigate('/'); // Navigate to the /shop route
    }
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Define your form field names here
    const requiredFields = ['name', 'surname', 'email', 'country', 'city', 'post_code', 'street', 'flat', 'item_type', 'size',]; // Example required fields

    useEffect(() => {
        // Check if all required fields exist in the URL parameters
        const missingFields = requiredFields.filter(field => !queryParams.has(field));
        
        if (missingFields.length > 0) {
            // Redirect to home page if any required field is missing
            //goToHomePage();
            console.log(missingFields)
        }
    });

    // Initialize an empty object to store the form data
    const formData = {};
    
    // Iterate over each parameter and assign its value to the formData object
    for (const [key, value] of queryParams.entries()) {
      formData[key] = value;
    }

    return (
        <div> 
        <button className="tl-cube-button" id="black-tl-button" onClick={goToHomePage}></button>
        <div id='success-container'>
          <div style={{ width: '60%' }}>
            <div id='title-container'>
              <h2 id='page-title' >
                <span className="title-letter">S</span>
                <span className="title-letter">u</span>
                <span className="title-letter">c</span>
                <span className="title-letter">c</span>
                <span className="title-letter">e</span>
                <span className="title-letter">s</span>
                <span className="title-letter">f</span>
                <span className="title-letter">u</span>
                <span className="title-letter">l</span>
                <span >&nbsp;</span>
                <span className="title-letter">P</span>
                <span className="title-letter">u</span>
                <span className="title-letter">r</span>
                <span className="title-letter">c</span>
                <span className="title-letter">h</span>
                <span className="title-letter">a</span>
                <span className="title-letter">s</span>
                <span className="title-letter">e</span>
                <span className="title-letter">!</span>
              </h2>
            </div>
            <div id="textcontainer">
              <h2 style={{color: '#000000'}}>Hey, {formData.name}! Thank you for your purchase! </h2>
              <p>From the Buffas tean we would like to thank you for you purchase in our shop and hope you enjoy your hoodie.<br/>Please double check the personal information section in the email we have sent you if something is wrong or you havent received an email get in touch with us as soon as possible via email 'buffas.brand@gmail.com'.</p>
              <p style={{marginBottom: '40px'}}>Your order has been received and is being processed at right now!</p>
              <p className='small-title-success'>ORDER DETAILS:</p>
              <p>- Order number: 1234567</p>
              <p>- Estimated Delivery Date: </p>
              <p>- Order Date: 28/02/2024</p>
              <p style={{marginBottom: '40px'}}>- Size: {formData.size}</p>
            </div>
            <button className='buffas-themed-button' id='understood-policy-btn' onClick={goToHomePage}>Go Back Home</button>
          </div>
        </div>  
      </div>
    );
    
}

export default Success