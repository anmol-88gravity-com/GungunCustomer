import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';

import {Colors} from '../../utils/Colors';
import {Font_Family} from '../../utils/Fontfamily';
import {FONT_SIZES} from '../../utils/FontSize';

export const Loader = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color={'#dea812'} size={'large'} />
      <Text
        style={{
          fontFamily: Font_Family.regular,
          fontSize: FONT_SIZES.fifteen,
          color: Colors.black,
        }}>
        Loading...
      </Text>
    </View>
  );
};
