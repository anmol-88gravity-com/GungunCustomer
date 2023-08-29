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
import { ModalComponent } from './ModalComponent';

export const PopularItems = ({ source, title, subTitle, price }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  

  const data = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },

  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.popularitems} onPress={() => setIsModalVisible(true)}>
        <View style={styles.imgView}>
          <Image source={source} style={{ height: '100%', width: '100%' }} />
        </View>
        <Text style={styles.Itemtitle}>{title}{'\n'}</Text>
        <Text style={styles.subItemtitle}>{subTitle}</Text>
        <Text style={styles.pricetitle}>{price}</Text>
      </TouchableOpacity>
    )
  }

  
  return (
    <View> 
      <ModalComponent
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};







