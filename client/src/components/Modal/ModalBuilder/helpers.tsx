import { constants } from '../../../helpers/constants';

export const generateClassSizeModal = (size: number) => {
  switch (size) {
    case constants.MODAL.WIDTH.SMALL: {
      return 'small';
    }
    case constants.MODAL.WIDTH.MEDIUM: {
      return 'medium';
    }
    case constants.MODAL.WIDTH.LARGE: {
      return 'large';
    }

    default: {
      return 'e-modal-medium';
    }
  }
};
