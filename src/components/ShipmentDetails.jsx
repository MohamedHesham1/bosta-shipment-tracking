import { useCallback } from 'react';
import ShipmentProgress from './ShipmentProgress';
import { useTranslation } from 'react-i18next';

function ShipmentDetails({ shipmentData }) {
  const { t, i18n } = useTranslation();

  const formatDate = useCallback(
    (timestamp) => {
      const date = new Date(timestamp);
      const options = { weekday: 'long', month: 'short', day: 'numeric' };
      return i18n.language === 'ar'
        ? date.toLocaleDateString('ar-EG', options)
        : date.toLocaleDateString('en-US', options);
    },
    [i18n.language]
  );
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    minutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero to single digit minutes
    return hours + ':' + minutes + ' ' + ampm;
  };

  // Define a variable to store the color class based on the shipment status
  let progressColorClass = '';
  let textColorClass = '';
  switch (shipmentData.CurrentStatus.state) {
    case 'CANCELLED':
      progressColorClass = 'bg-primary';
      textColorClass = 'text-primary';
      break;
    case 'DELIVERED_TO_SENDER':
      progressColorClass = 'bg-yellow-500';
      textColorClass = 'text-yellow-500';
      break;
    case 'DELIVERED':
      progressColorClass = 'bg-green-500';
      textColorClass = 'text-green-500';
      break;
    default:
      progressColorClass = '';
      break;
  }

  return (
    <>
      <div className='flex flex-col  shadow-md rounded-lg'>
        <div className='flex justify-start pe-4 ps-36 py-9 shadow-sm'>
          <div className='flex flex-col gap-2 flex-1 '>
            <p className='text-secondary'>
              {t('shipmentNumber')} {shipmentData.TrackingNumber}
            </p>
            <p className={`${textColorClass} text-lg font-bold`}>
              {t(shipmentData.CurrentStatus.state)}
            </p>
          </div>

          <div className='flex flex-col gap-2 flex-1 '>
            <p className='text-secondary'>{t('lastUpdated')}</p>
            <p className='text-tertiary text-lg font-bold '>
              {formatDate(shipmentData.CurrentStatus.timestamp)}
            </p>
          </div>

          <div className='flex flex-col gap-2 flex-1 '>
            <p className='text-secondary'>{t('vendorName')}</p>
            <p className='text-tertiary text-lg font-bold'>
              {shipmentData.provider}
            </p>
          </div>

          <div className='flex flex-col gap-2 flex-1 '>
            <p className='text-secondary'>{t('deliverDate')}</p>
            <p className='text-tertiary text-lg font-bold'>
              {formatDate(shipmentData.PromisedDate)}
            </p>
          </div>
        </div>

        <ShipmentProgress
          transitEvents={shipmentData.TransitEvents}
          colorClass={progressColorClass}
        />
      </div>

      <div className='flex flex-wrap lg:flex-nowrap gap-8 mt-10'>
        <div>
          <h2 className='text-tertiary font-semibold'>
            {t('shipmentDetails')}
          </h2>
          <div className='overflow-x-auto mt-4'>
            <table className='min-w-full divide-y divide-gray-200 font-[sans-serif]'>
              <thead className='bg-gray-100 whitespace-nowrap'>
                <tr>
                  <th className='px-6 py-3 text-start font-semibold text-gray-500 uppercase tracking-wider'>
                    {t('branch')}
                  </th>
                  <th className='px-6 py-3 text-start font-semibold text-gray-500 uppercase tracking-wider'>
                    {t('state')}
                  </th>
                  <th className='px-6 py-3 text-start font-semibold text-gray-500 uppercase tracking-wider'>
                    {t('timestamp')}
                  </th>

                  <th className='px-6 py-3 text-start font-semibold text-gray-500 uppercase tracking-wider'>
                    {t('timestamp')}
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200 whitespace-nowrap'>
                {shipmentData.TransitEvents.map((event, index) => (
                  <tr key={index}>
                    <td className='px-6 py-4 text-secondary font-semibold'>
                      {event.hub ? event.hub : '-'}
                    </td>
                    <td className='px-6 py-4 text-secondary font-semibold'>
                      {t(event.state)}
                    </td>
                    <td className='px-6 py-4 text-secondary font-semibold'>
                      {formatDate(event.timestamp)}
                    </td>

                    <td className='px-6 py-4 text-secondary font-semibold'>
                      {formatTime(event.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className=''>
          <h2 className='text-tertiary font-semibold'>
            {t('deliveryAddress')}
          </h2>
          <div className='bg-gray-100 p-5 mt-4'>
            عين شمس، شارع طلعت حرب، مدينة العمال، بجوار الأمير، مبنى 17، مجمع
            22، القاهرة
          </div>
        </div>
      </div>
    </>
  );
}

export default ShipmentDetails;
