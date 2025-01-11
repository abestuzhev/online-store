import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useState } from 'react';
import styles from './index.module.scss';
import { constants } from '../../../helpers/constants';
import { canArrayValues } from '../../../helpers/functions';
import FormInput from '../../FormElements/FormInput';
import FormItem from '../../FormElements/FormItem';
import FormItemLabel from '../../FormElements/FormItemLabel';
import ModalAuthLogin from './ModalAuthLogin';
import ModalAuthRegistration from './ModalAuthRegistration';

interface IModalMessageProps {
  isShow: boolean;
  closeModalHandler: () => void;
  // content?: {
  //   title: string;
  //   size: string;
  //   footer: any;
  // };
}

function ModalAuth({ isShow, closeModalHandler }: IModalMessageProps) {
  const { content } = useSelector((state) => state.modals);

  const [toggle, setToggle] = useState(false);

  const toggleAuth = (value) => {
    setToggle(value);
  };

  return (
    <Modal
      title={toggle ? 'Регистрация' : 'Авторизация'}
      centered
      open={isShow}
      wrapClassName={classNames(
        'e-modal',
        constants.MODAL.WIDTH.SMALL,
        styles.auth
      )}
      onOk={closeModalHandler}
      onCancel={closeModalHandler}
      width={constants.MODAL.WIDTH.SMALL}
      footer={<div key="right" />}
    >
      <div className={styles.authBody}>
        {toggle ? (
          <ModalAuthRegistration
            toggleAuth={toggleAuth}
            closeModalHandler={closeModalHandler}
          />
        ) : (
          <ModalAuthLogin
            toggleAuth={toggleAuth}
            closeModalHandler={closeModalHandler}
          />
        )}
      </div>
    </Modal>
  );
}

export default ModalAuth;
