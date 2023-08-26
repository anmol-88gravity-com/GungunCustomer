import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { styles } from './HomeScreen.styles';

export const PopularItems = ({ source, title, subTitle, price }) => {
  return (
    <TouchableOpacity style={styles.popularitems}>
      <View style={styles.imgView}>
        <Image source={source} style={{ height: '100%', width: '100%' }} />
      </View>
      <Text style={styles.Itemtitle}>{title}</Text>
      <Text style={styles.subItemtitle}>{subTitle}</Text>
      <Text style={styles.pricetitle}>{price}</Text>
    </TouchableOpacity>
  );
};

