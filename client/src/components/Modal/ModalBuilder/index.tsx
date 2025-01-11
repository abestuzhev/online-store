import { useCallback, useMemo } from 'react';

//* Style
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';

import {
  clearContent,
  setModalShow,
} from '../../../store/reducers/modals/modalsSlice';
import ModalMessage from '../ModalMessage';
import ModalAuth from '../ModalAuth';

function ModalBuilder() {
  const dispatch = useDispatch();
  const { isShow, type } = useSelector((state) => state.modals);

  const closeModalHandler = () => {
    // setVisible(false)
    dispatch(clearContent());
    dispatch(setModalShow(false));
  };

  const params = useMemo(() => {
    return {
      isShow,
      closeModalHandler,
      parentClass: 'js-modal-content',
    };
  }, [isShow]);

  const generateModal = useCallback(
    (type: string) => {
      let modal;
      switch (type) {
        case 'ModalMessage':
          modal = <ModalMessage {...params} />;
          break;
        case 'ModalAuth':
          modal = <ModalAuth {...params} />;
          break;
        default: {
          modal = '';
        }
      }

      return modal;
    },
    [isShow]
  );

  return <>{generateModal(type)}</>;
}

export default ModalBuilder;
