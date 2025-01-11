import {
  useLocation,
  useNavigate,
  useOutlet,
  useParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import ProductList from '../../../components/ProductList';
import { fetchCards } from '../../../store/reducers/cards/actionCreator';
import Loader from '../../../components/Loader';
import FormItemLabel from '../../../components/FormElements/FormItemLabel';
import FormInput from '../../../components/FormElements/FormInput';
import FormInputNumber from '../../../components/FormElements/FormInputNumber';
import FormFile from '../../../components/FormElements/FormFile';
import FormSelect from '../../../components/FormElements/FormSelect';
import { fetchCategories } from '../../../store/reducers/categories/actionCreator';
import { fetchCompanies } from '../../../store/reducers/companies/actionCreator';
import { canArrayValues, canObjectValues } from '../../../helpers/functions';
import { apiCreateCard, apiRemoveCard } from '../../../api';
import FormAddInfo from '../../../components/FormElements/FormAddInfo';
import { CloseIcon } from '../../../assets/icon';

function DashboardProducts() {
  const dispatch = useDispatch();

  const [tab, setTab] = useState(0);

  const initValues = [
    {
      title: '',
      description: '',
    },
  ];
  const [fieldCollection, setFieldCollection] = useState(initValues);

  const initialState = {
    name: '',
    price: 0,
    typeId: '',
    brandId: '',
    img: '',
    info: [],
  };
  const [formProduct, setFormProduct] = useState(initialState);
  const { cards, isLoadingCards } = useSelector((state) => state.cards);
  const { categories, isLoadingCategories } = useSelector(
    (state) => state.categories
  );
  const { companies, isLoadingCompanies } = useSelector(
    (state) => state.companies
  );

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchCards());
      await dispatch(fetchCategories());
      await dispatch(fetchCompanies());
    };

    fetch();
  }, []);

  const onChangeHandler = (code, value) => {
    setFormProduct((prev) => {
      return {
        ...prev,
        [code]: value,
      };
    });
  };

  const sendForm = async (values) => {
    const data = {
      ...values,
      info: fieldCollection,
    };

    const formData = new FormData();
    const result = await fetch(data.img[0]?.originFileObj);
    const blob = await result.blob();

    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('typeId', data.typeId);
    formData.append('brandId', data.brandId);
    formData.append('img', blob);
    formData.append('info', JSON.stringify(data.info));

    const response = await apiCreateCard(formData);

    if (response) {
      setFormProduct(initialState);
      await dispatch(fetchCards());
    }
  };

  const removeProductHandler = async (id) => {
    const response = await apiRemoveCard(id);
    if (response) {
      await dispatch(fetchCards());
    }
  };

  return (
    <div>
      {isLoadingCards ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <div className="e-btn-collection">
            <button
              type="button"
              className={classNames('e-btn e-btn-outline e-btn-small', {
                active: tab === 0,
              })}
              onClick={() => setTab(0)}
            >
              Список товаров
            </button>
            <button
              type="button"
              className={classNames('e-btn e-btn-outline e-btn-small', {
                active: tab === 1,
              })}
              onClick={() => setTab(1)}
            >
              Добавить товар
            </button>
          </div>

          {tab === 0 && (
            <div className="dashboardTable">
              <div className="dashboardTableContent">
                {canArrayValues(cards) && (
                  <div className="dashboardTableRow">
                    {Object.keys(cards[0]).map((key) => {
                      return (
                        <div className="dashboardTableCol">
                          <div>{key}</div>
                        </div>
                      );
                    })}
                    <div className="dashboardTableCol">
                      <div />
                    </div>
                  </div>
                )}
                {canArrayValues(cards) &&
                  cards.map((card) => {
                    return (
                      <div className="dashboardTableRow">
                        {Object.keys(card).map((key) => {
                          return (
                            <div className="dashboardTableCol">
                              <div>{String(card[key])}</div>
                            </div>
                          );
                        })}
                        <div
                          className="dashboardTableCol"
                          style={{ width: '34px', cursor: 'pointer' }}
                          onClick={() => removeProductHandler(card?.id)}
                        >
                          <CloseIcon />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {tab === 1 && (
            <div className="dashboardBar">
              <div className="dashboardBarTitle">
                Добавление нового элемента
              </div>
              <div className="dashboardBarBody">
                <div className="formSection formSectionRow">
                  <div className="formSectionBody">
                    <div className="formSectionField formSectionFieldCol">
                      <FormItemLabel
                        field={{ required: true, name: 'Название' }}
                        name="name"
                      />
                      <FormInput
                        value={formProduct?.name}
                        onChange={(value) => onChangeHandler('name', value)}
                      />
                    </div>
                    <div className="formSectionField formSectionFieldCol">
                      <FormItemLabel
                        field={{ required: true, name: 'Цена' }}
                        name="price"
                      />
                      <FormInputNumber
                        value={formProduct?.price}
                        onChange={(value) => onChangeHandler('price', value)}
                      />
                    </div>
                    <div className="formSectionField formSectionFieldCol">
                      <FormItemLabel
                        field={{ required: true, name: 'Категория' }}
                        name="typeId"
                      />
                      <FormSelect
                        onChange={(value) => onChangeHandler('typeId', value)}
                        // size="small"
                        field={{ disabled: false }}
                        // onRemove={onRemoveHandler}
                        value={formProduct?.typeId}
                        virtual={false}
                        isMultiple={false}
                        placeholder="Введите значение"
                        options={categories?.map((el) => ({
                          ...el,
                          label: el?.name,
                          value: el?.id,
                        }))}
                      />
                    </div>
                    <div className="formSectionField formSectionFieldCol">
                      <FormItemLabel
                        field={{ required: true, name: 'Бренд' }}
                        name="brandId"
                      />
                      <FormSelect
                        onChange={(value) => onChangeHandler('brandId', value)}
                        // size="small"
                        field={{ disabled: false }}
                        // onRemove={onRemoveHandler}
                        value={formProduct?.brandId}
                        virtual={false}
                        isMultiple={false}
                        placeholder="Введите значение"
                        options={companies?.map((el) => ({
                          ...el,
                          label: el?.name,
                          value: el?.id,
                        }))}
                      />
                    </div>
                    <div className="formSectionField">
                      <FormItemLabel
                        field={{ required: true, name: 'Характеристики' }}
                        name="info"
                      />
                      <FormAddInfo
                        fieldCollection={fieldCollection}
                        setFieldCollection={setFieldCollection}
                      />
                    </div>
                    <div className="formSectionField">
                      <FormItemLabel
                        field={{ required: true, name: 'Изображение' }}
                        name="img"
                      />
                      <FormFile
                        onChange={(value) => onChangeHandler('img', value)}
                        value={formProduct?.img}
                        field={{
                          acceptFiles: [
                            {
                              mimetype: 'image/jpeg',
                              type: '.jpeg',
                            },
                            {
                              mimetype: 'image/jpg',
                              type: '.jpg',
                            },
                            {
                              mimetype: 'image/png',
                              type: '.png',
                            },
                          ],
                        }}
                      />
                    </div>
                  </div>
                  <div className="formSectionFooter">
                    <button
                      type="button"
                      className="e-btn e-btn-outline e-btn-medium"
                      onClick={() => sendForm(formProduct)}
                    >
                      Добавить товар
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardProducts;
