import classNames from 'classnames';
import styles from './index.module.scss';
import { ArrowRightIcon, CloseIcon } from '../../../assets/icon';
import { canArrayValues } from '../../../helpers/functions';

function FormChips({ label, field, value, onRemove, isOpen }) {
  const removeChips = (option) => {
    !!onRemove &&
      onRemove(
        field?.code,
        canArrayValues(value) ? value?.filter((el) => el !== option) : option
      );
  };

  const onClickHandler = () => {
    !!isOpen && isOpen(field?.code);
  };

  return (
    <div className={styles.formChips}>
      <div
        className={classNames(styles.formChipsInput, {
          [styles.formChipsInputDisabled]: field.disabled,
        })}
        onClick={field.disabled ? null : onClickHandler}
      >
        <div className={styles.formChipsName}>{label}</div>
        <div className={styles.formChipsIcon}>
          <ArrowRightIcon />
        </div>
      </div>

      {canArrayValues(value) && (
        <div className={styles.formChipsList}>
          {value.map((option, index) => {
            return (
              value?.includes(option) && (
                <div key={index} className={styles.formChipsOption}>
                  <span className={styles.formChipsOptionName}>{option}</span>
                  <div
                    className={styles.formChipsOptionRemove}
                    onClick={() => {
                      removeChips(option);
                    }}
                  >
                    <CloseIcon />
                  </div>
                </div>
              )
            );
          })}
        </div>
      )}

      {typeof value === 'string' && value !== '' && (
        <div className={styles.formChipsList}>
          <div className={styles.formChipsOption}>
            <span className={styles.formChipsOptionName}>{value}</span>
            <div
              className={styles.formChipsOptionRemove}
              onClick={() => {
                removeChips('');
              }}
            >
              <CloseIcon />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormChips;
