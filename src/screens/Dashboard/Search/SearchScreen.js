import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {Chip, Divider, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

import {Colors} from '../../../utils/Colors';
import {PopularItems} from '../HomeScreen/components';
import {images} from '../../../utils/Images';
import {styles} from './SearchScreeen.styles';
import {useError} from '../../../context/ErrorProvider';
import {
  deleteSuggestion,
  getRecentSearches,
  getSearchResults,
} from '../../../store/home/homeSlice';
import Config from '../../../config';
import { useGetPopularItems } from '../../../hooks';

export const SearchScreen = ({route, navigation}) => {
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [recentSearchList, setRecentSearchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedChip, setSelectedChip] = useState(null);
  const {recentSearch} = useSelector(state => state.home);
  const { allPopularItems } = useGetPopularItems();

  const inputKey = route.params.searchKey;

  const dispatch = useDispatch();
  const setError = useError();

  useEffect(() => {
    if (inputKey) {
      setSearch(inputKey);
    }
  }, [inputKey, route]);

  useEffect(() => {
    if (recentSearch.length > 0) {
      setRecentSearchList(recentSearch);
    }
  }, [recentSearch]);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getRecentSearches()).unwrap();
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [dispatch, setError]);

  const searchFilterFunction = async text => {
    setSearch(text);
    try {
      const res = await dispatch(getSearchResults({text})).unwrap();
      if (res) {
        setFilterData(res);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const onCloseHandler = async id => {
    setLoading(true);
    setSelectedChip(id);
    try {
      await dispatch(deleteSuggestion({id})).unwrap();
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyles}
        autoFocus={true}
        value={search}
        onChangeText={text => searchFilterFunction(text)}
        placeholder="Search here"
        placeholderTextColor="#808080"
        mode={'outlined'}
        outlineStyle={{borderColor: '#cdcdcd'}}
        theme={{roundness: 15}}
        activeOutlineColor={Colors.primary}
        left={<TextInput.Icon icon="search1" color={Colors.primary} />}
      />
      {filterData.length === 0 ? (
        <View>
          {recentSearchList.length > 0 && (
            <>
              <Text style={styles.recentSearches}>Recent Searches</Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginVertical: 10,
                  paddingHorizontal: 20,
                }}>
                {recentSearchList.map(m => (
                  <Chip
                    textStyle={{color: Colors.grey}}
                    closeIcon={() =>
                      loading && selectedChip === m.id ? (
                        <ActivityIndicator size={'small'} color={Colors.grey} />
                      ) : (
                        <Ionicons
                          name={'close'}
                          color={Colors.grey}
                          size={18}
                        />
                      )
                    }
                    disabled={loading}
                    style={styles.chipStyles}
                    onClose={() => onCloseHandler(m.id)}
                    onPress={() => setSearch(m.keyword)}>
                    {m.keyword}
                  </Chip>
                ))}
              </View>
            </>
          )}
          <Divider />
          <Text style={styles.recommended}>Recommended</Text>
          <View style={styles.chipRow}>
            <Chip
              textStyle={{color: Colors.grey}}
              style={styles.foodName}
              onPress={() => setSearch(m.keyword)}>
              Masala Dosa
            </Chip>
            <Chip textStyle={{color: Colors.grey}} style={styles.foodName}>
              Pav Bhaji
            </Chip>
            <Chip textStyle={{color: Colors.grey}} style={styles.foodName}>
              Choco lava
            </Chip>
          </View>
          <Divider />
          <Text style={styles.popularItems}>Our Popular Items</Text>
          <PopularItems
          popularItems={allPopularItems}
            // source={images.kadaiPaneer}
            // title="Chole Bhatoore"
            // subTitle="Prem Di hatti"
            // price="₹ 249"
          />
        </View>
      ) : (
        <>
          <Text style={styles.restaurantText}>Restaurants</Text>
          <FlatList
            keyExtractor={item => item.partner_user + Math.random()}
            showsVerticalScrollIndicator={false}
            data={filterData}
            nestedScrollEnabled={true}
            renderItem={({item}) => {
              const ratingArr = Array.from(
                Array(item.store_rating),
                i => i + 1,
              );
              const nonRatingArr = Array.from(
                Array(5 - item.store_rating),
                i => i + 1,
              );
              return (
                <View style={[styles.mainView]}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('RestaurantScreen', {
                        restaurantId: item.partner_user,
                        dishId: null,
                        categoryName: null,
                      })
                    }>
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
                      <Text style={styles.dishDetailText}>
                        {' '}
                        15 KM | 20-22 mins
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
                      {ratingArr.map(m => (
                        <Ionicons
                          name="star"
                          size={18}
                          color={Colors.secondary}
                        />
                      ))}
                      {nonRatingArr.map(m => (
                        <Ionicons name="star" size={18} color={Colors.grey} />
                      ))}
                    </View>
                    <Text style={styles.dishDetailText}>
                      {item.address.address1} {', '}
                      {item.address.city}
                    </Text>
                  </Pressable>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                    }}>
                    {item.dishes.slice(0, 4).map(m => (
                      <Pressable
                        style={styles.mainItemView}
                        onPress={() =>
                          navigation.navigate('RestaurantScreen', {
                            restaurantId: item.partner_user,
                            dishId: m.dish_id,
                            categoryName: m.category.category_name,
                          })
                        }>
                        <View style={styles.itemImg}>
                          <Image
                            style={styles.itemImgSize}
                            source={{uri: Config.API_URL + m.dish_image}}
                            resizeMode={'cover'}
                          />
                        </View>
                        <View style={{}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginTop: 5,
                            }}>
                            <Image
                              source={require('../../../assets/dashboardImages/medal.png')}
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
                              size={18}
                              color={
                                m.dish_type === 'V' ? Colors.green : Colors.red
                              }
                            />
                            <Text
                              numberOfLines={2}
                              style={[styles.dishText, {marginHorizontal: 8}]}>
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
                      </Pressable>
                    ))}
                  </View>
                </View>
              );
            }}
          />
        </>
      )}
    </View>
  );
};
