import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, ScrollView, Pressable} from 'react-native';

import {styles} from '../HomeScreen.styles';
import Config from '../../../../config';
import {FONT_SIZES} from '../../../../utils/FontSize';
import {Font_Family} from '../../../../utils/Fontfamily';

export const RecommendedItems = ({onPressHandler, foodType}) => {
  const [foodTypeData, setFoodTypeData] = useState([]);

  useEffect(() => {
    if (foodType && foodType.length > 0) {
      setFoodTypeData(foodType);
    }
  }, [foodType]);

  return (
    <ScrollView
      style={{paddingVertical: 20}}
      horizontal
      showsHorizontalScrollIndicator={false}>
      <FlatList
        scrollEnabled={false}
        contentContainerStyle={{
          alignSelf: 'flex-start',
        }}
        ItemSeparatorComponent={({highlighted}) => (
          <View style={[highlighted && {marginLeft: 0}]} />
        )}
        // numColumns={Math.ceil(foodTypeData.length / 2)}
        numColumns={5}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={foodTypeData}
        renderItem={({item}) => (
          <Pressable
            onPress={() => onPressHandler(item.food_name)}
            style={{
              flexDirection: 'column',
              marginBottom: 5,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 5,
              width: 100,
            }}>
            <View style={{height: 60, width: 60, marginVertical: 5}}>
              <Image
                source={{uri: Config.API_URL + item?.food_image}}
                style={styles.recomendImg}
              />
            </View>
            <Text
              style={{
                fontSize: FONT_SIZES.thirteen,
                fontFamily: Font_Family.medium,
                color: '#005C79',
                textAlign: 'center',
              }}>
              {item.food_name}
            </Text>
          </Pressable>
        )}
      />
    </ScrollView>
  );
};
