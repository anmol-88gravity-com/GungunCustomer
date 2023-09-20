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

  useEffect(() => {
    if (foodType && foodType.length > 0) {
      setFoodTypeData(foodType);
    }
  }, [foodType]);


  const renderItem = ({ item, index }) => {
    const columnIndex = index % 2;
    const marginHorizontal = columnIndex === 0 ? 20 : 10;
    return (

      <View style={{ flexDirection: 'row', flex: 1, padding: 3, paddingBottom: 30, marginTop: 5, }}>
        <View style={{ height: 60, width: 60, marginHorizontal, bottom: '15%' }}>
          <Image source={{ uri: Config.API_URL + item?.food_image }} style={styles.recomendImg} />
          <Text
            style={[styles.subItemtitle, { color: '#000000', marginTop: '10%' }]}>
            {item?.food_name}
          </Text>
        </View>
      </View>

    );

  };
  const columns = 2;
  const dataPerColumn = Math.ceil(foodTypeData.length / columns);
  const dividedData = [];

  for (let i = 0; i < columns; i++) {
    const startIndex = i * dataPerColumn;
    const endIndex = startIndex + dataPerColumn;
    dividedData.push(foodTypeData.slice(startIndex, endIndex));
  }


  return (
    <View style={{ top: 15 }}>
      {dividedData.map((columnData, columnIndex) => (
        <FlatList
          key={columnIndex}
          data={columnData}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      ))}
    </View>



  );
};
