import { React, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

function Success() {
    const navigate= useNavigate()
    const goToHomePage = () => {
      navigate('/'); // Navigate to the /shop route
    }
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Define your form field names here
    const requiredFields = ['name', 'surname', 'email', 'country', 'city', 'posstcode', 'steet', 'flat', 'item_type', 'size',]; // Example required fields

    useEffect(() => {
        // Check if all required fields exist in the URL parameters
        const missingFields = requiredFields.filter(field => !queryParams.has(field));
        
        if (missingFields.length > 0) {
            // Redirect to home page if any required field is missing
            goToHomePage();
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
              </h2>
            </div>
            <div id="textcontainer">
                Thank you so much ${formData.name} foro your purchase
            </div>
            <button className='buffas-themed-button' id='understood-policy-btn' onClick={goToHomePage}>Understood</button>
          </div>
        </div>  
      </div>
    );
    
}

export default Success