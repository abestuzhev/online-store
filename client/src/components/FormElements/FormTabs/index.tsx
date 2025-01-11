import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import styles from './index.module.scss';
import FormRadioGroup from '../FormRadioGroup';
import { canArrayValues, canObjectValues } from '../../../helpers/functions';
import FormItem from '../FormItem';
import constantsForm from '../../FormApp/helpers/constants';
import { generatePath } from '../../FormApp/helpers/helpers';
import FormSectionTitle from '../FormSectionTitle';
import GenerateField from '../../FormApp/GenerateField';
import FormSelect from '../FormSelect';
import constants from '../../FormApp/helpers/constants';
import FormInput from '../FormInput';

function FormTabs({ field, value, name, onChange, form }) {
  const params = { field, name, onChange, form };
  const { userData } = useSelector((state) => state.form);
  const nameNavElement = `${name}${generatePath(constantsForm.TABS.ACTIVE)}`;
  const valueNavElement = userData[nameNavElement];
  const activeTab = field?.options?.findIndex(
    (element) => element?.value === valueNavElement
  );

  // console.log('--------field', field);
  // console.log('--------nameNavElement', nameNavElement);
  // console.log('--------valueNavElement', valueNavElement);
  // console.log('--------activeTab', activeTab);
  // console.log('--------userData', userData);
  // console.log('-----------------------------------------------------');
  const generateTabsNav = (f) => {
    switch (f.type) {
      case 'radioButton': {
        return (
          <FormItem name={nameNavElement} field={f}>
            <FormRadioGroup
              {...params}
              value={valueNavElement}
              name={nameNavElement}
            />
          </FormItem>
        );
      }

      case 'select': {
        return (
          <FormItem name={nameNavElement} field={f}>
            <FormSelect
              {...params}
              options={f?.options?.map((element) => {
                return {
                  value: element.value,
                  label: element.name,
                };
              })}
              value={valueNavElement}
              name={nameNavElement}
            />
          </FormItem>
        );
      }

      default: {
        return 'Элемент навигации не найден';
      }
    }
  };

  const generateTabFields = (fields, codeParentSection = '') => {
    return (
      <>
        {canArrayValues(fields) &&
          fields?.map((element, elementIndex) => {
            const path = `${name}${generatePath(constantsForm.TABS.CONTENT, activeTab, codeParentSection, element?.code)}`;
            return (
              <Fragment key={elementIndex}>
                <div
                  data-col={element.col}
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
              </Fragment>
            );
          })}
      </>
    );
  };

  // Возможные структуры в tabsBody
  // [ [{}], [{}] ] — вывод структуры для поля «Контактное лицо»
  // [ [{name: "", fieldsGroup:[]}] ] — необхордим для группировки field + заголовок
  // [ [{fields:[]}] ] — вывод полей для таба

  return (
    <div className={styles.formTabs}>
      <div className={styles.formTabsNav}>
        {generateTabsNav(field)}
        {/*<GenerateField*/}
        {/*  field={field}*/}
        {/*  name={nameRadio}*/}
        {/*  value={canObjectValues(userData) && userData[nameRadio]}*/}
        {/*  onChange={onChange}*/}
        {/*  form={form}*/}
        {/*/>*/}
      </div>

      <div className={styles.formTabsContent}>
        {canArrayValues(field?.tabsBody[activeTab]) && (
          <div className={styles.formTabsSection}>
            {field?.tabsBody[activeTab]?.map((section, sectionIndex) => {
              const fields = (section?.fields &&
                section?.type !== constants.CARDS.TYPE) ||
                section?.fieldsGroup || [section];

              return (
                <>
                  {canArrayValues(section?.fieldsGroup) ? (
                    <div className="formSectionGroup">
                      <div className="formSectionGroupTitle">
                        {section?.title || section?.name}
                      </div>
                      <div className="formSectionGroupBody">
                        {generateTabFields(fields, section.code)}
                      </div>
                    </div>
                  ) : (
                    <>
                      {section?.subtitle && (
                        <FormSectionTitle title={section?.subtitle} />
                      )}
                      {generateTabFields(fields)}
                    </>
                  )}
                </>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default FormTabs;
