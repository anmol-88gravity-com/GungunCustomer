import React from 'react';
import {Image, View, Text} from 'react-native';
import {Font_Family} from '../../utils/Fontfamily';
import {Colors} from '../../utils/Colors';

export function UserProfile({imageSource, firstName}) {
  return (
    <View style={{alignItems: 'center', padding: 10}}>
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: Colors.secondary,
          alignItems: 'center',
        }}>
        <Image
          source={imageSource}
          resizeMode={'contain'}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 10,
          color: '#000000',
          fontFamily: Font_Family.medium,
        }}>
        {firstName}
      </Text>
    </View>
  );
}
