import axios from 'axios';
// INSTANCE
// ****************************************

export const api = axios.create({
  // withCredentials: true,
  baseURL: `http://localhost:7000/api/`,
});

// DELAY
// Небольшая задержка для быстрых запросов
// Применяется для плавного отображения ui-компонентов во время выполнения запроса
// ****************************************
export const apiDelayRequest = async (ms: number = 1000) => {
  await new Promise((resolve) => {
    setTimeout(resolve, [ms]);
  });
};

// USER
// ****************************************

export const apiGetUserInfo = async () => {
  const response = await api.get(`/user/`);
  return response.data;
};

export const apiCreateUser = async (payload) => {
  const response = await api.post(`/user/`, payload);
  return response.data;
};

export const apiGetCards = async (payload) => {
  const response = await api.get(`/product/`, {
    params: payload,
  });
  return response.data;
};

export const apiGetCard = async (id) => {
  const response = await api.get(`/product/${id}`);
  return response.data;
};

export const apiCreateCard = async (payload) => {
  const response = await api.post(`/product/`, payload);
  return response.data;
};

export const apiRemoveCard = async (id) => {
  const response = await api.get(`/product/remove/${id}`);
  return response.data;
};

export const apiGetCategories = async () => {
  const response = await api.get(`/type/`);
  return response.data;
};

export const apiGetCompanies = async () => {
  const response = await api.get(`/brand/`);
  return response.data;
};

// BASKET
// ****************************************

export const apiGetBasketProducts = async () => {
  const response = await api.get(`/basket/`);
  return response.data;
};

export const apiAddBasketProduct = async (id) => {
  const response = await api.get(`/basket/add/${id}`);
  return response.data;
};

export const apiRemoveBasketProduct = async (id) => {
  const response = await api.get(`/basket/remove/${id}`);
  return response.data;
};

// FAVORITES
// ****************************************

export const apiGetFavorites = async () => {
  const response = await api.get(`/favorites/`);
  return response.data;
};

export const apiAddFavoriteProduct = async (id) => {
  const response = await api.get(`/favorites/add/${id}`);
  return response.data;
};

export const apiRemoveFavoriteProduct = async (id) => {
  const response = await api.get(`/favorites/remove/${id}`);
  return response.data;
};
