import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

import {FONT_SIZES} from '../../../../utils/FontSize';
import {Font_Family} from '../../../../utils/Fontfamily';

export const AddressTypeButton = ({icon, title}) => {
  return (
    <Pressable style={styles.backgroundStyle}>
      {icon}
      <Text style={styles.textStyles}>{title}</Text>
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
    borderColor: '#ccc',
    borderRadius: 100,
  },
  textStyles: {
    fontSize: FONT_SIZES.thirteen,
    fontFamily: Font_Family.regular,
    color: '#808080',
    paddingLeft: 5,
  },
});
