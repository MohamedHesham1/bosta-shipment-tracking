import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

function ShipmentProgress({ transitEvents, colorClass }) {
  const { t } = useTranslation();

  // Generate progress steps based on transit events
  const progressSteps = useMemo(() => {
    if (!transitEvents || transitEvents.length === 0) return [];

    const steps = [
      { label: t('pickup') },
      { label: t('processing') },
      { label: t('outForDelivery') },
      { label: t('delivered') },
    ];

    // Find the index of the step to stop based on the current state
    const stopIndex =
      transitEvents.findIndex((event) => event.state === 'DELIVERED') + 1 ||
      transitEvents.findIndex((event) => event.state === 'OUT_FOR_DELIVERY') +
        1 ||
      3; // Default to 'outForDelivery' if neither 'DELIVERED' nor 'OUT_FOR_DELIVERY' is found

    return steps?.map((step, index) => ({
      label: step.label,
      isCompleted: index < stopIndex,
      isLastStep: index === steps.length - 1,
    }));
  }, [t, transitEvents]);

  return (
    <div className='flex items-center justify-center pe-4 ps-36 pt-9 pb-24 shadow-sm'>
      {progressSteps?.map((step, index) => (
        <div key={index} className='flex items-center w-full'>
          <div
            className={`w-8 h-8 shrink-0 mx-[-1px] ${colorClass} p-1.5 flex flex-col  items-center justify-center rounded-full`}
          >
            {step.isLastStep ? (
              <img
                src='/src/assets/bxs-truck.svg'
                className='z-10 absolute'
                alt=''
              />
            ) : (
              step.isCompleted && (
                <img
                  src='/src/assets/bx-check.svg'
                  className='z-10 absolute'
                  alt=''
                />
              )
            )}
            <div className='flex flex-col items-center mt-28'>
              <div
                className={`w-full font-bold text-center mt-1 text-nowrap ${
                  step.isCompleted ? 'text-tertiary' : 'text-gray-400'
                }`}
              >
                {step.label}
              </div>
            </div>
          </div>
          {index !== progressSteps.length - 1 && (
            <div className={`w-full h-2 ${colorClass}`}></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ShipmentProgress;
