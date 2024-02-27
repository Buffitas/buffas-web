import React from 'react';
import './css/DataPrivacy.css';
import { useNavigate, useLocation } from 'react-router-dom';

//     ____  __  __    ____   ____   ____    ____
//    / __ \/\ \ \ \  / ___\ / ___\ / __ \  / ___\
//   /\ \_\ \ \ \ \ \/\ \__//\ \__//\ \_\ \/\ \__/_
//   \ \  __<\ \ \ \ \ \  __\ \  __\ \  __ \ \____ \
//    \ \ \_\ \ \ \_\ \ \ \_/\ \ \_/\ \ \ \ \/____\ \
//     \ \____/\ \____/\ \_\  \ \_\  \ \_\ \_\/\____/
//      \/___/  \/___/  \/_/   \/_/   \/_/\/_/\/___/

const DataPrivacyEs = () => {

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
                <span className="title-letter">o</span>
                <span className="title-letter">l</span>
                <span className="title-letter">i</span>
                <span className="title-letter">t</span>
                <span className="title-letter">i</span>
                <span className="title-letter">c</span>
                <span className="title-letter">a</span>
                <span >&nbsp;</span>
                <span className="title-letter">P</span>
                <span className="title-letter">r</span>
                <span className="title-letter">i</span>
                <span className="title-letter">v</span>
                <span className="title-letter">a</span>
                <span className="title-letter">c</span>
                <span className="title-letter">i</span>
                <span className="title-letter">d</span>
                <span className="title-letter">a</span>
                <span className="title-letter">d</span>
              </h2>
            </div>
            <div id="textcontainer">
              Última actualización: 20/02/2024<br/><br/>
              www.buffasbrand.com se compromete a proteger la privacidad de sus usuarios. Esta Política de Privacidad describe cómo www.buffasbrand.com recopila, utiliza y protege la información personal que usted proporciona a través de nuestro sitio web.<br/><br/>
              <div id="small-title-privacy"> - Información que Recopilamos</div>
              <p>
                Podemos recopilar la siguiente información personal cuando usted:<br/>
                - Se suscribe a nuestro boletín informativo.<br/>
                - Realiza una compra en la plataforma<br/>
                La información que podemos recopilar incluye, entre otros, su nombre, sus apellido, dirección de correo electrónico, dirección postal.</p>
              <div id="small-title-privacy"> - Cómo Utilizamos su Información</div>
              <p>
                Utilizamos la información recopilada para:<br/>
                - Procesar sus pedidos y pagos.<br/>
                - Enviarle información relevante sobre nuestros productos y servicios.<br/>
                - Mejorar nuestros productos y servicios.<br/>
                - Cumplir con nuestras obligaciones legales.<br/>
              </p>
              <div id="small-title-privacy"> - Seguridad de la Información</div><br/>
              <p>
                Nos comprometemos a proteger la seguridad de su información personal. Implementamos medidas técnicas y organizativas adecuadas para proteger sus datos contra accesos no autorizados, uso indebido, divulgación o destrucción.<br/>
              </p>
              <div id="small-title-privacy"> - Divulgación de Información a Terceros</div><br/>
              <p>
                No compartiremos su información personal con terceros sin su consentimiento, excepto cuando sea necesario para cumplir con obligaciones legales o para brindarle servicios que haya solicitado expresamente.
              </p>
              <div id="small-title-privacy"> - Cambios en esta Política de Privacidad</div><br/>
              <p>
                Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Le recomendamos que revise periódicamente esta página para conocer cualquier cambio. El uso continuado de nuestro sitio web constituye su aceptación de estos cambios.
                Contacto<br/>
              </p>
              Si tiene alguna pregunta o inquietud sobre nuestra Política de Privacidad, no dude en contactarnos a buffas.brand@gmail.com.<br/>
            </div>
            <button className='buffas-themed-button' id='understood-policy-btn' onClick={goToCheckoutPage}>Entendido</button>
          </div>
        </div>  
      </div>
  )
}

export default DataPrivacyEs