import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { CloseIcon, DownloadIcon } from '../../../../assets/icon';
import { imageUrlToBase64 } from '../../../FormApp/helpers/helpers';

function FormFilePicture({ file, onRemove }) {
  const [previewImage, setPreviewImage] = useState('');

  const removeClick = () => {
    onRemove && onRemove();
  };

  useEffect(() => {
    // Превращение файла-картинки в превью
    // - для только загруженного файла
    // - для файла с сервера
    const generatePreviewImage = async () => {
      if (!file.url) {
        setPreviewImage(file.originFileObj);
      } else {
        const previewFileInServer = await imageUrlToBase64(
          `${process.env.REACT_APP_API_URL}${file.url}`
        );
        setPreviewImage(previewFileInServer);
      }
    };
    generatePreviewImage();
  }, [file]);

  return (
    <div className={styles.uploaderPicture}>
      <div className={styles.uploaderPictureCard}>
        <div className={styles.uploaderPictureCardSection}>
          <div className={styles.uploaderPictureCardImg}>
            {previewImage && (
              <img
                alt="example"
                style={{
                  width: '100%',
                }}
                src={previewImage}
              />
            )}
          </div>
          <div className={styles.uploaderPictureCardOperation}>
            {file?.url && (
              <a
                href={`${process.env.REACT_APP_API_URL}${file.url}`}
                download={file?.name}
              >
                <DownloadIcon /> Скачать
              </a>
            )}
            <button
              type="button"
              className="e-btn e-btn-icon-text"
              onClick={removeClick}
            >
              <CloseIcon />
              <span>Удалить</span>
            </button>
          </div>
        </div>

        <div>{file.name}</div>
      </div>
    </div>
  );
}

export default FormFilePicture;
