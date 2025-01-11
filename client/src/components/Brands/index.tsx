import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import styles from './index.module.scss';
import { canArrayValues } from '../../helpers/functions';
import { fetchCards } from '../../store/reducers/cards/actionCreator';
import { fetchCompanies } from '../../store/reducers/companies/actionCreator';

function Brands() {
  const dispatch = useDispatch();
  const { companies, isLoadingCompanies } = useSelector(
    (state) => state.companies
  );

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchCompanies());
    };

    fetch();
  }, []);
  return (
    <ul className={classNames(styles.companies)}>
      {canArrayValues(companies) &&
        companies.map((company, index) => {
          return (
            <li key={company?.id} className={styles.companiesItem}>
              <button className="e-btn e-btn-outline e-btn-extraSmall">
                {company?.name}
              </button>
            </li>
          );
        })}
    </ul>
  );
}

export default Brands;
