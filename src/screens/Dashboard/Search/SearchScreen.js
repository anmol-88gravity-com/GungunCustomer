import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import {Chip, Divider, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

import {Colors} from '../../../utils/Colors';
import {PopularItems} from '../HomeScreen/components';
import {images} from '../../../utils/Images';
import {DishCard} from './components/DishCard';
import {styles} from './SearchScreeen.styles';
import {useError} from '../../../context/ErrorProvider';
import {getSearchResults} from '../../../store/home/homeSlice';
import Config from '../../../config';

const height = Dimensions.get('screen').height;

const data = [1, 2, 3];
export const SearchScreen = ({route, navigation}) => {
  const [search, setSearch] = useState('vada');
  const [filterData, setFilterData] = useState([]);

  const inputKey = route.params.searchKey;


  const dispatch = useDispatch();
  const setError = useError();

  useEffect(() => {
    if (inputKey) {
      setSearch(inputKey);
    }
  }, [inputKey, route]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await dispatch(getSearchResults({search})).unwrap();
        if (res) {
          setFilterData(res);
        }
      } catch (e) {
        setError(e.message);
      }
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, search, setError]);

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
      {filterData === [] ? (
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
              Singla's Sweetsgit
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
        <FlatList
          keyExtractor={item => String(item.partner_user)}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => {
            return (
              <>
                <Text style={styles.dishesText}>Dishes</Text>
                {data.map(m => (
                  <DishCard />
                ))}
                <Text style={styles.seeMore}>See More</Text>
                <Text style={styles.restaurantText}>Restaurants</Text>
              </>
            );
          }}
          data={filterData}
          nestedScrollEnabled={true}
          renderItem={({item}) => {
            const ratingArr = Array.from(Array(item.store_rating), i => i + 1);
            const nonRatingArr = Array.from(
              Array(5 - item.store_rating),
              i => i + 1,
            );
            return (
              <Pressable
                style={[
                  styles.mainView,
                  {
                    height:
                      item.dishes.length >= 2 ? height * 0.4 : height * 0.3,
                  },
                ]}
                onPress={() =>
                  navigation.navigate('RestaurantScreen', {
                    restaurantId: item.partner_user,
                  })
                }
                
                >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.dishText}>{item.store_name}</Text>
                  <AntDesign
                    name="arrowright"
                    size={18}
                    color={Colors.primary}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <MaterialCommunityIcons
                    name="star-circle"
                    size={20}
                    color={Colors.green}
                    style={styles.restuIcon}
                  />
                  <Text style={styles.dishDetailText}> 15 KM | 20-22 mins</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  {ratingArr.map(m => (
                    <Ionicons name="star" size={18} color={Colors.secondary} />
                  ))}
                  {nonRatingArr.map(m => (
                    <Ionicons name="star" size={18} color={Colors.grey} />
                  ))}
                </View>
                <Text style={styles.dishDetailText}>
                  {item.address.address1} {', '}
                  {item.address.city}
                </Text>
                <View style={{flex: 1}}>
                  <ScrollView style={{marginTop: 5}} nestedScrollEnabled={true}>
                    {item.dishes.map(m => (
                      <View style={styles.mainItemView}>
                        <View style={{width: '70%'}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginTop: 5,
                            }}>
                            <Image
                              source={images.medal}
                              style={{height: 20, width: 20}}
                            />
                            <Text style={styles.textBestSeller}>
                              Bestseller
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginTop: 8,
                            }}>
                            <MaterialCommunityIcons
                              name="square-circle"
                              size={20}
                              color={
                                m.dish_type === 'V' ? Colors.green : Colors.red
                              }
                            />
                            <Text style={[styles.dishText, {marginLeft: 8}]}>
                              {m.dish_name}
                            </Text>
                          </View>
                          <Text
                            style={[
                              styles.dishDetailText,
                              {marginLeft: 2, marginTop: 10, fontSize: 15},
                            ]}>
                            ₹ {m.dish_price}
                          </Text>
                        </View>

                        <View style={styles.itemImg}>
                          <Image
                            style={styles.itemImgSize}
                            source={{uri: Config.API_URL + m.dish_image}}
                            resizeMode={'cover'}
                          />
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
};
