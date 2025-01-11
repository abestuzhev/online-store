import Button from './Button';
import useAppContext from '../hooks/useAppContext';
import CheckedItems from './CheckedItems';
import { setModalIsOpen } from '../store/actions';
import style from './Modal/style.module.scss';

import sprites from '../images/sprites.svg?url';

function View({ setIsOkved, setIsMainOkved }) {
  const { state, dispatch } = useAppContext();
  const { isPossibleToAdd, onlyMainChoice, saveItems } = state;

  const handleOpenModal = () => {
    dispatch(setModalIsOpen(true));
  };

  return (
    <>
      <CheckedItems setIsOkved={setIsOkved} setIsMainOkved={setIsMainOkved} />

      {isPossibleToAdd && (
        <div className={style.openModalBtnContainer}>
          <Button onClick={handleOpenModal} outline icon>
            <svg style={{ stroke: 'none', fill: '#9D87F1' }}>
              <use xlinkHref={`${sprites}#pencil`} />
            </svg>
            <span>
              {saveItems.length > 0 ? 'Изменить' : 'Выбрать основной ОКВЭД'}
            </span>
          </Button>
        </div>
      )}
    </>
  );
}

export default View;
