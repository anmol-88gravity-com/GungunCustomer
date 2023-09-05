import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View, Text, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

import {UserProfile} from './UserProfile';
import {images} from '../../utils/Images';
import {Font_Family} from '../../utils/Fontfamily';
import {useAuthMessage} from '../../context/MessageProvider';
import {useError} from '../../context/ErrorProvider';
import {logout} from '../../store/auth/authSlice';

export function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const setMsg = useAuthMessage();
  const setError = useError();
  const logoutHandler = async () => {
    try {
      await dispatch(logout());
      setMsg('Logout Successfully.');
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <DrawerContentScrollView {...props}>
      <UserProfile
        imageSource={images.profile}
        firstName="John"
        lastName="Doe"
      />
      <DrawerItemList {...props} />
      <View>
        <View />
        <Pressable
          onPress={logoutHandler}
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
