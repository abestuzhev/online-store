import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import Loader from '../../../components/Loader';
import { fetchCompanies } from '../../../store/reducers/companies/actionCreator';
import Brands from '../../../components/Brands';
import { canArrayValues } from '../../../helpers/functions';
import FormInput from '../../../components/FormElements/FormInput';
import FormItemLabel from '../../../components/FormElements/FormItemLabel';

function DashboardBrands() {
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
    <div>
      {isLoadingCompanies ? (
        <Loader />
      ) : (
        <div className="dashboard">
          {canArrayValues(companies) && (
            <div className="dashboardTableRow">
              {Object.keys(companies[0]).map((key) => {
                return (
                  <div className="dashboardTableCol">
                    <div>{key}</div>
                  </div>
                );
              })}
            </div>
          )}
          {canArrayValues(companies) &&
            companies.map((company) => {
              return (
                <div className="dashboardTableRow">
                  {Object.keys(company).map((key) => {
                    return (
                      <div className="dashboardTableCol">
                        <div>{company[key]}</div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          <div className="dashboardBar dashboardBarHalf">
            <div className="dashboardBarTitle">Добавление нового элемента</div>
            <div className="dashboardBarBody">
              <div className="formSection formSectionColumn">
                <div className="formSectionBody">
                  <div className="formSectionField">
                    <FormItemLabel
                      field={{ required: true, name: 'Бренд продукта' }}
                      name="brand"
                    />
                    <FormInput />
                  </div>
                </div>
                <div className="formSectionFooter">
                  <button
                    type="button"
                    className="e-btn e-btn-outline e-btn-medium"
                  >
                    Добавить бренд
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardBrands;
