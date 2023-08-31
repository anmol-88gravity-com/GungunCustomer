import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import {styles} from '../HomeScreen.styles';

export const RecommendedItems = ({source, title}) => {
  const data = [
    {id: '1', title: 'Item 1'},
    {id: '2', title: 'Item 2'},
    {id: '3', title: 'Item 3'},
    {id: '4', title: 'Item 1'},
    {id: '5', title: 'Item 2'},
    {id: '6', title: 'Item 3'},
    {id: '7', title: 'Item 2'},
    {id: '8', title: 'Item 3'},
  ];

  const renderItem = () => {
    return (
      <View>
        <View style={{height: 60, width: 60, marginHorizontal: 20, top: '15%'}}>
          <Image source={source} style={styles.recomendImg} />
          <Text
            style={[styles.subItemtitle, {color: '#000000', marginTop: '10%'}]}>
            {title}
          </Text>
          <Image
            source={source}
            style={{height: '100%', width: '100%', borderRadius: 30}}
          />
          <Text style={[styles.subItemtitle, {top: '5%', color: '#000000'}]}>
            {title}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};
