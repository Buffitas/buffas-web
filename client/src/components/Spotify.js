import React from 'react'
import './css/Spotify.css'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { SiSpotify, SiApplemusic } from "react-icons/si";

const Spotify = () => {

  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/'); // Navigate to the /shop route
  }

  const goToSpotify = () => {
    window.location.href = 'https://open.spotify.com/playlist/4CVmWl6DWvONnNvkoqG1au?si=22c325389e7c46ab';
  };

  return (
    <div id='spotify-body'>
      <button className="tr-cube-button" onClick={goToHomePage}> </button>
      <div id = 'spotify-container'>
        <div id='spotify-image' onClick={goToSpotify}></div>
        <p id='spotify-text'>On the meantime check out our playlists in different platforms!</p>
        <button id='spotify-button' className='buffas-themed-button'>
          <a href="https://open.spotify.com/playlist/4CVmWl6DWvONnNvkoqG1au?si=22c325389e7c46ab" target="_blank" rel="noopener noreferrer">
            <SiSpotify />&nbsp;&nbsp;GO TO SPOTIFY
          </a>
        </button>
        <button id='apple-button' className='buffas-themed-button'>
          <a href="https://open.spotify.com/playlist/4CVmWl6DWvONnNvkoqG1au?si=22c325389e7c46ab" target="_blank" rel="noopener noreferrer">
            <SiApplemusic />&nbsp;&nbsp;GO TO APPLE MUSIC
          </a>
        </button>
      </div>

      <Footer />
    </div>
  )
}

export default Spotify