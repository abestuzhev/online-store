import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import { constants } from '../../helpers/constants';

function NotFound() {
  return (
    <div className="pageLayout">
      <div className={styles.error}>
        <h3>Страница не найдена</h3>
        <Link to={constants.PAGES.INDEX}>
          <button type="button" className="e-btn e-btn-outline">
            На главную
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
