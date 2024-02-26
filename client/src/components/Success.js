import React from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

function Success({ hasCompletedPayment }) {
    const navigate= useNavigate()
    const goToHomePage = () => {
      navigate('/'); // Navigate to the /shop route
    }

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
  

    if (token) {
        return (
            <div>
                <button className="tl-cube-button" onClick={goToHomePage}>
                    HOME
                </button>
                THANK YOU FOR THE PAYMENT, THIS IS THE SUCCESS PAGE 
            </div>
        );
      } else {
        // Redirect to home page or another appropriate page if payment status is not 'success'
        return <Navigate to="/shop" />;
      }
    
}

export default Success