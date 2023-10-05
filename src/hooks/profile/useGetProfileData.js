import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {useError} from '../../context/ErrorProvider';
import {getUserProfile} from '../../store/user/userSlice';

export const useGetProfileData = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setError = useError();

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const res = await dispatch(getUserProfile()).unwrap();
        if (res) {
          setProfileData({
            fullName: res.name,
            email: res.email,
            phoneNumber: res.phone_number,
            birthday: res.birthday ? res.birthday : '',
            anniversary: res.anniversary ? res.anniversary : '',
            profileImage: res.profile_image
              ? {
                  uri: res.profile_image,
                  type: 'image/jpg',
                  name: 'userImage.jpg',
                }
              : {
                  uri: '',
                  type: '',
                  name: '',
                },
            gender: res.gender,
          });

          setLoading(false);
        }
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    });
  }, [dispatch, navigation, setError]);

  return {
    profileData,
    loading,
  };
};
