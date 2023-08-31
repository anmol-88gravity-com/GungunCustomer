import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Chip, Divider, TextInput} from 'react-native-paper';

import {Colors} from '../../../utils/Colors';
import {PopularItems, RestaurantTopPlaces} from '../HomeScreen/components';
import {images} from '../../../utils/Images';
import {DishCard} from './components/DishCard';
import {styles} from './SearchScreeen.styles';

const data = [1, 2, 3];
export const SearchScreen = ({navigation}) => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyles}
        value={search}
        onChangeText={setSearch}
        placeholder="Search here"
        placeholderTextColor="#808080"
        mode={'outlined'}
        outlineStyle={{borderColor: '#cdcdcd'}}
        autoFocus={true}
        theme={{roundness: 15}}
        activeOutlineColor={Colors.primary}
        left={<TextInput.Icon icon="search1" color={Colors.primary} />}
      />
      {search === '' ? (
        <>
          <Text style={styles.recentSearches}>Recent Searches</Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginVertical: 10,
            }}>
            <Chip
              onPress={() => console.log('Pressed')}
              textStyle={{color: Colors.grey}}
              style={styles.chipStyles}>
              Bikaner Sweets
            </Chip>
            <Chip
              onPress={() => console.log('Pressed')}
              textStyle={{color: Colors.grey}}
              style={styles.chipStyles}>
              Singla's Sweets
            </Chip>
            <Chip
              onPress={() => console.log('Pressed')}
              textStyle={{color: Colors.grey}}
              style={styles.chipStyles}>
              Om Sweets and Restaurants
            </Chip>
          </View>
          <Divider />
          <Text style={styles.recommended}>Recommended</Text>
          <View style={styles.chipRow}>
            <Chip
              onPress={() => console.log('Pressed')}
              textStyle={{color: Colors.grey}}
              style={styles.foodName}>
              Masala Dosa
            </Chip>
            <Chip
              onPress={() => console.log('Pressed')}
              textStyle={{color: Colors.grey}}
              style={styles.foodName}>
              Pav Bhaji
            </Chip>
            <Chip
              onPress={() => console.log('Pressed')}
              textStyle={{color: Colors.grey}}
              style={styles.foodName}>
              Choco lava
            </Chip>
          </View>
          <Divider />
          <Text style={styles.popularItems}>Our Popular Items</Text>
          <PopularItems
            source={images.kadaiPaneer}
            title="Chole Bhatoore"
            subTitle="Prem Di hatti"
            price="₹ 249"
          />
        </>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.dishesText}>Dishes</Text>
          {data.map(m => (
            <DishCard />
          ))}
          <Text style={styles.seeMore}>See More</Text>
          <Text style={styles.restaurantText}>Restaurants</Text>
          <RestaurantTopPlaces
            source={images.restaurant}
            restaurantName="Manorama"
            restaurantRating="3.8(10K+) . 29 mins"
            restDishType="North Indian, Chinese,Biryani"
            restAddress="DLF Phase 3 . 4.3 km"
            restType=""
            restaurantOffer=""
            restaurantMaxOffer=""
            onPressHandler={() => navigation.navigate('RestaurantScreen')}
          />
        </ScrollView>
      )}
    </View>
  );
};
