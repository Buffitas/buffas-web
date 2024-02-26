import './App.css';
import Home from './components/Home';
import Shop from './components/Shop';
import Newsletter from './components/Newsletter';
import Spotify from './components/Spotify';
import Subscription from './components/Subscription';
import Checkout from './components/Checkout';
import Success from './components/Success';
import MyModel from './components/Model';
import DataPrivacyEs from './components/DataPrivacyEs'
import DataPrivacyEn from './components/DataPrivacyEn'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path="/spotify" element={<Spotify />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/data-privacy-es" element={<DataPrivacyEs />} />
        <Route path="/data-privacy-en" element={<DataPrivacyEn />} />
        <Route path="/model" element={<MyModel />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;