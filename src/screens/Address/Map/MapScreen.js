import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Colors} from '../../../utils/Colors';
import {styles} from './Mapscreen.styles';
import {AddressModal} from './components/AddressModal';

const HEIGHT = Dimensions.get('screen').height;

export const MapScreen = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const name = route.params.name;

  useEffect(() => {
    navigation.setOptions({
      title:
        name === 'edit' ? 'Update Delivery Address' : 'Choose Delivery Address',
    });
  }, [name, navigation]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ImageBackground
        source={require('../../../assets/data/map.png')}
        style={{height: HEIGHT - HEIGHT / 3.4, width: '100%'}}
        resizeMode={'cover'}>
        <View style={styles.myLocation}>
          <Text style={styles.locationText}>Use My Location 📍</Text>
        </View>
      </ImageBackground>
      <View style={styles.bottomCard}>
        <Text style={styles.areaText}>📍Phase V</Text>
        <Text style={styles.addressText}>Udyog Vihar, Sector-19, Gurugram</Text>
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
        name={name}
        onClose={() => setModalVisible(false)}
        open={modalVisible}
      />
    </SafeAreaView>
  );
};
