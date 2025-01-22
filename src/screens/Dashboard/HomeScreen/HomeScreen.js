import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  RefreshControl,  // Import RefreshControl
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { images } from '../../../utils/Images';
import { styles } from './HomeScreen.styles';
import ScreenHeader from '../../../components/header/ScreenHeader';
import { Colors } from '../../../utils/Colors';
import {
  useGetProfileData,
  useGetCategorizedFoodtype,
  useGetPopularItems,
} from '../../../hooks';
import { Loader } from '../../../components/common/Loader';
import {
  PopularItems,
  RecommendedItems,
  RestaurantTopPlaces,
} from './components';
import { useGetRestaurantList } from '../../../hooks/home/dashBoard/useGetRestaurantList';
import { useError } from '../../../context/ErrorProvider';
import Config from '../../../config';
import { addUserLocation } from '../../../store/home/homeSlice';

export const HomeScreen = ({ navigation }) => {
  const [addressData, setAddressData] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // Add refreshing state
  const setError = useError();
  const dispatch = useDispatch();

  const { profileData, loading: userLoading } = useGetProfileData();
  const { foodType, loading: isLoading } = useGetCategorizedFoodtype();
  // const { allPopularItems, error: popularItemsError } = useGetPopularItems(); // Comment out API call

  // Dummy data for popular items
  const dummyPopularItems = [
    { id: 1, name: 'Pizza', image: require('../../../assets/data/food.jpeg') },
    { id: 2, name: 'Burger', image: require('../../../assets/data/food.jpeg') },
    { id: 3, name: 'Pasta', image: require('../../../assets/data/food.jpeg') },
    { id: 4, name: 'Sushi', image: require('../../../assets/data/food.jpeg') },
  ];

  const { restaurantList, lat, long, load, loader } = useGetRestaurantList();

  const logApiResponse = (url, response) => {
    if (!response.ok) {
      console.error(`API Error at ${url}: ${response.status} ${response.statusText}`);
      setError(`Error fetching data from ${url}: ${response.status} ${response.statusText}`);
    }
  };

  function removeDuplicateRestaurants(restaurantList) {
    const seen = new Set();
    return restaurantList.filter((restaurant) => {
      if (seen.has(restaurant.store_id)) {
        return false;
      }
      seen.add(restaurant.store_id);
      return true;
    });
  }

  function getAddressFromCoordinates({ latitude, longitude }) {
    return new Promise((resolve, reject) => {
      fetch(
        `${Config.googleGetAddress}${latitude},${longitude}&key=${Config.googleMapsAPIkey}`
      )
        .then((response) => {
          logApiResponse('Google Address API', response);
          if (!response.ok) {
            reject(`Error: ${response.status} ${response.statusText}`);
            return;
          }
          return response.json();
        })
        .then((responseJson) => {
          if (responseJson.status === 'OK') {
            resolve(responseJson?.results?.[0]?.formatted_address);
            setAddressData(responseJson?.results?.[0]?.formatted_address);
          } else {
            reject('LOCATION NOT FOUND');
          }
        })
        .catch((error) => {
          console.error('Error fetching address:', error);
          reject(error);
        });
    });
  }

  useEffect(() => {
    (async () => {
      if (lat !== 0 && long !== 0) {
        try {
          await getAddressFromCoordinates({
            latitude: lat,
            longitude: long,
          });
          await dispatch(
            addUserLocation({
              lat,
              long,
            })
          ).unwrap();
          setLoading(false);
        } catch (e) {
          console.error('Error in useEffect:', e);
          setError(e.message);
        }
      }
    })();

    return () => { };
  }, [dispatch, lat, long, setError]);

  const uniqueRestaurantList = restaurantList?.length
    ? removeDuplicateRestaurants(restaurantList)
    : [];

  // Handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Refresh logic goes here, for example, re-fetch profile data or restaurant list
      await dispatch(addUserLocation({ lat, long })).unwrap();
    } catch (e) {
      console.error('Error during refresh:', e);
      setError(e.message);
    } finally {
      setRefreshing(false);  // Set refreshing to false after the refresh is complete
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScreenHeader headerTitle={profileData?.fullName} />
      {userLoading || loading || isLoading || loader || load ? (
        <Loader />
      ) : (
        <>
          <Pressable
            onPress={() => {
              navigation.navigate('AddressNavigator', { screen: 'Address' });
            }}
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}>
            <MaterialIcons
              name="location-on"
              size={28}
              color={Colors.red}
              style={{ width: '10%' }}
            />
            <View
              style={{
                width: '83%',
                paddingVertical: 8,
              }}>
              <Text numberOfLines={2} style={styles.textAddress}>
                {addressData}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={24} color={Colors.primary} />
          </Pressable>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Search', { searchKey: '' });
            }}>
            <View pointerEvents={'none'} style={styles.searchView}>
              <TextInput
                style={styles.input}
                placeholder="Search here"
                placeholderTextColor="#808080"
                editable={false}
                mode={'outlined'}
                theme={{ roundness: 15 }}
                outlineStyle={{ borderColor: '#cdcdcd' }}
                left={<TextInput.Icon icon="search1" color={Colors.primary} />}
              />
            </View>
          </TouchableOpacity>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.container}>
              <View style={{ marginHorizontal: 10 }}>
                <View
                  style={{
                    height: 200,
                    width: '100%',
                    borderRadius: 20,
                    justifyContent: 'center',
                  }}>
                  <Image source={images.bannerImg} style={styles.bannerImg} />
                  <Text style={styles.textImg}>
                    lowest delivery {'\n'} charges ever
                  </Text>
                  <TouchableOpacity
                    style={styles.orderNowButton}
                    onPress={() => { }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.orderText}>Order Now </Text>
                      <AntDesign
                        name="arrowright"
                        size={15}
                        color="#ffffff"
                        style={styles.arrowIcon}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <Text style={[styles.title, { marginTop: 20 }]}>Popular Items</Text>
                <View
                  style={{
                    marginTop: 10,
                  }}>
                  {dummyPopularItems.length > 0 ? (
                    <PopularItems popularItems={dummyPopularItems} />
                  ) : (
                    <View style={styles.noItemsContainer}>
                      <Text style={styles.noItemsText}>No popular items found.</Text>
                    </View>
                  )}

                </View>
                <Text style={[styles.title, { marginVertical: 0 }]}>What's on your mind ?</Text>
                <RecommendedItems
                  foodType={foodType}
                  onPressHandler={(item) => {
                    navigation.navigate('Search', { searchKey: item });
                  }}
                />
                {uniqueRestaurantList.length > 0 && (
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 8,
                      }}>
                      <MaterialIcons
                        name="location-on"
                        size={25}
                        color={Colors.red}
                      />
                      <Text style={styles.title}>Top places near you</Text>
                    </View>
                    {uniqueRestaurantList.slice(0, 4).map((i) => (
                      <RestaurantTopPlaces
                        key={i.store_id}
                        source={i.profile_image}
                        icon="cards-heart-outline"
                        restaurantName={i.store_name}
                        restaurantRating={
                          `${i.average_rating}` + 'K . ' + `${i.speed}` + 'mins'
                        }
                        restDishType={
                          i.category_names.length < 3
                            ? i.category_names.map((a) => a)
                            : i.category_names.splice(0, 2).map((b) => b)
                        }
                        restAddress={i.address.address1}
                        restDistance={' (' + `${i.distance}` + ' km)'}
                        restType=""
                        restaurantOffer=""
                        restaurantMaxOffer=""
                        onPressHandler={() => {
                          navigation.navigate('RestaurantScreen', {
                            restaurantId: i.store_id,
                            dishId: null,
                            categoryName: null,
                          });
                        }}
                      />
                    ))}
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};
