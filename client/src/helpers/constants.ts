import Cookies from 'js-cookie';

type ISortOptionConstant = {
  label: string;
  value: string;
};

interface IConstants {
  AUTH: {
    TYPE: {
      DEMO: string;
      FULL: string;
    };
  };
  MODAL: {
    WIDTH: {
      SMALL: number;
      MEDIUM: number;
      LARGE: number;
    };
  };
  VIEWPORT: {
    DESKTOP: number;
    TABLET: number;
    MOBILE: number;
  };
  CARDS: {
    DEFAULT_NAME: string;
    EMPTY_VALUE: string;
    NUMBER_OF_PAGE: number;
  };
  TEXT: {
    ERROR: {
      VALIDATION: string;
    };
    MODAL: {
      FULL_ACCESS: {
        TITLE: string;
        TEXT: string;
      };
      HIDE: {
        TITLE: string;
        TEXT: string;
      };
      REMOVE: {
        TITLE: string;
        TEXT: string;
      };
      REMOVEALL: {
        TITLE: string;
        TEXT: string;
      };
      SAVE: {
        TITLE: string;
        TEXT: string;
      };
      NOT_SAVE: {
        TITLE: string;
        TEXT: string;
      };
      REGISTERED: {
        TITLE: string;
        TEXT: string;
      };
      REJECTED: {
        TITLE: string;
        TEXT: string;
      };
      ERROR: {
        TITLE: string;
        TEXT: string;
      };
    };
    EMPTY: {
      CARDS: {
        TITLE: string;
        TEXT: string;
      };
      PROJECT: {
        TITLE: string;
        TEXT: string;
      };
    };
  };
  FORM: {
    SEPARATOR: string;
    TYPE_IMAGE: string[];
    AGREEMENT: {
      NAME: string;
      ERROR: string;
    };
    IS_COMPLETED: string;
  };
  PAGES: {
    INDEX: string;
    PROJECTS: string;
    FAVORITES: string;
    COMPARE: string;
    CHATS: string;
    DETAIL_PRODUCT: string;
    DETAIL_CHAT: string;
    FORM: string;
    BASENAME: string;
  };
  STATUS: {
    DRAFT: string;
    REGISTERED: string;
    EDITING: string;
    APPROVED: string;
    REJECTED: string;
    CANCELLED: string;
    ARCHIVE: string;
  };
  FILTER: {
    SORT_OPTION: ISortOptionConstant[];
  };
}

export const constants = {
  HOST: {
    LOCAL: 'https://localhost:5000',
  },
  MODE: {
    IS_DEV: process.env.NODE_ENV === 'development', // IS_DEV - true только на локалке
    // IS_DEV: true,
  },

  LOADER: {
    DEFAULT: {
      TITLE: 'Загрузка',
      TEXT: 'Это может занять несколько секунд',
    },
  },
  MODAL: {
    WIDTH: {
      SMALL: 400,
      MEDIUM: 700,
      LARGE: 990,
    },
  },

  FORM: {
    SEPARATOR: '.',
    TYPE_IMAGE: ['.jpg', '.png'],
  },
  VIEWPORT: {
    DESKTOP: 1279,
    TABLET: 1023,
    MOBILE: 767,
  },
  PAGES: {
    INDEX: '/',
    LOGIN: '/login/',
    REGISTRATION: '/registration/',
    BASKET: '/basket/',
    FAVORITES: '/favorites/',
    DASHBOARD: '/dashboard/',
  },
  TEXT: {
    ERROR: {
      VALIDATION: 'Поле обязательно к заполнению',
    },
    MODAL: {
      ERROR: {
        TITLE: 'Ошибка',
        TEXT: 'Возникла непредвиденная ошибка. Попробуйте позже',
      },
    },
  },
};
