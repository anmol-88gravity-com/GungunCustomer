import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({ headerTitle }) => {
  const navigation = { pop: () => {} }; // define the navigation object with pop method

  return (
    <View style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 2, backgroundColor: '#fff', padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable onPress={() => navigation.pop(1)}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </Pressable>
        <Text style={{ fontWeight: '600', marginLeft: 8, fontSize: 16 }}>{headerTitle}</Text>
      </View>
    </View>
  );
};

export default Header;
