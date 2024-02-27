import React from 'react';
import './css/Newsletter.css';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player'
import video from  '../videos/video.mp4'

//     ____  __  __    ____   ____   ____    ____
//    / __ \/\ \ \ \  / ___\ / ___\ / __ \  / ___\
//   /\ \_\ \ \ \ \ \/\ \__//\ \__//\ \_\ \/\ \__/_
//   \ \  __<\ \ \ \ \ \  __\ \  __\ \  __ \ \____ \
//    \ \ \_\ \ \ \_\ \ \ \_/\ \ \_/\ \ \ \ \/____\ \
//     \ \____/\ \____/\ \_\  \ \_\  \ \_\ \_\/\____/
//      \/___/  \/___/  \/_/   \/_/   \/_/\/_/\/___/

const Newsletter = () => {

    const navigate = useNavigate();

    const goToHomePage = () => {
      navigate('/'); // Navigate to the /shop route
    }

    return (
      <div> 
        <button className="tr-cube-button" id="black-tr-button" onClick={goToHomePage}></button>
        <div id='newsletter-container'>
          <div style={{ width: '60%' }}>
            <div id='title-container'>
              <h2 id='page-title' >
                <span className="title-letter">O</span>
                <span className="title-letter">u</span>
                <span claclassNamess="title-letter">r</span>
                <span >&nbsp;</span>
                <span className="title-letter">N</span>
                <span className="title-letter">e</span>
                <span className="title-letter">w</span>
                <span className="title-letter">s</span>
                <span className="title-letter">l</span>
                <span className="title-letter">e</span>
                <span className="title-letter">t</span>
                <span className="title-letter">t</span>
                <span className="title-letter">e</span>
                <span className="title-letter">r</span>
              </h2>
            </div>
            <div id="textcontainer">
              <p>
                Buffas is a brand began just for fun that tries to capture those iconic places in london.<br />
                This is an example of what we do:
              </p>
            </div>
            <div id="video-container">
              <ReactPlayer
              url = {video}
              controls/>
            </div>
          </div>
        </div>  
      </div>
  )
}

export default Newsletter