import { Tooltip } from 'antd';
import classNames from 'classnames';
import styles from './index.module.scss';
import { LockIcon, QuestionIcon } from '../../../assets/icon';

function FormItemLabel({ field, name }: any) {
  // Коллекция типов полей с жирным заголовком
  const enumBoldType = ['file'];
  return (
    <>
      <span
        className={classNames(styles.label, {
          [styles.bold]: enumBoldType.includes(field?.type),
        })}
      >
        {`${field.name} `}
        {field?.required ? <b>*</b> : ''}
      </span>
      {field?.disabled && (
        <div className={styles.lock}>
          {field?.disabledHint ? (
            <Tooltip
              placement="topLeft"
              trigger="hover"
              title={
                <span
                  dangerouslySetInnerHTML={{ __html: field?.disabledHint }}
                />
              }
              color="#fff"
              key={field.code}
            >
              <span>
                <LockIcon />
              </span>
            </Tooltip>
          ) : (
            <div className={styles.lockIcon}>
              <LockIcon />
            </div>
          )}
        </div>
      )}

      {field?.disabledHint && !field?.disabled && (
        <div className={styles.info}>
          <Tooltip
            placement="topLeft"
            trigger="hover"
            title={
              <span
                dangerouslySetInnerHTML={{
                  __html: field?.disabledHint,
                }}
              />
            }
            color="#fff"
            key={field.code}
          >
            <span>
              <QuestionIcon />
            </span>
          </Tooltip>
        </div>
      )}
    </>
  );
}

export default FormItemLabel;
