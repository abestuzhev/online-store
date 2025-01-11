import { useEffect, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import useAppContext from '../../hooks/useAppContext';
import {
  saveCheckedItems,
  setModalIsOpen,
  resetCheckedItems,
  setSearchValue,
  setOpenListOptions,
  setCheckedMainValue,
  setMain,
  saveCheckedMainValue,
} from '../../store/actions';

import Button from '../Button';
import SelectTree from '../selectTree';

import style from './style.module.scss';

import sprites from '../../images/sprites.svg?url';

function Modal({ name, onChangeForm }) {
  const { state, dispatch } = useAppContext();
  const { modalIsOpen, onlyMainChoice, checkedMainValue } = state;
  const [blockTop, setBlockTop] = useState(0);
  const [contentIsScrolling, setContentIsScrolling] = useState(false);

  const footerRef = useRef(null);

  // add overflow for body when modal is open
  useEffect(() => {
    const header = document.querySelector('.header');

    if (modalIsOpen) {
      document.body.style.overflow = 'hidden';

      if (header && window.screen.width <= 576) {
        header.style.display = 'none';
      }
    } else {
      document.body.style.overflow = '';

      if (header && window.screen.width <= 576) {
        header.style.display = 'block';
      }
    }
  }, [modalIsOpen]);

  // reset checked items
  const handleResetChecked = () => {
    dispatch(setModalIsOpen(false));
    dispatch(resetCheckedItems());
    dispatch(setCheckedMainValue({}));
    dispatch(setSearchValue(null));
    dispatch(setOpenListOptions(false));
    dispatch(setSearchValue(null));
  };

  // save checked items
  const handleSaveCheckedItems = () => {
    dispatch(setModalIsOpen(false));
    if (onlyMainChoice) {
      dispatch(setMain(checkedMainValue));
      dispatch(saveCheckedMainValue(checkedMainValue));
      // Внешний обработчик формы
      !!onChangeForm && onChangeForm({ [name]: checkedMainValue?.value || '' });
    } else {
      dispatch(saveCheckedItems(null));
    }
    dispatch(setOpenListOptions(false));
    dispatch(setSearchValue(null));
  };

  // update scrollbar
  const onUpdate = (values) => {
    const { clientHeight, scrollHeight } = values;

    setContentIsScrolling(scrollHeight > clientHeight);
  };
  // render scrollbar(track, thumb)
  const renderViews = (props, className) => {
    return <div {...props} className={className} />;
  };
  // get top position
  const handleScrollFrame = (values) => {
    const { top } = values;
    setBlockTop(top);
  };

  useEffect(() => {
    window.addEventListener('resize', recalcHeight);

    return () => {
      window.removeEventListener('resize', recalcHeight);
    };
  }, []);

  useEffect(() => {
    recalcHeight();
  }, []);

  const recalcHeight = () => {
    const currHeight = window.innerHeight;
    const scrollHeight = currHeight - 188 + 64;
    return { height: scrollHeight };
  };

  return (
    <motion.div
      className={style.modal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={classNames(style.modalContent, {
          [style.stickyHeader]: blockTop !== 0,
          [style.stickyFooter]: blockTop === 1,
          [style.stickyFooterContent]: !contentIsScrolling,
        })}
        initial={{ opacity: 0, translateY: 10, scale: 0.97 }}
        animate={{ opacity: 1, translateY: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className={style.modalHeader}>
          <div className={style.modalBackArrow} onClick={handleResetChecked}>
            <svg>
              <use xlinkHref={`${sprites}#arrowBack`} />
            </svg>
          </div>
          <div className={style.modalTitle}>Выберите вид деятельности</div>
          <div className={style.modalClose} onClick={handleResetChecked}>
            <svg>
              <use xlinkHref={`${sprites}#close`} />
            </svg>
          </div>
        </div>

        <div className={style.modalBody} style={recalcHeight()}>
          <Scrollbars
            onScrollFrame={handleScrollFrame}
            renderView={(props) => renderViews(props, style.modalBodyContent)}
            renderTrackVertical={(props) =>
              renderViews(props, style.trackVertical)
            }
            renderThumbVertical={(props) =>
              renderViews(props, style.thumbVertical)
            }
            onUpdate={onUpdate}
          >
            <SelectTree />
          </Scrollbars>
        </div>

        <div className={style.modalFooter} ref={footerRef}>
          <Button onClick={handleResetChecked} outline modal>
            Отмена
          </Button>
          <Button onClick={handleSaveCheckedItems} modal>
            Сохранить
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Modal;
