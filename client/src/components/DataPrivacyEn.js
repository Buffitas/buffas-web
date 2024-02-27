import React from 'react';
import './css/DataPrivacy.css';
import { useNavigate, useLocation } from 'react-router-dom'

//     ____  __  __    ____   ____   ____    ____
//    / __ \/\ \ \ \  / ___\ / ___\ / __ \  / ___\
//   /\ \_\ \ \ \ \ \/\ \__//\ \__//\ \_\ \/\ \__/_
//   \ \  __<\ \ \ \ \ \  __\ \  __\ \  __ \ \____ \
//    \ \ \_\ \ \ \_\ \ \ \_/\ \ \_/\ \ \ \ \/____\ \
//     \ \____/\ \____/\ \_\  \ \_\  \ \_\ \_\/\____/
//      \/___/  \/___/  \/_/   \/_/   \/_/\/_/\/___/

const DataPrivacyEn = () => {

    const navigate = useNavigate();
    const location = useLocation();

    // Retrieve size from the url
    const sizeQueryParam = new URLSearchParams(location.search).get('size');
    const size = sizeQueryParam || 'Default Size'; // Provide a default size if none is specified

    const goToCheckoutPage = () => {
      navigate(`/checkout?size=${size}`); // Navigate to the /shop route
    }

    return (
      <div> 
        <button className="tl-cube-button" id="black-tl-button" onClick={goToCheckoutPage}></button>
        <div id='privacy-policy-container'>
          <div style={{ width: '60%' }}>
            <div id='title-container'>
              <h2 id='page-title' >
                <span className="title-letter">P</span>
                <span className="title-letter">r</span>
                <span className="title-letter">i</span>
                <span className="title-letter">v</span>
                <span className="title-letter">a</span>
                <span className="title-letter">c</span>
                <span className="title-letter">y</span>
                <span >&nbsp;</span>
                <span className="title-letter">P</span>
                <span className="title-letter">o</span>
                <span className="title-letter">l</span>
                <span className="title-letter">i</span>
                <span className="title-letter">c</span>
                <span className="title-letter">y</span>
              </h2>
            </div>
            <div id="textcontainer">
            Last updated: 20/02/2024<br/><br/>
            www.buffasbrand.com is committed to protecting the privacy of its users. This Privacy Policy describes how www.buffasbrand.com collects, uses and safeguards the personal information you provide through our website.<br/><br/>
            <div id="small-title-privacy"> - Information We Collect</div><br/>
              <p>
                We may collect the following personal information when you:<br/>
                  - Subscribe to our newsletter.<br/>
                  - Make a purchase on the Platform<br/>
                The information we may collect includes, but is not limited to, your first name, last name, email address, mailing address.
              </p>
              <div id="small-title-privacy"> - How We Use Your Information</div><br/>
              <p>
              We use the information collected to:<br/>
                - Process your orders and payments.<br/>
                - Send you relevant information about our products and services.<br/>
                - Improve our products and services.<br/>
                - Comply with our legal obligations.
              </p>
              <div id="small-title-privacy"> - Information Security</div><br/>
              <p>
                We are committed to protecting the security of your personal information. We implement appropriate technical and organisational measures to protect your data against unauthorised access, misuse, disclosure or destruction.
              </p>
              <div id="small-title-privacy"> - Disclosure of Information to Third Parties</div><br/>
              <p>
                We will not share your personal information with third parties without your consent, except as necessary to comply with legal obligations or to provide you with services that you have specifically requested.<br/>
              </p>
              <div id="small-title-privacy"> - Changes to this Privacy Policy</div><br/>
              <p>
                We reserve the right to update this Privacy Policy at any time. We encourage you to periodically review this page for any changes. Your continued use of our website constitutes your acceptance of these changes.
                Contact<br/>
              </p>
              If you have any questions or concerns about our Privacy Policy, please feel free to contact us at buffas.brand@gmail.com.
            </div>
            <button className='buffas-themed-button' id='understood-policy-btn' onClick={goToCheckoutPage}>Understood</button>
          </div>
        </div>  
      </div>
  )
}

export default DataPrivacyEn