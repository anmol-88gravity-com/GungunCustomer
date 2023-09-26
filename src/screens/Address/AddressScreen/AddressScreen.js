import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';

import {Colors} from '../../../utils/Colors';
import {styles} from './AddressScreen.styles';
import {useGetAddressList} from '../../../hooks';
import {Loader} from '../../../components/common/Loader';
import {FONT_SIZES} from '../../../utils/FontSize';
import {Font_Family} from '../../../utils/Fontfamily';
import {useError} from '../../../context/ErrorProvider';
import {
  deleteAddress,
  setDefaultAddress,
} from '../../../store/address/addressSlice';

export const AddressScreen = ({navigation}) => {
  const [addressUpdatedList, setAddressUpdatedList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {addressList, loading} = useGetAddressList();

  const dispatch = useDispatch();
  const setError = useError();

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
      const res = await dispatch(deleteAddress({addressId}));
      if (res) {
        setAddressUpdatedList(prevState => {
          const a = [...prevState];
          const x = a.findIndex(m => m.id === addressId);
          if (x > -1) {
            a.splice(x, 1);
          }
          return a;
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
      {text: 'YES', onPress: () => deleteHandler(addressId)},
      {text: 'NO'},
    ]);

  const handleDefaultAddress = async addressId => {
    setIsLoading(true);
    try {
      await dispatch(setDefaultAddress({addressId})).unwrap();
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

  const renderItem = ({item, index}) => (
    <Pressable
      key={item.id}
      style={[styles.addressCard, {marginTop: index === 0 ? 20 : 0}]}>
      <View style={styles.titleStyles}>
        <Text style={styles.addressTitle}>📍 {item.address_type}</Text>
        <AntDesign
          name="arrowright"
          size={18}
          color={Colors.primary}
          style={{paddingHorizontal: 10}}
          onPress={() => navigation.navigate('MapScreen', {addressId: item.id})}
        />
      </View>
      <View style={styles.titleStyles}>
        <Text style={[styles.addressText, {width: '90%'}]}>
          {item.address1 + ', ' + item.address2} , {item.state}, {item.state},
          Pincode-{item.pincode}, {item.landmark}
        </Text>
        <Pressable
          style={{alignSelf: 'flex-end'}}
          onPress={() => onPressHandler(item.id)}>
          <MaterialCommunityIcons name="delete" size={24} color={'#bd0620'} />
        </Pressable>
      </View>
      {item.is_default ? (
        <Text
          style={styles.addressBtn}
          onPress={() =>
            showMessage({
              message: 'Already a primary address',
              type: 'default',
              backgroundColor: Colors.secondary,
              color: Colors.white,
              textStyle: {
                fontSize: FONT_SIZES.fifteen,
                fontFamily: Font_Family.medium,
              },
            })
          }>
          Primary Address
        </Text>
      ) : isLoading ? (
        <ActivityIndicator
          style={{
            marginTop: 5,
            alignSelf: 'flex-end',
          }}
          size={'small'}
          color={Colors.secondary}
        />
      ) : (
        <Text
          style={styles.addressBtn}
          onPress={() => handleDefaultAddress(item.id)}>
          Set As Primary
        </Text>
      )}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {loading ? (
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
                {textAlign: 'center', marginVertical: 30},
              ]}>
              NO DATA
            </Text>
          )}
          <Pressable
            onPress={() => navigation.navigate('MapScreen', {name: 'new'})}
            style={styles.fab}>
            <Ionicons name="add-outline" size={24} color="white" />
            <Text style={styles.addAddressText}> Add Address</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};
