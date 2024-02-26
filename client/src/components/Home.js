import React from 'react';
import './css/Home.css';
import { useNavigate } from 'react-router-dom';
import MyModel from './Model';
import { FaMusic, FaNewspaper } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import { SiVlcmediaplayer } from "react-icons/si";

function Home() {

    const navigate = useNavigate();

    const goToShopPage = () => {
      navigate('/shop'); // Navigate to the /shop route
    }
    const goToSpotifyPage = () => {
      navigate('/spotify'); // Navigate to the /spotify route
    }
    const goToNewsletterPage = () => {
      navigate('/newsletter'); // Navigate to the /newsletter route
    }
    const goToSubscriptionPage = () => {
      navigate('/subscription'); // Navigate to the /newsletter route
    }

    return (
      <div id="home-body">
        
        <button className='home-button' id="top-left-button" onClick={goToSpotifyPage}> MUSIC <FaMusic /></button>
        <button className='home-button' id="top-right-button" onClick={goToShopPage}> SHOP <FaShoppingBag /></button>
        <div id="model-container">
          <MyModel />
        </div>
        <button className='home-button' id="bottom-left-button" onClick={goToNewsletterPage}> NEWSLETTER <FaNewspaper /> </button>
        <button className='home-button' id="bottom-right-button" onClick={goToSubscriptionPage}> SUBSCRIPTION <SiVlcmediaplayer /></button>

      </div>
    );    
}

export default Home;
