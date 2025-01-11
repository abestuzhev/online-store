import styles from './index.module.scss';

interface IFormSectionTitle {
  title: string;
}

function FormSectionTitle({ title }: IFormSectionTitle) {
  return <div className={styles.sectionTitle}>{title}</div>;
}

export default FormSectionTitle;
