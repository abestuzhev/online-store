import styles from './index.module.scss';
import { CloseIcon, DocumentIcon, DownloadIcon } from '../../../../assets/icon';
import { getFileSizeString } from '../../../../helpers/functions';

function FormFileText({ file, onRemove }) {
  const removeClick = () => {
    onRemove && onRemove();
  };

  return (
    <div className={styles.uploaderItem}>
      <div className="ant-upload-draggable-list-item">
        <div className={styles.file}>
          <div className={styles.fileInfo}>
            <div className={styles.fileIcon}>
              <DocumentIcon />
            </div>
            <div className={styles.fileContent}>
              <div className={styles.fileName}>{file.name}</div>{' '}
              <span className={styles.fileSize}>
                {getFileSizeString(file?.size)}
              </span>
            </div>
          </div>

          <div className={styles.fileControlsWrap}>
            {file?.url && (
              <div className={styles.fileControls}>
                <a
                  href={`${process.env.REACT_APP_API_URL}${file.url}`}
                  download={file?.name}
                  className={styles.fileButton}
                >
                  <DownloadIcon /> Скачать
                </a>
              </div>
            )}
            <div className={styles.fileControls}>
              <button
                type="button"
                className={styles.fileButton}
                onClick={removeClick}
              >
                <CloseIcon /> Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormFileText;
