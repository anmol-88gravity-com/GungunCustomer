import React from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Colors} from '../../../utils/Colors';
import {styles} from './AddressScreen.styles';

const addressList = [1, 2, 3];

export const AddressScreen = ({navigation}) => {
  const renderItem = ({index}) => (
    <Pressable
      onPress={() => navigation.navigate('MapScreen', {name: 'edit'})}
      style={[styles.addressCard, {marginTop: index === 0 ? 20 : 0}]}>
      <Pressable style={styles.titleStyles}>
        <Text style={styles.addressTitle}>📍 Home</Text>
        <AntDesign name="arrowright" size={18} color={Colors.primary} />
      </Pressable>
      <Text style={styles.addressText}>
        Plot No. 234/67, Sector D, Vasant Kunj, New Delhi, Delhi
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={addressList}
        renderItem={renderItem}
        keyExtractor={item => String(item)}
      />
      <Pressable
        onPress={() => navigation.navigate('MapScreen', {name: 'new'})}
        style={styles.fab}>
        <Ionicons name="add-outline" size={24} color="white" />
        <Text style={styles.addAddressText}> Add Address</Text>
      </Pressable>
    </View>
  );
};
