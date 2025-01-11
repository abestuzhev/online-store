import styles from './index.module.scss';
import { CloseIcon } from '../../../assets/icon';

const FormSelectOutsideList = ({ options, values, removeOption }) => {
  return (
    <div className={styles.selectOuterList}>
      {values?.map((item, ind) => {
        return (
          <div key={ind} className={styles.selectOuterListRow}>
            <span>{options.find((e) => e.value === item)?.label}</span>
            <span
              onClick={(e) => removeOption(values, ind)}
              className={styles.selectOuterListRowIcon}
            >
              <CloseIcon /> Удалить
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default FormSelectOutsideList;
