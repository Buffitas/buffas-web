import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './css/Checkout.css'
import Modal from './Modal'; // Import your Modal component
import { MdInfoOutline } from "react-icons/md";
import '../fonts/fonts.css'


const Checkout = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve size from the url
  const sizeQueryParam = new URLSearchParams(location.search).get('size');
  const size = sizeQueryParam || 'No size'; // Provide a default size if none is specified

  // Redirect to shop page if size is not found
  useEffect(() => {
    if (!sizeQueryParam || !['M', 'L', 'XL'].includes(size)) {
      navigate('/shop');
    }
  }, [navigate, sizeQueryParam, size]);

  const storeMapIds = new Map([
    ['M', 1],
    ['L', 2],
    ['XL', 3],
  ]);


  // HERE GOES THE REDIRECTION FOR THE DATA PRIVACY

  const gotoDataPrivacyEsPage = () => {
    navigate(`/data-privacy-es?size=${size}`);
  }
  const gotoDataPrivacyEnPage = () => {
    navigate(`/data-privacy-en?size=${size}`);
  }

  // HERE GOES THE LOGIC FOR THE MODALS

  // Logic exit modal 
  // Initialise modal states
  const [isModalExitOpen, setIsModalExitOpen] = useState(false);
  const openModalExit = () => {
    setIsModalExitOpen(true);
  };
  const closeModalExit = () => {
    setIsModalExitOpen(false);
  };
  const goToShopPage = () => {
      navigate('/shop');
  }

  // Logic Information modal 
  // Initialise modal states
  const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
  const openModalInfo = () => {
    setIsModalInfoOpen(true);
  };
  const closeModalInfo = () => {
    setIsModalInfoOpen(false);
  };


  // HERE IS THE CODE FOR THE WORKING OF THE FORM

  // Define FormData
  const [formData, setFormData] = useState({
      name: null,
      surname: null,
      email: null,
      country: null,
      city: null,
      post_code: null,
      street: null,
      flat: null,
      item_type: 'buffas_hoodie',
      size: size,
      checked_info: false,
      checked_data_privacy: false,
  });

  // Manage the changes in the fields in the form
  const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
  };
  const handleChangeName = (event) => {
      const { name, value } = event.target;
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1); // Capitalize first letter
      setFormData({ ...formData, [name]: capitalizedValue.trim() });
  }
  const handleChangeEmail = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value.trim() });
}
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setFormData({ ...formData, country: event.target.value }); // Update formData with selected country
  };

  const [incompleteFields, setIncompleteFields] = useState({});


  const [countries, setCountries] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        return response.json();
      })
      .then(data => {
        const countriesData = data.map(country => country.name.common);
        setCountries(countriesData);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleCheckboxInfo = (e) => {
    setFormData({ ...formData, checked_info: e.target.checked });
  };

  const handleCheckboxDataPrivacy = (e) => {
    setFormData({ ...formData, checked_data_privacy: e.target.checked });
  };


  const validateForm = (formData) => {
    const incomplete = {};
    const errors = [];
    for (const key in formData) {
      if (!formData[key]) {
        errors.push(`${key} is required`);
        incomplete[key] = true;
      }
    }
    setIncompleteFields(incomplete);
    return errors;
  };


  // HERE GOES THE LOGIC FOR SUBMITTING A FORM

  // Submit the form information to the backend server
  const handleSubmit = async (event) => {
    event.preventDefault();


    // raise error if information about the delivery has been accepted
    if (formData.checked_info === false) {
      alert('Please check info box');
      return;
    } 
    // raise error if information about the data privacy has been accepted
    if (formData.checked_data_privacy === false) {
      alert('Please check data privacy box');
      return;
    }

    // check that evey field in the form has been filled
    const formErrors = validateForm(formData);
    if (formErrors.length > 0) {
      alert('Please fill out all fields');
      return;
    }


    // // Reset the form data
    // setFormData({
    //     name: '',
    //     surname: '',
    //     email: '',
    //     city: '',
    //     country: '',
    //     post_code: '',
    //     street: '',
    //     flat: '',
    //     item_type: 'buffas_hoodie',
    //     size: size,
    //     checked_info: false,
    //     checked_data_privacy: false,
    // });
    goToPaymentPage(formData)
  };



  // HERE GO ALL THE MYSQL REQUESTS

  // // Decrease the stock once an item is purchased
  // const decreaseStock = async (product_name, size) => {
  //     try {
  //         const response = await fetch('http://localhost:4000/decrease-stock', {
  //             method: 'PUT',
  //             headers: {
  //                 'Content-Type': 'application/json'
  //             },
  //             body: JSON.stringify({ product_name, size })
  //         });
  
  //         if (!response.ok) {
  //             const errorData = await response.json();
  //             throw new Error(errorData.error);
  //         }
  
  //         const responseData = await response.json();
  //         console.log(responseData.message); // Log success message
  //     } catch (error) {
  //         console.error('Error decreasing stock:', error.message);
  //     }
  // };

  // // // Retrieve stock information for a given product and size
  // // const getStock = async (product_name, size) => {
  // //   try {
  // //       const queryString = `?product_name=${encodeURIComponent(product_name)}&size=${encodeURIComponent(size)}`;
  // //       const response = await fetch(`http://localhost:4000/get-stock${queryString}`, {
  // //           method: 'GET',
  // //           headers: {
  // //               'Content-Type': 'application/json'
  // //           }
  // //       });

  // //       if (!response.ok) {
  // //           const errorData = await response.json();
  // //           throw new Error(errorData.error);
  // //       }

  // //       const stockData = await response.json();
  // //       console.log(`Stock information retrieved, for size ${size},`, stockData.stockQuantity, `units.`); // Log stock information
  // //       //console.log(stockData)
  // //       return stockData.stockQuantity;
  // //   } catch (error) {
  // //       console.error('Error retrieving stock information:', error.message);
  // //   }
  // // };

  const helper_button = async (event) => {
    try {
      const response = await fetch(`http://localhost:4000/send-mail`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
      }

      return true;
  } catch (error) {
      console.error('Error retrieving stock information:', error.message);
  }
  }



  // LOGIC FOR THE PAYMENT REDIRECTION

  // Processses go to payment fetch request and redirects
  const goToPaymentPage = async (formData) => {
    try {
      console.log(storeMapIds.get( size ));
      const response = await fetch('http://localhost:4000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set Content-Type header
        },
        body: JSON.stringify({
          items: [
            { id: storeMapIds.get( size ) }
          ],
          formData
        }),
      });
  
      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error);
      }
  
      const { url } = await response.json();
      window.location = url;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
        <button className='tl-cube-button' onClick={openModalExit}></button>
        <div id='form-container'>
          <div style={{ width: '60%' }}>
            <div id='title-container'>
              <h2>
                <span className="title-letter">D</span>
                <span className="title-letter">e</span>
                <span className="title-letter">l</span>
                <span className="title-letter">i</span>
                <span className="title-letter">v</span>
                <span className="title-letter">e</span>
                <span className="title-letter">r</span>
                <span className="title-letter">y</span>
                <span className="title-letter">&nbsp;</span>
                <span className="title-letter">F</span>
                <span className="title-letter">o</span>
                <span className="title-letter">r</span>
                <span className="title-letter">m</span>
              </h2>
              <button id='info-button' onClick={openModalInfo}><MdInfoOutline /></button>
            </div>
            <form onSubmit={handleSubmit}>

              <div className='unite-fields'>
                <div style={{width: '48%', left:'0'}}>
                  <label className='form-label' htmlFor="name">Name</label><br />
                  <input className='form-input-half' type="text" id="name" name="name" value={formData.name} onChange={handleChangeName} />
                  {incompleteFields.name && <span className="error-message">Please fill in name field</span>}
                  <br /><br />
                </div>
                <div style={{ width: '48%', paddingLeft: '4%' }}>
                  <label className='form-label' htmlFor="surname">Surname</label><br />
                  <input className='form-input-half' type="text" id="surname" name="surname" value={formData.surname} onChange={handleChangeName} />
                  {incompleteFields.surname && <span className="error-message">Please fill in surname field</span>}
                  <br /><br />
                </div>
              </div>
              
              <div style={{marginTop: '10px'}}>
                <label className='form-label' htmlFor="email">Email</label><br />
                <input className='form-input-total' type="email" id="email" name="email" value={formData.email} onChange={handleChangeEmail} />
                {incompleteFields.email && <span className="error-message">Please fill in email field</span>}
                <br /><br />
              </div>

              <div className='unite-fields'>
                <div style={{width: '48%', left:'0'}}>
                  <label className='form-label' htmlFor="country">Country</label><br />
                  <select style={{fontFamily: 'monospace'}} className='form-input-half' id="country"name="country" value={formData.country}  onChange={handleCountryChange}>
                    <option key='Select Country' value='Select Country'></option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  {incompleteFields.country && <span className="error-message">Please fill in country field</span>}
                  <br /><br />
                </div>
                <div style={{width: '48%', paddingLeft: '4%' }}>
                  <label className='form-label' htmlFor="city">City</label><br />
                  <input className='form-input-half' type="text" id="city" name="city" value={formData.city} onChange={handleChangeName} />
                  {incompleteFields.city && <span className="error-message">Please fill in city field</span>}
                  <br /><br />
                </div>
              </div>

              <div className='unite-fields'>
                <div style={{width: '48%', left:'0'}}>
                  <label className='form-label' htmlFor="post_code">Postcode</label><br />
                  <input className='form-input-half 'type="text" id="post_code" name="post_code" value={formData.post_code} onChange={handleChange} />
                  {incompleteFields.post_code && <span className="error-message">Please fill in postcode field</span>}
                  <br /><br />
                </div>
                <div style={{width: '48%', paddingLeft: '4%' }}>
                  <label className='form-label' htmlFor="flat">Flat</label><br />
                  <input className='form-input-half' type="text" id="flat" name="flat" value={formData.flat} onChange={handleChange} />
                  {incompleteFields.flat && <span className="error-message">Please fill in flat field</span>}
                  <br /><br />
                </div>
              </div>
              
              <div style={{marginTop: '10px'}}>
                <label className='form-label' htmlFor="street">Street</label><br />
                <input className='form-input-total' type="text" id="street" name="street" value={formData.street} onChange={handleChange} />
                {incompleteFields.street && <span className="error-message">Please fill in street field</span>}
                  <br /><br />
              </div>

              <div id='checkboxes-container'>
                <label>
                  <input type="checkbox" checked={formData.checked_info} name='checked_info' onChange={handleCheckboxInfo}  />
                  &nbsp;&nbsp;&nbsp;* I verify the information providded is correct and have read the &nbsp;
                  <href style={{ color: '#0062ff'}} onClick={openModalInfo}>information</href>
                  &nbsp; regarding deliveries.
                </label>
                <label>
                  <input type="checkbox" checked={formData.checked_data_privacy} name='checked_data_privacy' onChange={handleCheckboxDataPrivacy}  />
                  &nbsp;&nbsp;&nbsp;* I consent the 
                  <href style={{ color: '#0062ff'}} onClick={gotoDataPrivacyEnPage}> storage of the data</href>  
                  &nbsp;for Buffas use. Consiento el 
                  <href style={{ color: '#0062ff'}} onClick={gotoDataPrivacyEsPage}> almacenamiento de la informacion </href>  
                  para el uso exclusivo de Buffas
                </label>
              </div>
              <button className='buffas-themed-button' id='submit-form-button' type="submit">ENVIAR</button>
            </form>
          </div>
        </div>


        {/* Modal para salir de la pagina */}
        <Modal isOpen={isModalExitOpen} onClose={closeModalExit}>
          <div className="popup-content-small">
            <h2>Are you sure?</h2>
            <p className='pop-up-text'>You will lose you ckeckout information and will have to start all over again.</p>
            <button className="modalbutton" id='modal-stay-button' onClick={closeModalExit}>
                STAY
            </button>
            <button className="modalbutton" id='modal-home-button' onClick={goToShopPage}>
                EXIT
            </button>
          </div>
        </Modal>
        
        {/* Modal de informacion sobre el delivery */}
        <Modal isOpen={isModalInfoOpen} onClose={closeModalInfo}>
          {/* Custom content for your pop-up */}
          <div className="popup-content">
            <h2>Info about delivery</h2>
            <p className='pop-up-text'>
              ES: Actualmente, Buffas.brand se hace responsable de los gastos de envío de todos los pedidos realizados tanto dentro como fuera de la Península Ibérica.
              Si se produjese cualquier problema a raíz de la acción del propio cliente (datos mal proporcionados, entre otros), la enmendación del mismo, ya sea a nivel económico y en lo respectivo al trato con la empresa de transporte, pasará a ser completa responsabilidad del comprador.<br /><br />
              EN: Buffas.brand is currently responsible for the shipping costs of all orders placed both within and outside the Iberian Peninsula. <br />
              Should any problems occur as a result of the customer's own actions (e.g. incorrectly provided data), the buyer is fully responsible for rectifying the problem, both financially and in terms of dealing with the transport company.<br /><br />
            </p>
            
            <button className="modalbutton" id="modal-stay-button-info" onClick={helper_button}>
                Understood
            </button>
          </div>
        </Modal>
        
    </div>
  )
}

export default Checkout