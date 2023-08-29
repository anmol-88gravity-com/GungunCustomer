import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Chip, Divider, TextInput} from 'react-native-paper';

import {Colors} from '../../../utils/Colors';
import {Font_Family} from '../../../utils/Fontfamily';
import {FONT_SIZES} from '../../../utils/FontSize';
import {PopularItems, RestaurantTopPlaces} from '../HomeScreen/components';
import {images} from '../../../utils/Images';
import {DishCard} from './components/DishCard';

const data = [1, 2, 3];
export const SearchScreen = () => {
  const [search, setSearch] = useState('');
  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 10}}>
      <TextInput
        style={{
          backgroundColor: 'white',
          width: '100%',
          alignSelf: 'center',
          marginTop: 15,
        }}
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
          <Text
            style={{
              marginTop: 20,
              fontFamily: Font_Family.semiBold,
              fontSize: FONT_SIZES.thirteen,
              color: Colors.grey,
            }}>
            Recent Searches
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginVertical: 10,
            }}>
            <Chip
              onPress={() => console.log('Pressed')}
              textStyle={{color: Colors.grey}}
              style={{
                marginRight: 10,
                backgroundColor: 'white',
                borderWidth: 2,
                borderRadius: 100,
                borderColor: Colors.grey,
                marginBottom: 10,
              }}>
              Bikaner Sweets
            </Chip>
            <Chip
              onPress={() => console.log('Pressed')}
              textStyle={{color: Colors.grey}}
              style={{
                marginRight: 10,
                backgroundColor: 'white',
                borderWidth: 2,
                borderRadius: 100,
                borderColor: Colors.grey,
                marginBottom: 10,
              }}>
              Singla's Sweets
            </Chip>
            <Chip
              onPress={() => console.log('Pressed')}
              textStyle={{color: Colors.grey}}
              style={{
                marginRight: 10,
                backgroundColor: 'white',
                borderWidth: 2,
                borderRadius: 100,
                borderColor: Colors.grey,
                marginBottom: 10,
              }}>
              Om Sweets and Restaurants
            </Chip>
          </View>
          <Divider />
          <Text
            style={{
              marginTop: 20,
              fontFamily: Font_Family.semiBold,
              fontSize: FONT_SIZES.thirteen,
              color: Colors.grey,
            }}>
            Recommended
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginVertical: 10,
            }}>
            <Chip
              onPress={() => console.log('Pressed')}
              textStyle={{color: Colors.grey}}
              style={{
                marginRight: 10,
                backgroundColor: 'white',
                borderWidth: 2,
                borderRadius: 100,
                borderColor: Colors.grey,
                marginBottom: 10,
              }}>
              Masala Dosa
            </Chip>
            <Chip
              onPress={() => console.log('Pressed')}
              textStyle={{color: Colors.grey}}
              style={{
                marginRight: 10,
                backgroundColor: 'white',
                borderWidth: 2,
                borderRadius: 100,
                borderColor: Colors.grey,
                marginBottom: 10,
              }}>
              Pav Bhaji
            </Chip>
            <Chip
              onPress={() => console.log('Pressed')}
              textStyle={{color: Colors.grey}}
              style={{
                marginRight: 10,
                backgroundColor: 'white',
                borderWidth: 2,
                borderRadius: 100,
                borderColor: Colors.grey,
                marginBottom: 10,
              }}>
              Choco lava
            </Chip>
          </View>
          <Divider />
          <Text
            style={{
              marginVertical: 20,
              fontFamily: Font_Family.semiBold,
              fontSize: FONT_SIZES.thirteen,
              color: Colors.black,
            }}>
            Our Popular Items
          </Text>
          <PopularItems
            source={images.kadaiPaneer}
            title="Chole Bhatoore"
            subTitle="Prem Di hatti"
            price="₹ 249"
          />
        </>
      ) : (
        <ScrollView>
          <Text
            style={{
              marginVertical: 20,
              fontFamily: Font_Family.semiBold,
              fontSize: FONT_SIZES.fifteen,
              color: Colors.secondary,
            }}>
            Dishes
          </Text>
          {data.map(m => (
            <DishCard />
          ))}
          <Text
            style={{
              marginBottom: 20,
              fontFamily: Font_Family.semiBold,
              fontSize: FONT_SIZES.fifteen,
              color: Colors.secondary,
            }}>
            Restaurants
          </Text>
          <RestaurantTopPlaces
            source={images.restaurant}
            restaurantName="Manorama"
            restaurantRating="3.8(10K+) . 29 mins"
            restDishType="North Indian, Chinese,Biryani"
            restAddress="DLF Phase 3 . 4.3 km"
            restType=""
            restaurantOffer="₹125 OFF"
            restaurantMaxOffer="above ₹249"
          />
        </ScrollView>
      )}
    </View>
  );
};
