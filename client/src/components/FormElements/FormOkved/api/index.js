import axios from 'axios';

export const fetchItems = async (params) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/businessRest/credit/okwed/${params ? `${params}?by=UF_CODE` : ''}`
  );
};

export const fetchSearchedItems = async (value) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/businessRest/credit/okwed/search/${value}`
  );
};
