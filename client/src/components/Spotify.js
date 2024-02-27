import React from 'react'
import './css/Spotify.css'
import { useNavigate } from 'react-router-dom';
import { SiSpotify, SiApplemusic } from "react-icons/si";

//     ____  __  __    ____   ____   ____    ____
//    / __ \/\ \ \ \  / ___\ / ___\ / __ \  / ___\
//   /\ \_\ \ \ \ \ \/\ \__//\ \__//\ \_\ \/\ \__/_
//   \ \  __<\ \ \ \ \ \  __\ \  __\ \  __ \ \____ \
//    \ \ \_\ \ \ \_\ \ \ \_/\ \ \_/\ \ \ \ \/____\ \
//     \ \____/\ \____/\ \_\  \ \_\  \ \_\ \_\/\____/
//      \/___/  \/___/  \/_/   \/_/   \/_/\/_/\/___/

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
        <div id='spotify-image' onClick={goToSpotify}>
          <img id="spot-image" src="foto_perfil.png" alt="Caratula de playlist" />
        </div>
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
    </div>
  )
}

export default Spotify