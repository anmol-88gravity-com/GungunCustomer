import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {useError} from '../../context/ErrorProvider';
import {getRestaurantDetails} from '../../store/cart/cartSlice';

export const useGetRestaurantDetails = ({restaurantId}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setError = useError();

  const [loading, setLoading] = useState(true);
  const {restaurantDetails} = useSelector(state => state.cart);

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        await dispatch(getRestaurantDetails({restaurantId})).unwrap();

        setLoading(false);
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
