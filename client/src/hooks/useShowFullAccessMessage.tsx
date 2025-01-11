import { useDispatch } from 'react-redux';
import { setModal } from '../store/reducers/modals/modalsSlice';
import { GosUslugiWhiteIcon } from '../assets/icon';
import { apiGetUserAuthUrl } from '../api';

const useShowFullAccessMessage = () => {
  const dispatch = useDispatch();
  const { pathname } = window.location;

  return async () => {
    const response = await apiGetUserAuthUrl({ backUrl: pathname });
    dispatch(
      setModal({
        type: 'ModalMessage',
        content: {
          title: 'Необходим полный доступ',
          text: 'Для доступа к сервису необходимо авторизоваться через портал Госуслуг. Вам также станут доступны другие сервисы и меры господдержки.',
          size: 'small',
          footer: response?.success
            ? [
                {
                  type: 'link',
                  link: response.result,
                  icon: <GosUslugiWhiteIcon />,
                  text: 'Войти через госуслуги',
                },
              ]
            : [
                {
                  type: 'primary',
                  text: 'Понятно',
                },
              ],
        },
      })
    );
  };
};

export default useShowFullAccessMessage;
