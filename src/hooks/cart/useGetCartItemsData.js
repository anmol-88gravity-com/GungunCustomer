import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';


import { getDataCartItems } from '../../store/cart/cartSlice';
import { useError } from '../../context/ErrorProvider';

export const useGetCartItemsData = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setError = useError();

  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState();

  const getCartItemsData = async () => {
    try {
      const res = await dispatch(getDataCartItems()).unwrap();
      if (res) {
        setCartItems(res);
        setLoading(false);
      }
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
        getCartItemsData();
    });
  }, [navigation]);

  return {
    cartItems,
    loading,
  };
};
