import ShipmentProgress from './ShipmentProgress';
import { useTranslation } from 'react-i18next';
function ShipmentDetails({ shipmentData }) {
  const { t, i18n } = useTranslation();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    return i18n.language === 'ar'
      ? date.toLocaleDateString('ar-EG', options)
      : date.toLocaleDateString('en-US', options);
  };
  console.log(shipmentData);
  return (
    <div className='flex flex-col  shadow-md rounded-lg'>
      <div className='flex   justify-start pe-4 ps-36 pt-9 pb-24 shadow-sm'>
        <div className='flex flex-col gap-2 flex-1 '>
          <p className='text-secondary'>
            {t('shipmentNumber')} {shipmentData.TrackingNumber}
          </p>
          <p className='text-primary'>{shipmentData.CurrentStatus.state}</p>
        </div>
        <div className='flex flex-col gap-2 flex-1 '>
          <p className='text-secondary'>{t('lastUpdated')}</p>
          <p className='text-primary'>
            {formatDate(shipmentData.CurrentStatus.timestamp)}
          </p>
        </div>
        <div className='flex flex-col gap-2 flex-1 '>
          <p className='text-secondary'>{t('vendorName')}</p>
          <p className='text-primary'>{shipmentData.CurrentStatus.state}</p>
        </div>
        <div className='flex flex-col gap-2 flex-1 '>
          <p className='text-secondary'>{t('deliverDate')}</p>
          <p className='text-primary'>{shipmentData.CurrentStatus.state}</p>
        </div>
      </div>
      <ShipmentProgress transitEvents={shipmentData.TransitEvents} />
    </div>
  );
}

export default ShipmentDetails;
