import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {ModalComponent} from './ModalComponent';
import {styles} from '../HomeScreen.styles';

export const PopularItems = ({source, title, subTitle, price}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const data = [
    {id: '1', title: 'Item 1'},
    {id: '2', title: 'Item 2'},
    {id: '3', title: 'Item 3'},
    {id: '4', title: 'Item 2'},
    {id: '5', title: 'Item 3'},
  ];

  const renderItem = () => {
    return (
      <TouchableOpacity
        style={styles.popularitems}
        onPress={() => setIsModalVisible(true)}>
        <View style={styles.imgView}>
          <Image source={source} style={{height: '100%', width: '100%'}} />
        </View>
        <Text style={styles.Itemtitle}>
          {title}
          {'\n'}
        </Text>
        <Text style={styles.subItemtitle}>{subTitle}</Text>
        <Text style={styles.pricetitle}>{price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <ModalComponent
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
