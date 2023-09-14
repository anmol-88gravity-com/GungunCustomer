import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {useError} from '../../context/ErrorProvider';
import { getUserProfile } from '../../store/user/userSlice';

export const useGetProfileData = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setError = useError();

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState();

  const getProfileData = async () => {
    try {
      const res = await dispatch(getUserProfile()).unwrap();
      if (res) {
        setProfileData(res);
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
    profileData,
    loading,
  };
};
