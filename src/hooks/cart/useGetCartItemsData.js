import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {getDataCartItems} from '../../store/cart/cartSlice';
import {useError} from '../../context/ErrorProvider';

export const useGetCartItemsData = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setError = useError();

  const [loading, setLoading] = useState(false);
  const {cartList: cartItems} = useSelector(state => state.cart);

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        await dispatch(getDataCartItems()).unwrap();
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    });
  }, [dispatch, navigation, setError]);

  return {
    cartItems,
    loading,
  };
};
