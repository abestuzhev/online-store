import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useMemo } from 'react';
import { allActions } from '../store/reducers/allActions';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
