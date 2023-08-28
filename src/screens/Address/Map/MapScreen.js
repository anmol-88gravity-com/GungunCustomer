import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../../../utils/Colors';
import {Font_Family} from '../../../utils/Fontfamily';
import {FONT_SIZES} from '../../../utils/FontSize';

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
    <SafeAreaView
      edges={['bottom']}
      style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground
        source={require('../../../assets/data/map.png')}
        style={{height: HEIGHT - HEIGHT / 3.2, width: '100%'}}
        resizeMode={'cover'}
      />
      <View style={{margin: 15}}>
        <Text
          style={{
            fontFamily: Font_Family.bold,
            fontSize: FONT_SIZES.eighteen,
            color: Colors.black,
          }}>
          📍Phase V
        </Text>
        <Text
          style={{
            marginTop: 5,
            fontFamily: Font_Family.regular,
            fontSize: FONT_SIZES.thirteen,
            color: Colors.black,
          }}>
          Udyog Vihar, Sector-19, Gurugram
        </Text>
        <Button
          onPress={() => setModalVisible(true)}
          buttonColor={Colors.primary}
          theme={{roundness: 0}}
          style={{
            width: '100%',
            alignSelf: 'center',
            marginTop: 15,
            borderRadius: 5,
          }}
          contentStyle={{height: 50}}
          labelStyle={{
            fontFamily: Font_Family.regular,
            fontSize: FONT_SIZES.fifteen,
          }}
          mode={'contained'}>
          Confirm Location
        </Button>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                paddingVertical: 15,
              }}>
              <Text
                style={{
                  fontSize: FONT_SIZES.eighteen,
                  fontFamily: Font_Family.semiBold,
                  color: Colors.primary,
                }}>
                Enter the Exact Address
              </Text>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <AntDesign name="close" size={24} color="black" />
              </Pressable>
            </View>
            <Text
              style={{
                fontSize: FONT_SIZES.fifteen,
                fontFamily: Font_Family.regular,
                marginTop: 20,
                color: Colors.black,
              }}>
              Save as*
            </Text>
            <View style={{flexDirection: 'row', marginVertical: 10}}>
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 10,
                  paddingHorizontal: 15,
                  paddingVertical: 8,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 100,
                }}>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <AntDesign name={'home'} size={18} color={'#808080'} />
                </Pressable>
                <Text
                  style={{
                    fontSize: FONT_SIZES.thirteen,
                    fontFamily: Font_Family.regular,
                    color: '#808080',
                    paddingLeft: 5,
                  }}>
                  Home
                </Text>
              </Pressable>
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 10,
                  paddingHorizontal: 15,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 100,
                }}>
                <MaterialCommunityIcons
                  name="office-building-marker"
                  size={18}
                  color={'#808080'}
                />
                <Text
                  style={{
                    fontSize: FONT_SIZES.thirteen,
                    fontFamily: Font_Family.regular,
                    color: '#808080',
                    paddingLeft: 5,
                  }}>
                  Work
                </Text>
              </Pressable>
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 10,
                  paddingHorizontal: 15,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 100,
                }}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={18}
                  color={'#808080'}
                />
                <Text
                  style={{
                    fontSize: FONT_SIZES.thirteen,
                    fontFamily: Font_Family.regular,
                    color: '#808080',
                    paddingLeft: 5,
                  }}>
                  Other
                </Text>
              </Pressable>
            </View>
            <TextInput
              label={'Flat / House No / Floor / Building*'}
              style={{
                width: '100%',
                marginVertical: 10,
                backgroundColor: Colors.white,
              }}
              mode={'outlined'}
              outlineStyle={{borderRadius: 8}}
              inputStyle={{
                fontSize: FONT_SIZES.thirteen,
                fontFamily: Font_Family.regular,
              }}
              dense={true}
              placeholderTextColor={'#ccc'}
            />
            <TextInput
              label={'Area / Sector / Locality*'}
              outlineStyle={{borderRadius: 8}}
              style={{
                width: '100%',
                marginBottom: 10,
                backgroundColor: Colors.white,
              }}
              mode={'outlined'}
              inputStyle={{
                fontSize: FONT_SIZES.thirteen,
                fontFamily: Font_Family.regular,
              }}
              dense={true}
              placeholderTextColor={'#ccc'}
            />
            <TextInput
              label={'Nearby landmark (optional)'}
              outlineStyle={{borderRadius: 8}}
              style={{
                width: '100%',
                marginBottom: 10,
                backgroundColor: Colors.white,
              }}
              mode={'outlined'}
              inputStyle={{
                fontSize: FONT_SIZES.thirteen,
                fontFamily: Font_Family.regular,
              }}
              dense={true}
              placeholderTextColor={'#ccc'}
            />
            <Button
              onPress={() => setModalVisible(true)}
              buttonColor={Colors.primary}
              theme={{roundness: 0}}
              style={{
                width: '100%',
                alignSelf: 'center',
                marginTop: 20,
                marginBottom: 10,
                borderRadius: 8,
              }}
              contentStyle={{height: 50}}
              labelStyle={{
                fontFamily: Font_Family.regular,
                fontSize: FONT_SIZES.fifteen,
              }}
              mode={'contained'}>
              {name === 'edit' ? 'Update' : 'Save'}
            </Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.36)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
