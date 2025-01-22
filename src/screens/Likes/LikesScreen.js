import React from 'react';
import { View, ScrollView } from 'react-native';
import { RestaurantTopPlaces } from '../Dashboard/HomeScreen/components';
import { images } from '../../utils/Images';

export const LikesScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ScrollView style={{ marginVertical: 30 }}>
        <RestaurantTopPlaces
          source={images.restaurant}
          icon="heart"
          restaurantName="Manorama"
          restaurantRating="3.8 (10K+) . 29 mins"
          restDishType={['North Indian', 'Chinese', 'Biryani']}
          restAddress="DLF Phase 3 . 4.3 km"
          restDistance="4.3 km"
          onPressHandler={() => {}}
          restaurantOffer=""
          restaurantMaxOffer=""
        />
      </ScrollView>
    </View>
  );
};
