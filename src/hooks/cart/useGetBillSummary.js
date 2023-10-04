import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {useError} from '../../context/ErrorProvider';
import {billSummary} from '../../store/cart/cartSlice';

export const useGetBillSummary = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setError = useError();

  const [loading, setLoading] = useState(true);
  const [billData, setBillData] = useState(null);

  const getBillSummary = async () => {
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
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getBillSummary();
    });
  }, [navigation]);

  return {
    billData,
    loading,
  };
};
