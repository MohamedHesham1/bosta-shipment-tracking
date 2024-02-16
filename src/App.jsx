import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import Header from './components/Header';
import { fetchShipmentData } from './services/api';

function App() {
  const { t } = useTranslation();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipmentData, setShipmentData] = useState(null);

  const handleSearchSubmit = async () => {
    try {
      const data = await fetchShipmentData(trackingNumber);
      setShipmentData(data);
      console.log(shipmentData.TransitEvents);
    } catch (error) {
      console.error('Error fetching shipment data:', error.message);
    }
  };

  return (
    <div className='cairo-regular'>
      <Header
        trackingNumber={trackingNumber}
        setTrackingNumber={setTrackingNumber}
        onSearchSubmit={handleSearchSubmit}
      />
    </div>
  );
}

export default App;
