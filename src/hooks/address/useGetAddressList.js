import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {useError} from '../../context/ErrorProvider';
import {getAllAddresses} from '../../store/address/addressSlice';

export const useGetAddressList = () => {
  const navigation = useNavigation();
  const {addressList} = useSelector(state => state.address);
  const dispatch = useDispatch();
  const setError = useError();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setLoading(true);
      try {
        await dispatch(getAllAddresses()).unwrap();
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [dispatch, navigation, setError, addressList]);

  return {
    addressList,
    loading,
  };
};
