import { ThemeConfig } from 'antd';

import en_US from 'antd/lib/locale/en_US';
import ru_RU from 'antd/lib/locale/ru_RU';

const configAnt: ThemeConfig = {
  hashed: false,
  token: {
    colorLink: '#000',
    colorPrimary: '#9d87f1',
  },
};

export default configAnt;

export const generateLocaleProvider = (langId: string) => {
  switch (langId) {
    case 'ru':
      return ru_RU;
    case 'en':
      return en_US;

    default:
      return ru_RU;
  }
};
