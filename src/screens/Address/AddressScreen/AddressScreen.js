import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { showMessage } from 'react-native-flash-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Divider, Menu } from 'react-native-paper';
import GetLocation from 'react-native-get-location';

import { Colors } from '../../../utils/Colors';
import { styles } from './AddressScreen.styles';
import { useGetAddressList } from '../../../hooks';
import { Loader } from '../../../components/common/Loader';
import { FONT_SIZES } from '../../../utils/FontSize';
import { Font_Family } from '../../../utils/Fontfamily';
import { useError } from '../../../context/ErrorProvider';
import {
  deleteAddress,
  setDefaultAddress,
} from '../../../store/address/addressSlice';

export const AddressScreen = ({ navigation }) => {
  const [addressUpdatedList, setAddressUpdatedList] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: '', long: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cardId, setCardId] = useState(null);

  const [loading, setLoading] = useState(false);

  const { addressList, loading: loader } = useGetAddressList();
  // console.log('addressesScreen--',addressList)

  const dispatch = useDispatch();
  const setError = useError();

  const getLocation = () => {
    setLoading(true);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(async location => {
        setUserLocation({ lat: location.latitude, long: location.longitude });
        setLoading(false);
      })
      .catch(error => {
        const { code, message } = error;
        setError('Error : ' + code + ' ' + message);
      });
    setLoading(false);
  };

  useEffect(() => getLocation(), []);

  useEffect(() => {
    if (addressList.length > 0) {
      setAddressUpdatedList(addressList);
    }
  }, [addressList]);

  const deleteHandler = async addressId => {
    const a = addressUpdatedList.find(d => d.id === addressId);
    if (a) {
      if (a.is_default === true) {
        showMessage({
          message:
            'Please set another address as PRIMARY before deleting this address.',
          type: 'danger',
          color: Colors.white,
          textStyle: {
            fontSize: FONT_SIZES.fifteen,
            fontFamily: Font_Family.medium,
          },
        });
        return;
      }
    }
    try {
      const res = await dispatch(deleteAddress({ addressId }));
      if (res) {
        setAddressUpdatedList(prevState => {
          const b = [...prevState];
          const x = b.findIndex(m => m.id === addressId);
          if (x > -1) {
            b.splice(x, 1);
          }
          return b;
        });
        showMessage({
          message: 'Deleted Successfully.',
          type: 'default',
          backgroundColor: Colors.secondary,
          color: Colors.white,
          textStyle: {
            fontSize: FONT_SIZES.fifteen,
            fontFamily: Font_Family.medium,
          },
        });
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const onPressHandler = async addressId =>
    Alert.alert('Wait!', 'Are you sure you want to delete this address ?', [
      { text: 'YES', onPress: () => deleteHandler(addressId) },
      { text: 'NO' },
    ]);

  const handleDefaultAddress = async addressId => {
    setIsLoading(true);
    try {
      await dispatch(setDefaultAddress({ addressId })).unwrap();
      showMessage({
        message: 'Primary Address Updated.',
        type: 'default',
        backgroundColor: Colors.secondary,
        color: Colors.white,
        textStyle: {
          fontSize: FONT_SIZES.fifteen,
          fontFamily: Font_Family.medium,
        },
      });
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  };

  const renderItem = ({ item, index }) => (
    <Pressable
      key={item.id}
      style={[styles.addressCard, { marginTop: index === 0 ? 20 : 0 }]}>
      <View style={styles.titleStyles}>
        <Text style={styles.addressTitle}>📍 {item.address_type}</Text>
        <Menu
          visible={visible && cardId === item.id}
          onDismiss={() => setVisible(false)}
          contentStyle={{ backgroundColor: 'white' }}
          anchor={
            <MaterialCommunityIcons
              onPress={() => {
                setVisible(true);
                setCardId(item.id);
              }}
              name="dots-horizontal"
              size={24}
              color="black"
            />
          }>
          <Menu.Item
            titleStyle={{ fontFamily: Font_Family.medium, fontSize: 15 }}
            leadingIcon={() => (
              <MaterialIcons name="mode-edit" size={22} color={'#7b7c7c'} />
            )}
            onPress={() => {
              setVisible(false);
              navigation.navigate('MapScreen', { addressDetails: item });
            }}
            title="Edit"
          />
          <Divider />
          <Menu.Item
            titleStyle={{ fontFamily: Font_Family.medium, fontSize: 15 }}
            leadingIcon={() => (
              <MaterialIcons name="delete" size={22} color={'#7b7c7c'} />
            )}
            onPress={() => {
              setVisible(false);
              onPressHandler(item.id);
            }}
            title="Delete"
          />

          <Divider />
          <Menu.Item
            titleStyle={{ fontFamily: Font_Family.medium, fontSize: 15 }}
            leadingIcon={() => (
              <MaterialIcons
                name={item.is_default ? 'library-add-check' : 'my-library-add'}
                size={22}
                color={'#7b7c7c'}
              />
            )}
            onPress={() => {
              setVisible(false);
              item.is_default
                ? showMessage({
                  message: 'Already default address!',
                  type: 'default',
                  backgroundColor: Colors.secondary,
                  color: Colors.white,
                  textStyle: {
                    fontSize: FONT_SIZES.fifteen,
                    fontFamily: Font_Family.medium,
                  },
                })
                : handleDefaultAddress(item.id);
            }}
            title={item.is_default ? 'Default Address' : 'Set as default'}
          />
        </Menu>
      </View>
      <View style={styles.titleStyles}>
        <Text style={[styles.addressText, { width: '90%' }]}>
          {item.address1 + ', ' + item.address2}
          {item.state && `, ${item.state}`}
          {item.city && `, ${item.city}`}
          {item.pincode && `, Pincode - ${item.pincode}, `}
          {item.landmark}
        </Text>
      </View>
      <Pressable style={{ alignSelf: 'flex-end' }}>
        {item.is_default &&
          (isLoading ? (
            <ActivityIndicator
              style={{
                marginTop: 5,
                alignSelf: 'flex-end',
              }}
              size={'small'}
              color={Colors.secondary}
            />
          ) : (
            <Ionicons name="checkmark-circle" size={24} color={Colors.green} />
          ))}
      </Pressable>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {loading || loader ? (
        <Loader />
      ) : (
        <>
          {addressUpdatedList.length > 0 ? (
            <FlatList
              data={addressUpdatedList}
              renderItem={renderItem}
              keyExtractor={item => String(item.id)}
            />
          ) : (
            <Text
              style={[
                styles.addressTitle,
                { textAlign: 'center', marginVertical: 30 },
              ]}>
              NO DATA
            </Text>
          )}
          <Pressable
            onPress={() =>
            navigation.navigate('MapScreen', { addressDetails: null })
            }
            style={styles.fab}>
            <Ionicons name="add-outline" size={24} color="white" />
            <Text style={styles.addAddressText}> Add Address</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};
