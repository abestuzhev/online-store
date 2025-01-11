import { Link, useLocation, useMatches } from 'react-router-dom';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';
import { canArrayValues } from '../../helpers/functions';
import { HomeIcon } from '../../assets/icon';
import useWindowDimension from '../../hooks/useWindowDimension';
import { constants } from '../../helpers/constants';

type IBreadcrumbsProps = {
  theme: string;
};

function Breadcrumbs({ theme = 'dark' }: IBreadcrumbsProps) {
  const { list } = useSelector((state) => state.breadcrumbs);
  const location = useLocation();
  const [width] = useWindowDimension();
  const matches = useMatches();
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(match.data));

  return (
    <ul className={classNames(styles.breadcrumbs, styles[theme])}>
      <Link
        to={`${constants.PAGES.DASHBOARD}products/`}
        className={styles.breadcrumbsItem}
      >
        <span>dashboard</span>
      </Link>
      {width <= constants.VIEWPORT.MOBILE ? (
        <li className={styles.breadcrumbsItem}>
          <a href={list?.default[0]?.path} className={styles.breadcrumbsLink}>
            <HomeIcon />
          </a>
        </li>
      ) : (
        <li className={styles.breadcrumbsItem}>
          <a href={list?.default[0]?.path} className={styles.breadcrumbsLink}>
            Главная
          </a>
        </li>
      )}
      {canArrayValues(list?.default) &&
        list?.default
          .slice(1)
          .slice(
            0,
            location.pathname === constants.PAGES.INDEX
              ? -1
              : list?.default?.length
          )
          .map((link, index) => {
            return (
              <li key={index} className={styles.breadcrumbsItem}>
                <a
                  href={link.path}
                  className={classNames(styles.breadcrumbsLink, {
                    [styles.isVisited]: index === 0,
                  })}
                >
                  <span>{link.name}</span>
                </a>
              </li>
            );
          })}

      {canArrayValues(list?.user) &&
        list?.user.map((crumb, index) => {
          return (
            <li key={index} className={styles.breadcrumbsItem}>
              <span>{crumb?.name}</span>
            </li>
          );
        })}
    </ul>
  );
}

export default Breadcrumbs;
