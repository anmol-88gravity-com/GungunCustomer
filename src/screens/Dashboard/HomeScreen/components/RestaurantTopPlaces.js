import React from 'react';
import {View, Text, ImageBackground, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import {Colors} from '../../../../utils/Colors';
import {FONT_SIZES} from '../../../../utils/FontSize';
import {Font_Family} from '../../../../utils/Fontfamily';
import {styles} from '../HomeScreen.styles';

export const RestaurantTopPlaces = ({
  source,
  icon,
  restaurantName,
  restaurantRating,
  restDishType,
  restAddress,
  restType,
  restaurantOffer,
  restaurantMaxOffer,
  onPressHandler,
}) => {
  return (
    <Pressable style={{marginHorizontal: 5}} onPress={onPressHandler}>
      <View style={styles.resturantPlacesView}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2, height: 100}}>
            <View style={{justifyContent: 'center', padding: 10}}>
              <Text style={[styles.title, {marginVertical: 0}]}>
                {restaurantName}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: '2%',
                }}>
                <MaterialCommunityIcons
                  name="star-circle"
                  size={20}
                  color={Colors.green}
                  style={styles.restuIcon}
                />
                <Text style={[styles.resturantPlaceTitle]}>
                  {restaurantRating}
                </Text>
              </View>
              <Text style={styles.resturantPlaceTitle}>{restDishType}</Text>
              <Text style={[styles.resturantPlaceTitle, {marginTop: 5}]}>
                {restAddress}
              </Text>
            </View>
          </View>
          <LinearGradient colors={['#000', '#000', '#000']} style={{flex: 1}}>
            <ImageBackground source={source} style={styles.resturentBackImg}>
              <MaterialCommunityIcons
                name={icon}
                size={20}
                color="#fff"
                style={{alignSelf: 'flex-end', padding: 5}}
              />
              <View
                style={{
                  alignItems: 'flex-end',
                  position: 'absolute',
                  bottom: 0,
                  right: 5,
                }}>
                <Text
                  style={{
                    fontSize: FONT_SIZES.tweleve,
                    fontFamily: Font_Family.bold,
                    color: Colors.white,
                    marginVertical: 0,
                  }}>
                  {restType}
                </Text>
                <Text
                  style={{
                    fontSize: FONT_SIZES.fifteen,
                    fontFamily: Font_Family.extraBold,
                    color: Colors.white,
                    marginVertical: 0,
                  }}>
                  {restaurantOffer}
                </Text>
                <Text
                  style={{
                    fontSize: FONT_SIZES.tweleve,
                    fontFamily: Font_Family.medium,
                    color: Colors.white,
                    marginVertical: 0,
                  }}>
                  {restaurantMaxOffer}
                </Text>
              </View>
            </ImageBackground>
          </LinearGradient>
        </View>
      </View>
    </Pressable>
  );
};
