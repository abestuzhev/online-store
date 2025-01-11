import React, { useState } from 'react';

import styles from './index.module.scss';
import FormInput from '../FormInput';
import FormItemLabel from '../FormItemLabel';

function FormAddInfo({ fieldCollection, setFieldCollection }) {
  const onChangeHandler = (index, name, value) => {
    setFieldCollection((prev) => {
      return prev.map((el, elIndex) => {
        if (elIndex === index) {
          return {
            ...el,
            [name]: value,
          };
        }
        return el;
      });
    });
  };

  const addFieldHandler = (value) => {
    setFieldCollection((prev) => {
      return [...prev, value];
    });
  };

  const removeFieldHandler = (index) => {
    setFieldCollection((prev) => {
      return prev.filter((_, elIndex) => elIndex !== index);
    });
  };

  return (
    <div className={styles.addInfo}>
      <div className={styles.addInfoBody}>
        <div className={styles.addInfoGrid}>
          {fieldCollection?.map((field, fieldIndex) => {
            return (
              <div className={styles.addInfoGridRow}>
                <div className={styles.addInfoCard}>
                  {fieldIndex === 0 && (
                    <FormItemLabel
                      field={{ required: true, name: 'Название' }}
                      name="title"
                    />
                  )}
                  <FormInput
                    value={fieldCollection[fieldIndex].title}
                    onChange={(value) =>
                      onChangeHandler(fieldIndex, 'title', value)
                    }
                  />
                </div>
                <div className={styles.addInfoCard}>
                  {fieldIndex === 0 && (
                    <FormItemLabel
                      field={{ required: true, name: 'Описание' }}
                      name="description"
                    />
                  )}
                  <FormInput
                    value={fieldCollection[fieldIndex].description}
                    onChange={(value) =>
                      onChangeHandler(fieldIndex, 'description', value)
                    }
                  />
                </div>
                <div className={styles.addInfoGridRowRemove}>
                  <button
                    disabled={fieldIndex === 0}
                    className="e-btn e-btn-outline e-btn-large"
                    onClick={() => removeFieldHandler(fieldIndex)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="formSectionFooter">
          <button
            className="e-btn e-btn-outline e-btn-extraSmall"
            onClick={() => addFieldHandler({ title: '', description: '' })}
          >
            Добавить характеристику
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormAddInfo;
