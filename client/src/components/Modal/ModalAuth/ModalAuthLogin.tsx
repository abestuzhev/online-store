import React from 'react';
import classNames from 'classnames';
import FormItemLabel from '../../FormElements/FormItemLabel';
import FormInput from '../../FormElements/FormInput';
import styles from './index.module.scss';

function ModalAuthLogin({ toggleAuth, closeModalHandler }) {
  return (
    <>
      <div className="formSection formSectionColumn">
        <div className="formSectionField">
          <FormItemLabel
            field={{ required: true, name: 'Email' }}
            name="email"
          />
          <FormInput />
        </div>
        <div className="formSectionField">
          <FormItemLabel
            field={{ required: true, name: 'Пароль' }}
            name="password"
          />
          <FormInput />
        </div>
      </div>
      <div className={classNames(styles.authFooter)}>
        <button
          type="button"
          className="e-btn e-btn-black e-btn-extraLarge"
          onClick={() => {
            // btn.onClick && btn.onClick();
            closeModalHandler();
          }}
        >
          <span>Войти</span>
        </button>
        <button
          type="button"
          className="e-btn-link"
          onClick={() => {
            toggleAuth(true);
          }}
        >
          <span>Регистрация</span>
        </button>
      </div>
    </>
  );
}

export default ModalAuthLogin;
