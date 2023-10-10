import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {useError} from '../../../context/ErrorProvider';
import {getRestaurantList} from '../../../store/home/homeSlice';

export const useGetRestaurantList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setError = useError();

  const [loader, setLoader] = useState(true);
  const [restaurantList, setRestaurantList] = useState([]);

  const getList = async () => {
    try {
      const res = await dispatch(getRestaurantList()).unwrap();
      if (res) {
        setRestaurantList(res);
        setLoader(false);
      }
    } catch (e) {
      setError(e.message);
      setLoader(false);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getList();
    });
  }, [navigation]);

  return {
    restaurantList,
    loader,
  };
};
