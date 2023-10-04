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

  const [loading, setLoading] = useState(true);
  const {cartList: cartItems} = useSelector(state => state.cart);

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      const cartId = await load(Config.CART_ID);
      if (cartId) {
        try {
          const res = await dispatch(getDataCartItems({cartId})).unwrap();
          if (res) {
            // setCartItems(res);
            setLoading(false);
          }
        } catch (e) {
          setError(e.message);
          setLoading(false);
        }
      }
    });
  }, [dispatch, navigation, setError]);

  return {
    cartItems,
    loading,
  };
};
