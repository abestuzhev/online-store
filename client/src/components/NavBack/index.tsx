import { useNavigate } from 'react-router-dom';

import { ArrowLeftIcon, ArrowLeftSmallIcon } from '../../assets/icon';

import styles from './index.module.scss';

interface INavBackProps {
  text?: string;
}

function NavBack({ text, link }: INavBackProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.back}>
      <div className="pageNavigation">
        <button
          type="button"
          className="e-btn e-btn-outline"
          // onClick={() => navigate(-1)}
          onClick={() => (link ? navigate(link) : navigate('/'))}
        >
          <ArrowLeftSmallIcon />
          <span>{text || 'Вернуться на главную'}</span>
        </button>
      </div>
    </div>
  );
}

export default NavBack;
