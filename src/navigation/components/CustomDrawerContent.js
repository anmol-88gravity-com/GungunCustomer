import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View, Text, Pressable, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

import {UserProfile} from './UserProfile';
import {images} from '../../utils/Images';
import {Font_Family} from '../../utils/Fontfamily';
import {useError} from '../../context/ErrorProvider';
import {logout} from '../../store/auth/authSlice';
import {showMessage} from 'react-native-flash-message';
import {Colors} from '../../utils/Colors';
import {FONT_SIZES} from '../../utils/FontSize';

export function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const setError = useError();
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
      <UserProfile
        imageSource={images.profile}
        firstName="John"
        lastName="Doe"
      />
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
