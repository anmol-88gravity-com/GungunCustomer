import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {useError} from '../../../context/ErrorProvider';
import {getRestaurantList} from '../../../store/home/homeSlice';
import {useGetUserCurrentLocation} from '../../user/useGetUserCurrentLocation';

export const useGetRestaurantList = () => {
  const dispatch = useDispatch();
  const setError = useError();

  const {lat, long, loader} = useGetUserCurrentLocation();

  const [load, setLoad] = useState(true);
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    (async () => {
      if (lat === 0 || long === 0) {
        return;
      } else {
        try {
          const res = await dispatch(getRestaurantList({lat, long})).unwrap();
          if (res) {
            setRestaurantList(res);
          }
        } catch (e) {
          setError(e.message);
        }
        setLoad(false);
      }
    })();

    return () => {};
  }, [dispatch, lat, long, setError]);

  return {
    restaurantList,
    lat,
    long,
    load,
    loader,
  };
};
