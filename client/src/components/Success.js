import { React, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Success() {
    const navigate= useNavigate()
    const goToHomePage = () => {
      navigate('/'); // Navigate to the /shop route
    }

    // Get the query string from the URL
    const queryString = window.location.search;

    // Create a new URLSearchParams object with the query string
    const params = new URLSearchParams(queryString);

    // Initialize an empty object to store the form data
    const formData = {};

    // Iterate over each parameter and assign its value to the formData object
    for (const [key, value] of params.entries()) {
      formData[key] = value;
    }

    // Handle purchase 
    const handlePurchase = async () => {
        try {
            console.log('handle purchase function called with', JSON.stringify(formData))
            const response = await fetch('http://localhost:4000/handle-purchase', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
    
            const responseData = await response.json();
            console.log(responseData.message); // Log success message
        } catch (error) {
            console.error('Error decreasing stock:', error.message);
        }
    };

    const email = formData.email

    const sendEmail = async () => {
        try {
            const response = await fetch('http://localhost:4000/send-email', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email})
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
    
            const responseData = await response.json();
            console.log(responseData.message); // Log success message
        } catch (error) {
            console.error('Error decreasing stock:', error.message);
        }
    }

    console.log(formData)

    useEffect(() => {
      handlePurchase()
      sendEmail()
    }, []);
  
    return (
        <div>
            <button className="tl-cube-button" onClick={goToHomePage}>
                HOME
            </button>
            THANK YOU FOR THE PAYMENT, THIS IS THE SUCCESS PAGE 
        </div>
    );
    
}

export default Success