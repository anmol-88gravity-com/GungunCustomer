import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

import {FONT_SIZES} from '../../../../utils/FontSize';
import {Font_Family} from '../../../../utils/Fontfamily';
import {Colors} from '../../../../utils/Colors';

export const AddressTypeButton = ({icon, title, handlePress, addressTitle}) => {
  return (
    <Pressable
      style={[
        styles.backgroundStyle,
        {borderColor: title === addressTitle ? Colors.secondary : '#ccc'},
      ]}
      onPress={handlePress}>
      {icon}
      <Text
        style={[
          styles.textStyles,
          {color: title === addressTitle ? Colors.secondary : '#808080'},
        ]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 100,
  },
  textStyles: {
    fontSize: FONT_SIZES.thirteen,
    fontFamily: Font_Family.regular,
    paddingLeft: 5,
    textTransform: 'capitalize',
  },
});
