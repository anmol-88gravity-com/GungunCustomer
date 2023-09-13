import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {useError} from '../context/ErrorProvider';

export const useGetAddressList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setError = useError();

  const [loading, setLoading] = useState(true);
  const [addressList, setAddressList] = useState([]);

  const getAddressList = async () => {
    try {
      const res = await dispatch(getAllAddresses()).unwrap();
      if (res) {
        setAddressList(res);
        setLoading(false);
      }
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getAddressList();
    });
  }, [navigation]);

  return {
    addressList,
    loading,
  };
};
