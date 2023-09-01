import React from 'react';
import {View, Text, ImageBackground, Dimensions, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Colors} from '../../../utils/Colors';
import {styles} from './OrderTracingScreen.styles';
import {images} from '../../../utils/Images';
import {Font_Family} from '../../../utils/Fontfamily';
import {FONT_SIZES} from '../../../utils/FontSize';

const HEIGHT = Dimensions.get('screen').height;

export const OrderTrackingScreen = () => {
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ImageBackground
        source={require('../../../assets/data/map.png')}
        style={{height: HEIGHT - HEIGHT / 2.6, width: '100%'}}
        resizeMode={'cover'}>
        <View
          style={{
            alignSelf: 'center',
            backgroundColor: Colors.white,
            marginTop: 20,
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.white,
          }}>
          <Text
            style={{
              fontFamily: Font_Family.medium,
              fontSize: FONT_SIZES.thirteen,
              color: Colors.black,
              textAlign: 'center',
            }}>
            Your Order is preparing in the restaurant.
          </Text>
        </View>
        <View style={styles.myLocation}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Image source={images.profile} style={{height: 30, width: 30}} />
            <View>
              <Text style={styles.locationText}>Eko Sanchez </Text>
              <Text style={styles.locationSubText}>Your rider</Text>
            </View>
            <View style={styles.phoneIcon}>
              <MaterialCommunityIcons
                name="phone"
                size={25}
                style={{alignSelf: 'center'}}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.bottomCard}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.iconBackground}>
            <MaterialCommunityIcons
              name="clock-time-four-outline"
              size={20}
              style={{alignSelf: 'center'}}
              color={Colors.primary}
            />
          </View>
          <View style={{marginLeft: '5%', alignSelf: 'center'}}>
            <Text style={styles.deliveryTime}>Delivery time</Text>
            <Text
              style={[
                styles.deliveryTime,
                {color: '#000000', marginTop: '3%'},
              ]}>
              15 minutes
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 30,
            width: 1,
            marginLeft: '6%',
            borderStyle: 'dashed',
            borderWidth: 1,
            borderColor: '#ccc',
          }}
        />

        <View style={{flexDirection: 'row'}}>
          <View style={styles.iconBackground}>
            <Ionicons
              name="location-sharp"
              size={20}
              style={{alignSelf: 'center'}}
              color={Colors.primary}
            />
          </View>
          <View style={{marginLeft: '5%', alignSelf: 'center'}}>
            <Text style={styles.deliveryTime}>Delivery Address</Text>
            <Text
              style={[
                styles.deliveryTime,
                {color: '#000000', marginTop: '3%'},
              ]}>
              Solo Jogja Street
            </Text>
          </View>
        </View>

        <Button
          buttonColor={Colors.primary}
          theme={{roundness: 0}}
          style={styles.buttonStyles}
          contentStyle={{height: 50}}
          labelStyle={styles.buttonlabel}
          mode={'contained'}>
          Detail Orders
        </Button>
      </View>
    </SafeAreaView>
  );
};
