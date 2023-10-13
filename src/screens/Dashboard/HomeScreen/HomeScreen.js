import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-paper';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import GetLocation from 'react-native-get-location';
import {useDispatch} from 'react-redux';

import {images} from '../../../utils/Images';
import {styles} from './HomeScreen.styles';
import ScreenHeader from '../../../components/header/ScreenHeader';
import {Colors} from '../../../utils/Colors';
import {
  useGetAddressList,
  useGetProfileData,
  useGetCategorizedFoodtype,
} from '../../../hooks';
import {Loader} from '../../../components/common/Loader';
import {
  PopularItems,
  RecommendedItems,
  RestaurantTopPlaces,
} from './components';
import {useGetRestaurantList} from '../../../hooks/home/dashBoard/useGetRestaurantList';
import {useError} from '../../../context/ErrorProvider';
import {addUserLocation} from '../../../store/home/homeSlice';

export const HomeScreen = ({navigation}) => {
  const [addressData, setAddressData] = useState(null);
  const setError = useError();
  const dispatch = useDispatch();

  const {profileData, loading: userLoading} = useGetProfileData();
  const {addressList, loading} = useGetAddressList();
  const {foodType, loading: isLoading} = useGetCategorizedFoodtype();
  const {restaurantList, loader} = useGetRestaurantList();

  const getLocation = useCallback(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(async location => {
        try {
          await dispatch(
            addUserLocation({
              lat: location.latitude,
              long: location.longitude,
            }),
          ).unwrap();
        } catch (e) {
          // setError(e.message);
          console.log(e.message);
        }
      })
      .catch(error => {
        const {code, message} = error;
        setError('Error : ' + code + ' ' + message);
      });
  }, [dispatch, setError]);

  useEffect(() => {
    (async () => {
      check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      )
        .then(result => {
          switch (result) {
            case RESULTS.GRANTED:
              getLocation();
              break;
            case RESULTS.UNAVAILABLE:
              setError('This feature is not available on this device!');
              break;
            case RESULTS.DENIED:
              request(
                Platform.OS === 'ios'
                  ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                  : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
              ).then(requestResult => {
                if (requestResult === RESULTS.GRANTED) {
                  getLocation();
                }
              });
              break;
            case RESULTS.LIMITED:
              getLocation();
              break;
            case RESULTS.BLOCKED:
              setError(
                'The permission is denied! Please enable storage permission.',
              );
              openSettings().catch(settingsErr =>
                setError('Unable to open settings!'),
              );
              break;
          }
        })
        .catch(e => {
          setError(e.message);
        });
    })();

    return () => {};
  }, [getLocation, setError]);

  useEffect(() => {
    if (addressList !== undefined && addressList.length > 0) {
      const defaultAddress = addressList.find(
        address => address.is_default === true,
      );
      if (defaultAddress) {
        setAddressData(defaultAddress);
      }
    }
  }, [addressList]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScreenHeader headerTitle={profileData?.fullName} />
      {userLoading || loading || isLoading || loader ? (
        <Loader />
      ) : (
        <>
          <Pressable
            onPress={() =>
              navigation.navigate('AddressNavigator', {screen: 'Address'})
            }
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
              style={{width: '10%'}}
            />
            <View
              style={{
                width: '83%',
                paddingVertical: 8,
              }}>
              <Text style={styles.addressTitle}>
                {addressData?.address_type}
              </Text>
              <Text style={styles.textAddress}>
                {addressData?.address1 +
                  ', ' +
                  addressData?.address2 +
                  ', ' +
                  addressData?.city +
                  ', ' +
                  addressData?.state}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={24} color={Colors.primary} />
          </Pressable>
          <TouchableOpacity
            onPress={() => navigation.navigate('Search', {searchKey: ''})}>
            <View pointerEvents={'none'} style={styles.searchView}>
              <TextInput
                style={styles.input}
                placeholder="Search here"
                placeholderTextColor="#808080"
                editable={false}
                mode={'outlined'}
                theme={{roundness: 15}}
                outlineStyle={{borderColor: '#cdcdcd'}}
                left={<TextInput.Icon icon="search1" color={Colors.primary} />}
              />
            </View>
          </TouchableOpacity>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <View style={{marginHorizontal: 10}}>
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
                  <TouchableOpacity style={styles.orderNowButton}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                <Text style={[styles.title, {marginTop: 20}]}>
                  Popular Items
                </Text>
                <View
                  style={{
                    flex: 1,
                    marginTop: 10,
                  }}>
                  <PopularItems
                    source={images.kadaiPaneer}
                    title="Chole Bhatoore"
                    subTitle="Prem Di hatti"
                    price="₹ 249"
                  />
                </View>
                <Text style={[styles.title, {marginVertical: 0}]}>
                  What's on your mind ?
                </Text>
                <RecommendedItems
                  foodType={foodType}
                  onPressHandler={item =>
                    navigation.navigate('Search', {searchKey: item})
                  }
                />
                {restaurantList.length > 0 && (
                  <View style={{flex: 1}}>
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
                    {restaurantList.slice(0, 4).map((i, index) => (
                      <RestaurantTopPlaces
                        key={index + Math.random()}
                        source={i.profile_image}
                        icon="cards-heart-outline"
                        restaurantName={i.store_name}
                        restaurantRating={
                          `${i.average_rating}` + 'K . ' + `${i.speed}` + 'mins'
                        }
                        restDishType={
                          i.category_names.length < 3
                            ? i.category_names.map(a => a)
                            : i.category_names.splice(0, 2).map(b => b)
                        }
                        restAddress={i.address.address1}
                        restDistance={' (' + `${i.distance}` + ' km)'}
                        restType=""
                        restaurantOffer=""
                        restaurantMaxOffer=""
                        onPressHandler={() =>
                          navigation.navigate('RestaurantScreen', {
                            restaurantId: i.store_id,
                            dishId: null,
                            categoryName: null,
                          })
                        }
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
