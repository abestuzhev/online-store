import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import View from './View';
import Modal from './Modal';

import useAppContext from '../hooks/useAppContext';
import {
  setPath,
  setSavedValues,
  setStepName,
  setToggleRadio,
} from '../store/actions';
import { Tooltip } from 'antd';

function Home({
  path,
  step,
  setIsOkved,
  setIsMainOkved,
  value,
  name,
  onChangeForm,
}) {
  const { state, dispatch } = useAppContext();
  const { modalIsOpen, saveItems, onChange, onChangeMain, main } = state;

  useEffect(() => {
    if (onChange?.constructor == Function) {
      onChange({ items: saveItems, main });
    }
    // !!onChangeForm && onChangeForm({ [name]: saveItems[0]?.value || '' });
  }, [saveItems, main]);

  useEffect(() => {
    if (onChangeMain?.constructor == Function) {
      onChangeMain(main);
    }
  }, [main]);

  useEffect(() => {
    dispatch(setSavedValues([value]));
    dispatch(setToggleRadio({ value, checked: true }));
    dispatch(setPath(path));
    dispatch(setStepName(step));
  }, [value]);

  return (
    <div>
      {process.env.NODE_ENV === 'development' && (
        <Tooltip
          placement="leftBottom"
          title={<div className={'dev-text'}>code: {name}</div>}
          trigger={'hover'} // click
        >
          <span className={'dev-text'}>[?]</span>
        </Tooltip>
      )}
      <View setIsOkved={setIsOkved} setIsMainOkved={setIsMainOkved} />
      <AnimatePresence mode="wait">
        {modalIsOpen && <Modal name={name} onChangeForm={onChangeForm} />}
      </AnimatePresence>
    </div>
  );
}

export default Home;
