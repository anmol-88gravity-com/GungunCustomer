import React, {useEffect, useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View, Text, Pressable, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

import {UserProfile} from './UserProfile';
import {Font_Family} from '../../utils/Fontfamily';
import {useError} from '../../context/ErrorProvider';
import {logout} from '../../store/auth/authSlice';
import {showMessage} from 'react-native-flash-message';
import {Colors} from '../../utils/Colors';
import {FONT_SIZES} from '../../utils/FontSize';
import {getUserProfile} from '../../store/user/userSlice';
import Config from '../../config';
import {Loader} from '../../components/common/Loader';

export function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const setError = useError();

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    (async () => {
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
                  uri: Config.API_URL + res.profile_image,
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
    })();
  }, [dispatch, setError]);

  const logoutHandler = async () => {
    try {
      await dispatch(logout());
      showMessage({
        message: 'Logout Successfully.',
        type: 'default',
        backgroundColor: Colors.secondary,
        color: Colors.white,
        textStyle: {
          fontSize: FONT_SIZES.fifteen,
          fontFamily: Font_Family.medium,
        },
      });
    } catch (e) {
      setError(e.message);
    }
  };

  const onPressHandler = async () =>
    Alert.alert('Wait!', 'Are you sure you want to exit the app ?', [
      {text: 'YES', onPress: () => logoutHandler()},
      {text: 'NO'},
    ]);

  return (
    <DrawerContentScrollView {...props}>
      {loading ? (
        <Loader />
      ) : (
        <UserProfile
          imageSource={
            profileData.profileImage.uri !== ''
              ? {uri: profileData.profileImage.uri}
              : require('../../assets/dashboardImages/user.png')
          }
          firstName={profileData.fullName}
        />
      )}
      <DrawerItemList {...props} />
      <View>
        <View />
        <Pressable
          onPress={onPressHandler}
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            marginVertical: 3,
            padding: 10,
            alignItems: 'center',
          }}>
          <Ionicons name="log-out" size={20} color={'#656566'} />
          <Text
            style={{
              marginLeft: 28,
              fontFamily: Font_Family.medium,
              color: '#656566',
            }}>
            Logout
          </Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
}
