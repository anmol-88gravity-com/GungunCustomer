import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {getDataCartItems} from '../../store/cart/cartSlice';
import {useError} from '../../context/ErrorProvider';
import {load} from '../../utils/storage';
import Config from '../../config';

export const useGetCartItemsData = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setError = useError();

  const [loading, setLoading] = useState(false);
  const {cartList: cartItems} = useSelector(state => state.cart);

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      const cartId = await load(Config.CART_ID);
      if (cartId) {
        try {
          await dispatch(getDataCartItems({cartId})).unwrap();
        } catch (e) {
          setError(e.message);
        }
        setLoading(false);
      }
    });
  }, [dispatch, navigation, setError]);

  return {
    cartItems,
    loading,
  };
};
