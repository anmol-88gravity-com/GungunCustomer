import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {useError} from '../../context/ErrorProvider';
import {getRestaurantDetails} from '../../store/restaurant/resturantDetailsSlice';

export const useGetRestaurantDetails = ({restaurantId}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setError = useError();

  const [loading, setLoading] = useState(true);
  const [restaurantDetails, setRestaurantDetails] = useState(null);

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const res = await dispatch(
          getRestaurantDetails({restaurantId}),
        ).unwrap();
        if (res) {
          setRestaurantDetails(res);
          setLoading(false);
        }
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    });
  }, [dispatch, navigation, restaurantId, setError]);

  return {
    restaurantDetails,
    loading,
  };
};
