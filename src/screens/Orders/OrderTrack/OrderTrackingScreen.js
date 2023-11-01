import React, {useRef, useState} from 'react';
import {View, Text, Dimensions, Image, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import {Colors} from '../../../utils/Colors';
import {styles} from './OrderTracingScreen.styles';
import {images} from '../../../utils/Images';
import {Font_Family} from '../../../utils/Fontfamily';
import {FONT_SIZES} from '../../../utils/FontSize';
import Config from '../../../config';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

export const OrderTrackingScreen = () => {
  const [coordinates, setCoordinates] = useState([
    {
      latitude: 28.5048174,
      longitude: 77.0839702,
    },
    {
      latitude: 28.49929,
      longitude: 77.08248,
    },
  ]);
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState('');

  const mapViewRef = useRef(null);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View
        style={{
          height: HEIGHT - HEIGHT / 2.6,
          width: '100%',
        }}>
        <MapView
          style={{...StyleSheet.absoluteFillObject}}
          ref={mapViewRef}
          initialRegion={{
            latitude: coordinates[0].latitude,
            longitude: coordinates[0].longitude,
            latitudeDelta: 0.0622,
            longitudeDelta: 0.0121,
          }}>
          {coordinates.map((coordinate, index) => (
            <Marker key={`coordinate_${index}`} coordinate={coordinate} />
          ))}
          {coordinates.length >= 2 && (
            <MapViewDirections
              origin={coordinates[0]}
              destination={coordinates[coordinates.length - 1]}
              waypoints={
                coordinates.length > 2 ? coordinates.slice(1, -1) : undefined
              }
              apikey={Config.googleMapsAPIkey}
              mode={'DRIVING'}
              timePrecision={'now'}
              strokeWidth={2}
              strokeColor={'rgba(0,92,121,0.5)'}
              optimizeWaypoints={true}
              onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`,
                );
              }}
              onReady={result => {
                setDistance(`${result.legs[0].distance?.text}`);
                setDuration(`${result.legs[0].duration_in_traffic?.text}`);
                setDeliveryLocation(`${result.legs[0].end_address}`);
                mapViewRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: WIDTH / 20,
                    left: WIDTH / 20,
                    bottom: HEIGHT / 250,
                    top: HEIGHT / 250,
                  },
                });
              }}
              onError={errorMessage => {
                console.log(errorMessage + ' GOT AN ERROR');
              }}
            />
          )}
        </MapView>
      </View>
      <View
        style={{
          alignSelf: 'center',
          backgroundColor: Colors.white,
          marginTop: 20,
          padding: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: Colors.white,
          position: 'absolute',
          top: 0,
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
              {duration} ({distance})
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
              numberOfLines={2}
              style={[
                styles.deliveryTime,
                {
                  color: '#000000',
                  marginTop: 5,
                  width: '55%',
                },
              ]}>
              {deliveryLocation}
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
