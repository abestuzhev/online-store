import { canArrayValues } from '../../../../helpers/functions';
import styles from './index.module.scss';
import { DocumentIcon } from '../../../../assets/icon';

function FormFileError({ errors }) {
  return (
    <>
      {canArrayValues(errors) && (
        <div className={styles.formFileError}>
          {errors?.map((error, errorIndex) => {
            return (
              <div className={styles.formFileErrorItem} key={errorIndex}>
                <div className={styles.formFileErrorItemIcon}>
                  <DocumentIcon />
                </div>
                <div className={styles.formFileErrorItemText}>
                  {error.message}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default FormFileError;
