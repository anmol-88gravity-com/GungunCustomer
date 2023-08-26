import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {UserProfile} from './UserProfile';
import {images} from '../../utils/Images';
import {Font_Family} from '../../utils/Fontfamily';

export function CustomDrawerContent(props) {
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
        <View
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
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
