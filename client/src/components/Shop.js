import React, { useState } from 'react';
import './css/Shop.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import ImageGallery from './ImageGallery';
import { ImArrowRight2 } from "react-icons/im";

//     ____  __  __    ____   ____   ____    ____
//    / __ \/\ \ \ \  / ___\ / ___\ / __ \  / ___\
//   /\ \_\ \ \ \ \ \/\ \__//\ \__//\ \_\ \/\ \__/_
//   \ \  __<\ \ \ \ \ \  __\ \  __\ \  __ \ \____ \
//    \ \ \_\ \ \ \_\ \ \ \_/\ \ \_/\ \ \ \ \/____\ \
//     \ \____/\ \____/\ \_\  \ \_\  \ \_\ \_\/\____/
//      \/___/  \/___/  \/_/   \/_/   \/_/\/_/\/___/

function Shop() {

  // Create constants for navigating
  const navigate = useNavigate();

  // Redirection to home for cube button 
  const goToHomePage = () => {
    navigate('/'); // Navigate to the /shop route
  }


  // INITIALISE VARIABLES FOR SIZE AND TOGGLES

  const [selectedSize, setSelectedSize] = useState('');  
  const [modelInfoVisible, setModelInfoVisible] = useState(false);
  const [hoodieInfoVisible, setHoodieInfoVisible] = useState(false);
  const [sizeInfoVisible, setSizeInfoVisible] = useState(false);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const toggleModelInfo = () => {
    setModelInfoVisible(!modelInfoVisible);
  };

  const toggleHoodieInfo = () => {
    setHoodieInfoVisible(!hoodieInfoVisible);
  };

  const toggleSizeInfo = () => {
    setSizeInfoVisible(!sizeInfoVisible);
  };


  // LOGIC TO  MAP THE SELECTION TO THE ACTUAL SIZE

  const sizeToIdMap = {
    'Size XL': 'XL',
    'Size L': 'L',
    'Size M': 'M'
  };
    
  const getSizeId = (size) => {
    return sizeToIdMap[size] || null; // Return null if the size is not found
  }
  const sizeId = getSizeId(selectedSize);


  // REDIRECT TO CHECKOUT once the size is selected

  const goToCheckoutPage = () => {
    if (selectedSize !== '') {
      navigate(`/checkout?size=${sizeId}`);
    } else {
      // Handle the case when no size is selected
      console.error("Please select a size before proceeding to checkout");
    }
  }


  // LOGIC FOR THE COLOURFUL TITLE AND THE BUTTON

  const hexValues = [
    '#0062ff',  // buffas blue
    '#01954B',  // green
    '#993E9B',  // purple
    '#EA202A',  // red
    '#FFC900',  // yellow
    '#EC7399',  // pink
    '#F15B2A',  // orange
    '#6BCADD',  // orange
    '#5938A7',  // dark purple
    '#0fa33b',  // green
    '#1abfed'   // cyan clue
  ];

  const getRandomColor = () => {
      const randomColor = hexValues[Math.floor(Math.random() * 11)];
      return randomColor;

  };

  const buttonStyle = {backgroundColor: getRandomColor()};

  const renderColoredTitle = () => {
    const title = 'BUFFAS';

    return title.split('').map((letter, index) => (
      <span className="letter" key={index} style={{ color: getRandomColor() }}>{letter}</span>
    ));
  };


  return (
    <div id="shop-body">
      <button className="tl-cube-button" onClick={goToHomePage}></button>
      <div id="shop-info">
        <h1 id="shop-title">{renderColoredTitle()}</h1>
        <div id="shop-layout">
          <div className="shop-image-gallery" >
            <ImageGallery />          
          </div>
          <div className='shop-hoodie-info'>
            <div className="shop-size-dropdown">
              <h2>
                <span className="title-letter">P</span>
                <span className="title-letter">i</span>
                <span className="title-letter">l</span>
                <span className="title-letter">o</span>
                <span className="title-letter">t</span>
                <span >&nbsp;</span>
                <span className="title-letter">H</span>
                <span className="title-letter">o</span>
                <span className="title-letter">o</span>
                <span className="title-letter">d</span>
                <span className="title-letter">i</span>
                <span className="title-letter">e</span>
              </h2>
              <p>
                Selected size:  &nbsp; 
                <select value={selectedSize} onChange={handleSizeChange}>
                  <option value="">Select a size </option>
                  <option value="Size M">M</option>
                  <option value="Size L">L</option>
                  <option value="Size XL">XL</option>
                </select>
              </p>
              
            </div>
            <div className="shop-toggle-section"onClick={toggleModelInfo}>
                Models Information
              <span className="material-symbols-outlined">
                expand_more
              </span>
              {modelInfoVisible && (
                <div className="toggle-content">
                  <p style={{ color: '#545454' }}>
                    Name: &nbsp; Keerthika<br /><br />
                    Height: &nbsp; 162 cm<br /><br />
                    About Her: &nbsp; Hey there, I'm Keerthika, from Wales with Eelam Tamil roots. Right now, I'm on a break from studying medicine at King's College London to get a degree in Management from Imperials Business School.
                    I'm a big spender when it comes to flights! This year, I've got Vietnam, Indonesia, and Brazil in my sights. I'm especially excited about driving along the Ha Giant loop on a motorbike.
                    Oh, and here's a fun fact about me: I've got a tattoo dedicated to ACDC.<br /><br /><br />
                    Name: &nbsp; Travis<br /><br />
                    Height: &nbsp; 180 cm<br /><br />
                    About Him: Hey, I'm Travis! I'm originally from Somerset, but currently I work in London's financial services sector. Beyond this, I find joy in the realms of creativity, with a keen interest in holistic design and 20th century art. In my spare time I'm a runner and an enthusiastic rugby fan.<br /></p>
                </div>
              )}
            </div>
            <div className="shop-toggle-section" onClick={toggleHoodieInfo}>
                Hoodie Details
              <span className="material-symbols-outlined">
                expand_more
              </span>
              {hoodieInfoVisible && (
                <div className="toggle-content">
                  <p style={{ color: '#545454' }}>
                    Oversize sweatshirt 100% cotton with embroidered design on the front. The oversized fit and loose sleeves make it a garment versatile, comfortable and perfect for all seasons. <br /><br />
                    Through a personalised brand label, BUFFAS demonstrates high quality and attention to detail through a colourful and timeless first design.
                  </p>
                </div>
              )}
            </div>
            <div className="shop-toggle-section" onClick={toggleSizeInfo}>
                Sizes Table
              <span className="material-symbols-outlined">
                expand_more
              </span>
              {sizeInfoVisible && (
                <div className="toggle-content">
                  <p style={{ color: '#545454' }}>Here is a table with the sizes in cm.</p>
                  <div id="center-image-container">
                      <img id="sizes-table-image" src="sizes_chart.png" alt="Sizes Chart" />
                  </div>
                  <p style={{ color: '#545454' }}>Our recommendation is, the hoodie is meant to be oversized, so choose the size you normally use. For an extreme oversize, choose one size bigger.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {selectedSize !== '' && (
          <div id="center-buy-button" onClick={goToCheckoutPage}>
            <button id='buy-button' className="buffas-themed-button" style={buttonStyle}>PROCEED TO CHECKOUT <ImArrowRight2 /></button>
          </div>
        )}
      </div>
    </div>
  );
}

      export default Shop;