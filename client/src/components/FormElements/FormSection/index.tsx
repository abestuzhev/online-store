import styles from './index.module.scss';
import { generatePath } from '../../FormApp/helpers/helpers';
import constants from '../../FormApp/helpers/constants';
import classNames from 'classnames';
import GenerateField from '../../FormApp/GenerateField';
import { useSelector } from 'react-redux';
import { canObjectValues } from '../../../helpers/functions';

const FormSection = ({ field, value, name, onChange, form }) => {
  const { userData } = useSelector((state) => state.form);
  return (
    <div className={styles.formSection}>
      <div className={styles.formSectionTitle}>{field?.subtitle}</div>
      <div className={styles.formSectionBody}>
        {field?.fields?.map((element, fieldIndex) => {
          const path = `${name}${generatePath(element?.code)}`;
          return (
            <div
              data-col={field.col}
              className={classNames(styles.sectionItem, {
                [styles.sectionItemCol2]: Number(element?.col) === 2,
                [styles.sectionItemCol3]: Number(element?.col) === 3,
              })}
            >
              <GenerateField
                field={element}
                name={path}
                value={canObjectValues(userData) && userData[path]}
                onChange={onChange}
                form={form}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormSection;
