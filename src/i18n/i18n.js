import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          home: 'Home',
          prices: 'Prices',
          sales: 'Call Sales',
          track: 'Track Shipment',
          signIn: 'Sign in',
          placeholder: 'Tracking Number',
          trackShipment: 'Track Your Shipment',
          shipmentNotFound:
            'No record of this tracking number can be found at this time, please check the number and try again later. For further assistance, please contact Customer Service.',
          pickup: 'Picked Up',
          processing: 'Processing',
          outForDelivery: 'Out for Delivery',
          delivered: 'Delivered',
          shipmentNumber: 'Shipment Number',
          lastUpdated: 'Last Updated',
          vendorName: 'Vendor Name',
          deliverDate: 'Deliver Date',
        },
      },
      ar: {
        translation: {
          home: 'الرئيسية',
          prices: 'الاسعار',
          sales: 'كلم المبيعات',
          track: 'تتبع شحنتك',
          signIn: 'تسجيل الدخول',
          placeholder: 'رقم التتبع',
          trackShipment: 'تتبع شحنتك',
          shipmentNotFound:
            'لم يتم العثور على رقم التتبع في هذا الوقت، الرجاء التأكد من رقم التتبع وحاول مرة اخرى في وقت لاحق.',
          pickup: 'تم الاستلام',
          processing: 'جاري المعالجة',
          outForDelivery: 'متوفر للتوصيل',
          delivered: 'تم التوصيل',
          shipmentNumber: 'رقم الشحنة',
          lastUpdated: 'اخر تحديث',
          vendorName: 'اسم التاجر',
          deliveredAt: 'تم التوصيل في',
          deliverDate: 'موعد التسليم خلال',
        },
      },
    },
  });

export default i18n;
