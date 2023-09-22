import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {useError} from '../../context/ErrorProvider';
import { getResturantDetails } from '../../store/resturantDetails/resturantDetailsSlice';



export const useGetRestaurantDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setError = useError();

  const [loading, setLoading] = useState(true);
  const [resturantDetails, setResturantDetails] = useState();
 

  const getResturantDetail = async () => {
    try {
      const res = await dispatch(getResturantDetails()).unwrap();
      if (res) {
        setResturantDetails(res);
        setLoading(false);
      }
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
        getResturantDetail();
    });
  }, [navigation]);

  return {
    resturantDetails,
    loading,
  };
};
