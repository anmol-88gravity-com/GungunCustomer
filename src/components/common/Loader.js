import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';

import {Colors} from '../../utils/Colors';

export const Loader = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color={'#dea812'} size={'large'} />
      <Text

      // fontWeight={'400'}
      // fontSize={'md'}
      // textAlign={'center'}
      // color={Colors.secondary}
      >
        Loading...
      </Text>
    </View>
  );
};
