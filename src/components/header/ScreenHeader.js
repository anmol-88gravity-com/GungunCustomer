import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Font_Family} from '../../utils/Fontfamily';
import {FONT_SIZES} from '../../utils/FontSize';
import {useGetProfileData} from '../../hooks';
import Config from '../../config';
import {Colors} from '../../utils/Colors';

const ScreenHeader = ({headerTitle}) => {
  const {profileData, loading} = useGetProfileData();
  const navigation = useNavigation();

  return (
    <View style={styles.mainHeaderView}>
      <View style={styles.middleHeaderView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {loading ? (
            <ActivityIndicator color={Colors.secondary} size={'small'} />
          ) : (
            <>
              <View style={{height: 50, width: 50, borderRadius: 100}}>
                <Image
                  source={
                    profileData?.profileImage?.uri !== ''
                      ? {uri: Config.API_URL + profileData?.profileImage.uri}
                      : require('../../assets/dashboardImages/user.png')
                  }
                  style={{width: '100%', height: '100%', borderRadius: 100}}
                  resizeMode={'cover'}
                />
              </View>
              <Text style={styles.headerText}>{headerTitle}</Text>
            </>
          )}
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable
            onPress={() =>
              navigation.navigate('DashboardNavigator', {screen: 'CartScreen'})
            }>
            <Ionicons name="cart" size={24} color="black" />
          </Pressable>
          <Pressable
            style={{marginLeft: 20}}
            onPress={() => navigation.toggleDrawer()}>
            <MaterialIcons name="menu" size={28} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  mainHeaderView: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    shadowColor: '#000',
  },
  middleHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: Font_Family.semiBold,
    marginLeft: 10,
    fontSize: FONT_SIZES.sixteen,
    color: '#000000',
  },
});
