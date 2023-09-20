import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../utils/Images';
import { Font_Family } from '../../utils/Fontfamily';
import { FONT_SIZES } from '../../utils/FontSize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useGetProfileData } from '../../hooks/profile/useGetProfileData';
import Config from '../../config';

const ScreenHeader = ({ headerTitle }) => {
  const { profileData } = useGetProfileData();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.mainHeaderView}>
      <View style={styles.middleHeaderView}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ height: 50, width: 50, borderRadius: 100 }}>
            <Image
              source={{ uri: Config.API_URL + profileData?.profileImage?.uri }}
              style={{ width: '100%', height: '100%',borderRadius:100 }}
            />
          </View>
          <Text style={styles.headerText}>{headerTitle}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable
            onPress={() =>
              navigation.navigate('DashboardNavigator', { screen: 'CartScreen' })
            }>
            <Ionicons name="cart" size={24} color="black" />
          </Pressable>
          <Pressable
            style={{ marginLeft: 20 }}
            onPress={() => navigation.toggleDrawer()}>
            <MaterialIcons name="menu" size={28} color="black" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  mainHeaderView: {
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'android' ? 20 : -40,
    backgroundColor: 'white',
    shadowColor: '#000',
    height: Platform.OS === 'ios' ? '18%' : '6%',
  },
  middleHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: Font_Family.semiBold,
    marginLeft: 3,
    fontSize: FONT_SIZES.sixteen,
    color: '#000000',
    left: '10%',
  },
});
