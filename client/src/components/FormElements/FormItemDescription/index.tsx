import styles from './index.module.scss';

function FormItemDescription({ text }) {
  return (
    <p
      className={styles.formItemDescription}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

export default FormItemDescription;
