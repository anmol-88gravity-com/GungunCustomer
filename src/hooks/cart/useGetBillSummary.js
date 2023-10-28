import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {useError} from '../../context/ErrorProvider';
import {billSummary} from '../../store/cart/cartSlice';

export const useGetBillSummary = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setError = useError();

  const {cartList} = useSelector(state => state.cart);
  const [loading, setLoading] = useState(true);
  const [billData, setBillData] = useState(null);

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const res = await dispatch(billSummary()).unwrap();
        if (res) {
          setBillData(res);
          setLoading(false);
        }
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    });
  }, [navigation, cartList]);

  return {
    billData,
    loading,
  };
};
