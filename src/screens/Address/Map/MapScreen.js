import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  Platform,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Colors} from '../../../utils/Colors';
import {styles} from './Mapscreen.styles';
import {AddressModal} from './components/AddressModal';
import {FONT_SIZES} from '../../../utils/FontSize';
import {Font_Family} from '../../../utils/Fontfamily';

const HEIGHT = Dimensions.get('screen').height;

export const MapScreen = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const addressId = route.params.addressId;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <KeyboardAwareScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
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
            onPress={(data, details = null) => {
              console.log(data, details);
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
              key: 'YOUR API KEY',
              language: 'en',
              components: 'country:in',
            }}
            textInputProps={{
              InputComp: TextInput,
              leftIcon: {type: 'font-awesome', name: 'chevron-left'},
              errorStyle: {color: 'red'},
              rightIcon: {type: 'font-awesome', name: 'chevron-right'},
            }}
            currentLocation={true}
            currentLocationLabel={'Use My Location'}
          />
        </View>
        <ImageBackground
          source={require('../../../assets/data/map.png')}
          style={{
            height:
              Platform.OS === 'ios'
                ? HEIGHT - HEIGHT / 2.7
                : HEIGHT - HEIGHT / 3,
            width: '100%',
          }}
          resizeMode={'cover'}>
          <View style={styles.myLocation}>
            <Text style={styles.locationText}>Use My Location 📍</Text>
          </View>
        </ImageBackground>
        <View style={styles.bottomCard}>
          <Text style={styles.areaText}>📍Phase V</Text>
          <Text style={styles.addressText}>
            Udyog Vihar, Sector-19, Gurugram
          </Text>
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
          addressId={addressId}
          onClose={() => setModalVisible(false)}
          open={modalVisible}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
