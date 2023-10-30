import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { ModalComponent } from './ModalComponent';
import { styles } from '../HomeScreen.styles';
import Config from '../../../../config';

export const PopularItems = ({ popularItems, source }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataAllPopularItems, setDataAllPopularItems] = useState([]);
  const [popularitemDetails, setPopularitemDetails] = useState(null);
  

  useEffect(() => {
    if (popularItems && popularItems.length > 0) {
      setDataAllPopularItems(popularItems);
    }
  }, [popularItems]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.popularitems}
        onPress={() => {
          setPopularitemDetails(item)
          setIsModalVisible(true)
        }}>
        <View style={styles.imgView}>
          <Image source={{ uri: Config.API_URL + item?.dish_image }} style={styles.popularImg} />
        </View>
        <Text style={styles.Itemtitle}>
          {item?.category_name}
          {'\n'}
        </Text>
        <Text style={styles.subItemtitle}>{item?.dish_name}</Text>
        <Text style={styles.pricetitle}>₹ {item?.dish_price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <ModalComponent
        popularitemDetails={popularitemDetails}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
      <FlatList
        data={dataAllPopularItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
