import { useNavigate } from 'react-router-dom';
import './css/Subscription.css'

const Subscription = () => {

  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/'); // Navigate to the /shop route
  }


  return (
    <div>

      <button className="tl-cube-button" onClick={goToHomePage}></button>

      <div id='newsletter-container'>
          <div style={{ width: '60%' }}>
            <div id='title-container'>
              <h2 id='page-title' >
                <span className="title-letter">S</span>
                <span className="title-letter">u</span>
                <span className="title-letter">b</span>
                <span className="title-letter">s</span>
                <span className="title-letter">c</span>
                <span className="title-letter">r</span>
                <span className="title-letter">i</span>
                <span className="title-letter">b</span>
                <span className="title-letter">e</span>
                <span className="title-letter">&nbsp;</span>
                <span className="title-letter">M</span>
                <span className="title-letter">a</span>
                <span className="title-letter">i</span>
                <span className="title-letter">l</span>
              </h2>
            </div>
            <div id="textcontainer">
              <p>
                Subscribe with your email to recieve updates about new drops or more sizes. STAY TUNNED!
                Read how your <href style={{ color: '#0062ff'}} >information</href> will be protected.
              </p>
            </div>
          </div>
        </div>  
      </div>
  );
};

export default Subscription;
