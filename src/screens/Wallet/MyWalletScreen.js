import React from 'react';
import {Text, ScrollView} from 'react-native';
import {TextInput} from 'react-native-paper';

import {Colors} from '../../utils/Colors';
import {FONT_SIZES} from '../../utils/FontSize';
import {Font_Family} from '../../utils/Fontfamily';

export const MyWalletScreen = () => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: Colors.white, padding: 20}}>
      <Text
        style={{
          fontSize: FONT_SIZES.fifteen,
          fontFamily: Font_Family.medium,
          marginBottom: 10,
        }}>
        Enter the amount you want to add in the wallet.
      </Text>
      <TextInput
        mode={'outlined'}
        activeOutlineColor={Colors.primary}
        label={'Amount'}
        placeholder={'Enter Amount'}
        keyboardType={'number-pad'}
        style={{backgroundColor: 'white'}}
      />
    </ScrollView>
  );
};
