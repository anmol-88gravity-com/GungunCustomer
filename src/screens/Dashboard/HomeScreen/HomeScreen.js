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

const data = [1, 2, 3, 4, 5];
export const HomeScreen = ({navigation}) => {
  const [addressData, setAddressData] = useState(null);

  const {profileData, loading: userLoading} = useGetProfileData();
  const {addressList, loading} = useGetAddressList();
  const {foodType, loading: isLoading} = useGetCategorizedFoodtype();

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
      {userLoading || loading || isLoading ? (
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
                  {data.map(i => (
                    <RestaurantTopPlaces
                      key={i}
                      source={images.restaurant}
                      icon="cards-heart-outline"
                      restaurantName="Manorama"
                      restaurantRating="3.8(10K+) . 29 mins"
                      restDishType="North Indian, Chinese,Biryani"
                      restAddress="DLF Phase 3 . 4.3 km"
                      restType=""
                      restaurantOffer="₹125 OFF"
                      restaurantMaxOffer="above ₹249"
                      onPressHandler={() =>
                        navigation.navigate('RestaurantScreen', {
                          restaurantId: '9',
                        })
                      }
                    />
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};
