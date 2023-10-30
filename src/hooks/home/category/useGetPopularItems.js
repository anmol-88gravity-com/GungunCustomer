import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {useError} from '../../../context/ErrorProvider';
import { getAllPouplarItems } from '../../../store/home/homeSlice';


export const useGetPopularItems = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setError = useError();

  const [loading, setLoading] = useState(true);
  const [allPopularItems, setAllPopularItems] = useState();
 
  const getDataAllPouplarItems= async () => {
    try {
      const res = await dispatch(getAllPouplarItems()).unwrap();
      if (res) {
        setAllPopularItems(res);
        setLoading(false);
      }
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
        getDataAllPouplarItems();
    });
  }, [navigation]);

  return {
    allPopularItems,
    loading,
  };
};
