import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: false,
    load: 'languageOnly',
    resources: {}, // поле необходимо для ликвидации ошибки с подстановкой перевода из файла
    // backend: {
    // loadPath: '../src/config/locales/{{lng}}.json',
    // request: async (options, url, payload, callback) => {
    //   try {
    //     // const [lng, ns] = url.split('|');
    //
    //     const response = await apiGetLocalization();
    //     console.log('response', response);
    //     if (response.success) {
    //       localStorage.setItem('langId', response.result.langId);
    //       callback(null, {
    //         data: response.result.data,
    //         status: 200,
    //       });
    //     }
    //   } catch (e) {
    //     callback(null, {
    //       status: 500,
    //     });
    //   }
    // },
    // },
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
