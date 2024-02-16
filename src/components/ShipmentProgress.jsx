import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

function ShipmentProgress({ transitEvents }) {
  const { t, i18n } = useTranslation();

  // Function to format timestamp to display as 'Saturday May. 22'
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    return i18n.language === 'ar'
      ? date.toLocaleDateString('ar-EG', options)
      : date.toLocaleDateString('en-US', options);
  };

  // Generate progress steps based on transit events
  const progressSteps = useMemo(() => {
    if (!transitEvents || transitEvents.length === 0) return [];

    const steps = [
      { label: t('pickup'), timestamp: transitEvents[0].timestamp },
      { label: t('processing'), timestamp: transitEvents[1].timestamp },
      { label: t('outForDelivery'), timestamp: transitEvents[2].timestamp },
      { label: t('delivered'), timestamp: transitEvents[3].timestamp },
    ];

    return steps.map((step, index) => ({
      label: t(step.label),
      timestamp: formatDate(step.timestamp),
    }));
  }, [t, transitEvents]);

  return (
    <div className='flex  items-center justify-center pe-4 ps-36 pt-9 pb-24 shadow-sm'>
      {progressSteps.map((step, index) => (
        <div key={index} className='flex items-center w-full'>
          <div className='w-8 h-8 shrink-0 mx-[-1px] bg-primary p-1.5 flex flex-col  items-center justify-center rounded-full'>
            <img
              src='/src/assets/bx-check.svg'
              className='z-10 absolute'
              alt=''
            />
            <div className='flex flex-col items-center mt-28'>
              <div className='w-full text-xs text-center text-primary mt-1 text-nowrap'>
                {step.label}
              </div>
              <div className='w-full text-xs text-center text-primary mt-1'>
                {step.timestamp}
              </div>
            </div>
          </div>
          {index !== progressSteps.length - 1 && (
            <div className='w-full h-2 bg-primary'></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ShipmentProgress;
