import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';

import {FONT_SIZES} from '../../utils/FontSize';
import {Font_Family} from '../../utils/Fontfamily';

const Header = ({headerTitle, navigation}) => {
  return (
    <SafeAreaView edges={['top']} style={styles.mainHeaderView}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </Pressable>
        <Text style={styles.headerText}>{headerTitle}</Text>
        <Pressable
          style={{marginLeft: 2}}
          onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={28} color="black" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainHeaderView: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerText: {
    fontFamily: Font_Family.semiBold,
    marginLeft: 8,
    fontSize: FONT_SIZES.sixteen,
    color: '#000000',
  },
});
