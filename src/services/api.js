export const fetchShipmentData = async (trackingNumber) => {
  try {
    const response = await fetch(
      `https://tracking.bosta.co/shipments/track/${trackingNumber}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch shipment data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching shipment data: ' + error.message);
  }
};
