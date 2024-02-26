import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './css/ImageGallery.css'; // Import your custom CSS file

const images = [
    'IMG_5690.jpg',
    'IMG_5756.jpg',
    'IMG_5608.jpg',
    'IMG_5618.jpg',
    'IMG_5754.jpg',
];    

const ImageGallery = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: dots => (
      <div style={{ position: 'relative', bottom: '10px', width: '100%' }}>
        <ul style={{ margin: '0', padding: '0', textAlign: 'center' }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="slide">
            <img src={image} alt={`Imagen ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageGallery; 