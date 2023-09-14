import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { styles } from '../HomeScreen.styles';
import { useError } from '../../../../context/ErrorProvider';
import { useAuthMessage } from '../../../../context/MessageProvider';
import { useGetCategorizedFoodtype } from '../../../../hooks/home/category/useGetCategorizedFoodtype';
import Config from '../../../../config';

export const RecommendedItems = ({ source, title }) => {
  const setError = useError();
  const setMessage = useAuthMessage();

  const [foodTypeData, setFoodTypeData] = useState([]);
  const { foodType, loading } = useGetCategorizedFoodtype();

  // console.log('--->>>', foodTypeData)

  useEffect(() => {
    // if (foodType.length > 0) {
    setFoodTypeData(foodType);
    // }

  }, [foodType]);

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flexDirection: 'row', }}>
        <View style={{ height: 60, width: 60, marginHorizontal: 20, top: '15%' }}>
          <Image source={{ uri: Config.API_URL + item?.food_image }} style={styles.recomendImg} />
          <Text
            style={[styles.subItemtitle, { color: '#000000', marginTop: '10%' }]}>
            {item?.food_name}
          </Text>
          <Image source={{ uri: Config.API_URL + item?.food_image }} style={styles.recomendImg} />
          <Text
            style={[styles.subItemtitle, { color: '#000000', marginTop: '10%' }]}>
            {item?.food_name}
          </Text>

        </View>
      </View>
    );

  };

  return (

    <FlatList
      data={foodTypeData}
      renderItem={renderItem}
      horizontal={true}
      showsHorizontalScrollIndicator={false}


    />



  );
};
