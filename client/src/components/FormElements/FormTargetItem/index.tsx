import styles from './index.module.scss';
import FormItem from '../FormItem';
import { Checkbox, Tooltip } from 'antd';
import { generatePath } from '../../FormApp/helpers/helpers';
import { canArrayValues } from '../../../helpers/functions';
import { Fragment } from 'react';

const FormTargetItem = ({ name, targets, onChange, setIsDisabled }) => {
  const onChangeHandler = (value, path) => {
    setIsDisabled(value);
    path ? onChange({ [path]: value }) : onChange(value);
  };

  return (
    <div className={styles.target}>
      {canArrayValues(targets) &&
        targets.map((target, targetIndex) => {
          return (
            <Fragment key={targetIndex}>
              <FormItem
                name={generatePath(name, target?.code)}
                valuePropName="checked"
              >
                <Checkbox
                  onChange={(e) =>
                    onChangeHandler(
                      e.target.checked,
                      generatePath(name, target?.code)
                    )
                  }
                >
                  {target?.name}
                  {process.env.NODE_ENV === 'development' && (
                    <Tooltip
                      placement="leftBottom"
                      title={
                        <div className="dev-text">
                          code: {generatePath(name, target?.code)}
                        </div>
                      }
                      trigger="hover" // click
                    >
                      <span className="dev-text">[?]</span>
                    </Tooltip>
                  )}
                </Checkbox>
              </FormItem>
            </Fragment>
          );
        })}
    </div>
  );
};

export default FormTargetItem;
