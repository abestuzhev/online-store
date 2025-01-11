import { Upload } from 'antd';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  FileDocumentPlusIcon,
  FileDownloadColorIcon,
  UploadIcon,
} from '../../../assets/icon';
import styles from './index.module.scss';
import FormFileText from './FormFileText';
import FormFilePicture from './FormFilePicture';
import { canArrayValues } from '../../../helpers/functions';
import { constants } from '../../../helpers/constants';
// import { apiDeleteFormFile } from '../../../api';
import {
  deepCloneAntFile,
  delayedConvertFile,
  getBase64,
  getFileErrors,
  getFileSuccess,
} from '../../FormApp/helpers/helpers';
import useWindowDimension from '../../../hooks/useWindowDimension';
import FormFileError from './FormFileError';
import FormItemDescription from '../FormItemDescription';

const { Dragger } = Upload;

function FormFile({ field, name, value, form, onChange, ...props }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [width] = useWindowDimension();
  const [errors, setErrors] = useState([]);

  // Получаем mimetype файла
  const acceptMimeTypeFile = canArrayValues(field?.acceptFiles)
    ? field?.acceptFiles?.map((element) => element.mimetype)
    : [];

  // Получаем type файла
  const acceptTypeFile = canArrayValues(field?.acceptFiles)
    ? field?.acceptFiles?.map((element) => element.type)
    : [];

  // Проверяем тип отображения файла в интерфейсе: картинка/текст
  const listType =
    canArrayValues(field?.acceptFiles) &&
    acceptTypeFile?.some((type) =>
      constants.FORM.TYPE_IMAGE.some((TYPE_IMAGE) => TYPE_IMAGE === type)
    )
      ? 'picture-card'
      : 'text';

  const onChangeHandler = async ({ file, fileList }) => {
    if (canArrayValues(fileList) && file instanceof File) {
      // Реализация хранения файлов в Redux.
      // Проходим ассинхронно по каждому файлу и конвертируем его в base64
      // Далее при отправке на сервер через formData в функции objectToFormData
      // конвертируем обратнов instance файла

      // Отсекаем лишние файлы, согласно лимиту
      const limitFileList = fileList.slice(Number(`-${field?.max || 1}`));

      // Получаем валидные файлы
      const limitFileListWithoutError = getFileSuccess(limitFileList, field);

      // Получаем файлы с ошибками и записываем их в useState
      setErrors(getFileErrors(limitFileList, field));

      const promises = limitFileListWithoutError.map(delayedConvertFile);
      const files = await Promise.all(promises);

      // Записываем сожержимое файлов в Redux
      onChange && onChange(files);

      // Инициализируем проверку валидации
      // form.validateFields([name]);
    }
  };

  // удаление файлов из поля
  const onRemoveHandler = async (file) => {
    // Если файл с сервера, удаляем через запрос
    if (file.hasOwnProperty('url')) {
      // await apiDeleteFormFile(id, file.uid);
    }
    // Чистим файл в сторе ant и приложения
    onChange && onChange(value?.filter((element) => element.uid !== file.uid));

    // Получаем файлы с ошибками и записываем их в useState
    setErrors(getFileErrors(value, field));
  };

  console.log('value', value);
  return (
    <>
      {field?.text && <FormItemDescription text={field?.text} />}
      <div
        className={styles.uploader}
        data-style="file"
        id={props.id} // необходимый id для корректного скролла при ошибке
      >
        {width <= constants.VIEWPORT.TABLET && (
          <>
            <div className={styles.uploaderSection}>
              <div className={styles.content}>
                <div className={styles.uploaderTitle}>Выберите нужный файл</div>
                <div className={styles.uploaderText}>
                  <span>Максимальный размер файла 5 Мб. </span>
                </div>
              </div>
            </div>
            <FormFileError errors={errors} />
          </>
        )}
        <Dragger
          accept={
            canArrayValues(acceptMimeTypeFile) && acceptMimeTypeFile?.join(',')
          }
          fileList={canArrayValues(value) ? value : []}
          disabled={value?.length >= (field?.max || 1)}
          // maxCount={maxCount}
          // name={name}
          beforeUpload={() => false}
          onChange={onChangeHandler}
          onRemove={onRemoveHandler}
          multiple={field?.multiple}
          itemRender={(originNode, file, fileList, actions) =>
            listType === 'text' ? (
              <FormFileText
                file={file}
                onRemove={() => {
                  actions.remove();
                }}
              />
            ) : (
              <FormFilePicture
                file={file}
                onRemove={() => {
                  actions.remove();
                }}
              />
            )
          }
          listType={listType}
        >
          {width <= constants.VIEWPORT.TABLET ? (
            <div className={styles.uploaderBtn}>
              <UploadIcon />
              Выбрать файл
            </div>
          ) : (
            <>
              <div className={styles.uploaderSection}>
                <div className={styles.content}>
                  <div
                    className={styles.uploaderTitle}
                    dangerouslySetInnerHTML={{
                      __html:
                        'Выберите файл на компьютере или перетащите его сюда',
                    }}
                  >
                    {/* Перетащите файл сюда или <b>выберите его на компьютере</b> */}
                  </div>
                  <div className={styles.uploaderText}>
                    Максимальный размер файла 5 Мб.
                  </div>
                </div>
              </div>
              <FormFileError errors={errors} />
            </>
          )}
        </Dragger>
      </div>
    </>
  );
}

export default FormFile;
