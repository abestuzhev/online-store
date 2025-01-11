interface IConstantsForm {
  NAME: string;
  IS_COMPLETED: string;
  TABS: {
    ACTIVE: string;
    NAME: string;
    CONTENT: string;
  };
  OKVED: {
    BASIC: string;
    ADDITIONAL: string;
  };
  CARDS: {
    NAME: string;
    TYPE: string;
  };
}

const constantsForm: IConstantsForm = {
  NAME: 'anketa',
  IS_COMPLETED: 'isCompleted',
  TABS: {
    ACTIVE: 'status',
    NAME: 'name',
    CONTENT: 'tabs',
  },
  OKVED: {
    BASIC: 'okved',
    ADDITIONAL: 'additionalOkved',
  },
  CARDS: {
    NAME: 'cards',
    TYPE: 'card',
  },
};

export default constantsForm;
