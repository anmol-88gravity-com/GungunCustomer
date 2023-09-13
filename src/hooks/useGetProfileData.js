import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {useError} from '../context/ErrorProvider';


export const useGetProfileData = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setError = useError();

  const [loading, setLoading] = useState(true);
  const [profileList, setProfileList] = useState();

  console.log('profle--',profileList)

  const getProfileData = async () => {
    try {
      const res = await dispatch(getUserProfile()).unwrap();
      if (res) {
        setProfileList(res);
        setLoading(false);
      }
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getProfileData();
    });
  }, [navigation]);

  return {
    profileList,
    loading,
  };
};
