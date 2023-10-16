import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Platform,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import {useDispatch} from 'react-redux';

import {Colors} from '../../../utils/Colors';
import {styles} from './Mapscreen.styles';
import {AddressModal} from './components/AddressModal';
import {FONT_SIZES} from '../../../utils/FontSize';
import {Font_Family} from '../../../utils/Fontfamily';
import Config from '../../../config';
import {useError} from '../../../context/ErrorProvider';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

export const MapScreen = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userLocation, setUserLocation] = useState({lat: 0, long: 0});
  const [userCurrentLocation, setUserCurrentLocation] = useState({
    lat: 0,
    long: 0,
  });
  const [headingLocation, setHeadingLocation] = useState('Your Location');
  const [secondaryLocation, setSecondaryLocation] = useState('');
  const [completeAddress, setCompleteAddress] = useState('');

  const [loading, setLoading] = useState(false);
  const setError = useError();
  const dispatch = useDispatch();

  const addressDetails = route.params.addressDetails;

  useEffect(() => {
    if (addressDetails) {
      setUserLocation({
        lat: addressDetails.latitude,
        long: addressDetails.longitude,
      });
      setSecondaryLocation(
        `${addressDetails.address1}, ${addressDetails.address2}, ${addressDetails.city}, ${addressDetails.state}, Pincode - ${addressDetails.pincode}`,
      );
    }
  }, []);

  console.log('secondaryLocation', secondaryLocation);

  function getAddressFromCoordinates({latitude, longitude}) {
    return new Promise((resolve, reject) => {
      fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          latitude +
          ',' +
          longitude +
          '&key=' +
          Config.googleMapsAPIkey,
      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.status === 'OK') {
            resolve(responseJson?.results?.[0]?.formatted_address);
            setSecondaryLocation(responseJson?.results?.[0]?.formatted_address);
          } else {
            reject('LOCATION NOT FOUND');
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  useEffect(() => {
    if (addressDetails === null) {
      setLoading(true);
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then(async location => {
          setUserLocation({
            lat: location.latitude,
            long: location.longitude,
          });
          // setUserCurrentLocation({
          //   lat: location.latitude,
          //   long: location.longitude,
          // });
          await getAddressFromCoordinates({
            latitude: location.latitude,
            longitude: location.longitude,
          });
          setLoading(false);
        })
        .catch(error => {
          const {code, message} = error;
          setError('Error : ' + code + ' ' + message);
        });
      setLoading(false);
    }
  }, [addressDetails, setError]);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 15,
          paddingBottom: 10,
          justifyContent: 'space-between',
        }}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          style={{padding: 10}}
          onPress={() => navigation.goBack()}
        />
        <GooglePlacesAutocomplete
          placeholder="Search Delivery Location"
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
            setUserLocation({
              lat: details.geometry.location.lat,
              long: details.geometry.location.lng,
            });
            setHeadingLocation(data.structured_formatting.main_text);
            setSecondaryLocation(data.structured_formatting.secondary_text);
            setCompleteAddress(data.description);
          }}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              width: '95%',
            },
            textInput: {
              color: '#5d5d5d',
              fontSize: FONT_SIZES.fifteen,
              fontFamily: Font_Family.medium,
              borderWidth: 1.3,
              height: 50,
              borderColor: '#ababab',
            },
          }}
          query={{
            key: Config.googleMapsAPIkey,
            language: 'en',
            components: 'country:in',
            strictbounds: true,
            radius: 1500,
            location: `${userLocation.lat}, ${userLocation.long}`,
            rankby: 'distance',
            type: 'restaurant',
          }}
          textInputProps={{
            InputComp: TextInput,
            leftIcon: {type: 'font-awesome', name: 'chevron-left'},
            errorStyle: {color: 'red'},
            rightIcon: {type: 'font-awesome', name: 'chevron-right'},
          }}
        />
      </View>
      <View
        style={{
          height:
            Platform.OS === 'ios' ? HEIGHT - HEIGHT / 2.7 : HEIGHT - HEIGHT / 3,
          width: '100%',
        }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{...StyleSheet.absoluteFillObject}}
          region={{
            latitude: userLocation.lat,
            longitude: userLocation.long,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034,
          }}>
          <Marker.Animated
            isPreselected={true}
            draggable={true}
            onDragEnd={e => {
              setUserLocation({
                lat: e.nativeEvent.coordinate.latitude,
                long: e.nativeEvent.coordinate.longitude,
              });
              getAddressFromCoordinates({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
            }}
            coordinate={{
              latitude: userLocation.lat,
              longitude: userLocation.long,
            }}
            title={'Your order will be delivered to this address.'}
          />
        </MapView>
        <View style={styles.myLocation}>
          <Text style={styles.locationText}>Use My Location 📍</Text>
        </View>
      </View>
      <View style={styles.bottomCard}>
        <Text style={styles.areaText}>📍{headingLocation}</Text>
        <Text style={styles.addressText}>{secondaryLocation}</Text>
        <Button
          onPress={() => setModalVisible(true)}
          buttonColor={Colors.primary}
          theme={{roundness: 0}}
          style={styles.buttonStyles}
          contentStyle={{height: 50}}
          labelStyle={styles.buttonlabel}
          mode={'contained'}>
          Confirm Location
        </Button>
      </View>
      <AddressModal
        // addressId={addressId}
        address2={secondaryLocation}
        onClose={() => setModalVisible(false)}
        open={modalVisible}
        lat={userLocation.lat}
        long={userLocation.long}
      />
    </SafeAreaView>
  );
};
