import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
// import notifee, {
//   AndroidColor,
//   AndroidImportance,
//   EventType,
// } from '@notifee/react-native';
// import messaging from '@react-native-firebase/messaging';

import {images} from '../../../utils/Images';
import {styles} from './HomeScreen.styles';
import ScreenHeader from '../../../components/header/ScreenHeader';
import {Colors} from '../../../utils/Colors';
import {useGetProfileData, useGetCategorizedFoodtype} from '../../../hooks';
import {Loader} from '../../../components/common/Loader';
import {
  PopularItems,
  RecommendedItems,
  RestaurantTopPlaces,
} from './components';
import {useGetRestaurantList} from '../../../hooks/home/dashBoard/useGetRestaurantList';
import {useError} from '../../../context/ErrorProvider';
import Config from '../../../config';
import {useGetUserCurrentLocation} from '../../../hooks/user/useGetUserCurrentLocation';
import {addUserLocation} from '../../../store/home/homeSlice';

export const HomeScreen = ({navigation}) => {
  const [addressData, setAddressData] = useState('');
  const [loading, setLoading] = useState(false);
  const setError = useError();
  const dispatch = useDispatch();

  const {profileData, loading: userLoading} = useGetProfileData();
  const {foodType, loading: isLoading} = useGetCategorizedFoodtype();
  const {restaurantList, loader} = useGetRestaurantList();
  const {lat, long, loader: load} = useGetUserCurrentLocation();

  // useEffect(() => {
  //   (async () => {
  //     await notifee.requestPermission();
  //     const channelId = await notifee.createChannel({
  //       id: 'default',
  //       name: 'Default Channel',
  //       vibration: true,
  //       vibrationPattern: [300, 500],
  //       lights: true,
  //       lightColor: AndroidColor.AQUA,
  //     });
  //     await messaging().registerDeviceForRemoteMessages();
  //     const token = await messaging().getToken();
  //     // console.log('token======>', token);
  //   })();
  //
  //   return notifee.onForegroundEvent(({type, detail}) => {
  //     switch (type) {
  //       case EventType.DISMISSED:
  //         // console.log('User dismissed notification', detail.notification);
  //         break;
  //       case EventType.PRESS:
  //         // console.log('User pressed notification', detail.notification);
  //         break;
  //     }
  //   });
  // }, []);
  //
  // async function onMessageReceived(message) {
  //   console.log('message==>', message);
  //   await notifee.displayNotification({
  //     title: message.notification.title,
  //     body: message.notification.body,
  //     android: {
  //       channelId: 'default',
  //       importance: AndroidImportance.HIGH,
  //     },
  //   });
  // }
  //
  // useEffect(() => {
  //   messaging().onMessage(onMessageReceived);
  //   // messaging().setBackgroundMessageHandler(onMessageReceived);
  // }, []);

  function getAddressFromCoordinates({latitude, longitude}) {
    return new Promise((resolve, reject) => {
      fetch(
        Config.googleGetAddress +
          latitude +
          ',' +
          longitude +
          '&key=' +
          Config.googleMapsAPIkey,
      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.status === 'OK') {
            resolve(responseJson?.results?.[0]?.formatted_address);
            setAddressData(responseJson?.results?.[0]?.formatted_address);
          } else {
            reject('LOCATION NOT FOUND');
          }
        })
        .catch(error => {
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
            }),
          ).unwrap();
          setLoading(false);
        } catch (e) {
          setError(e.message);
        }
      }
    })();

    return () => {};
  }, [dispatch, lat, long, setError]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScreenHeader headerTitle={profileData?.fullName} />
      {userLoading || loading || isLoading || loader || load ? (
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
              <Text numberOfLines={2} style={styles.textAddress}>
                {addressData}
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
