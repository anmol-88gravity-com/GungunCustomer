import React, { useState } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, FlatList, ImageBackground, Pressable, TextInput, ScrollView } from 'react-native';
import { styles } from '../HomeScreen.styles';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import { Colors } from '../../../../utils/Colors';
import { FONT_SIZES } from '../../../../utils/FontSize';
import { Font_Family } from '../../../../utils/Fontfamily';
import { Button } from 'react-native-paper';
import { images } from '../../../../utils/Images';

export const RecomendedItem = ({ source, title }) => {

    const data = [
      { id: '1', title: 'Item 1' },
      { id: '2', title: 'Item 2' },
      { id: '3', title: 'Item 3' },
      { id: '1', title: 'Item 1' },
      { id: '2', title: 'Item 2' },
      { id: '3', title: 'Item 3' },
      { id: '2', title: 'Item 2' },
      { id: '3', title: 'Item 3' },
  
    ];
  
    const renderItem = () => {
      return (
        <View >
          <View style={{ height: 60, width: 60, marginHorizontal: 20, top: '15%' }}>
            <Image source={source} style={styles.recomendImg} />
            <Text style={[styles.subItemtitle, { color: '#000000', marginTop: '10%' }]}>{title}</Text>
            <Image source={source} style={{ height: '100%', width: '100%', borderRadius: 30 }} />
            <Text style={[styles.subItemtitle, { top: '5%', color: '#000000' }]}>{title}</Text>
          </View>
        </View>
  
      )
    }
  
  
    return (
      <FlatList data={data} renderItem={renderItem} horizontal={true} showsHorizontalScrollIndicator={false} />
    )
  }