import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {useError} from '../../context/ErrorProvider';
import {getSingleAddress} from '../../store/address/addressSlice';

export const useGetSingleAddress = addressId => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setError = useError();

  const [loading, setLoading] = useState(true);
  const [addressDetails, setAddressDetails] = useState(null);

  const getAddress = async () => {
    try {
      const res = await dispatch(getSingleAddress({addressId})).unwrap();
      if (res) {
        setAddressDetails(res);
        setLoading(false);
      }
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      if (addressId !== undefined) {
        getAddress();
      }
    });
  }, [navigation]);

  return {
    addressDetails,
    loading,
  };
};
