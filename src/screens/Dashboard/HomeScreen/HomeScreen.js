import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { images } from '../../../utils/Images';
import { styles } from './HomeScreen.styles';
import ScreenHeader from '../../../components/header/ScreenHeader';
import {
  PopularItems,
  RecommendedItems,
  RestaurantTopPlaces,
} from './components';
import { Colors } from '../../../utils/Colors';
import { TextInput } from 'react-native-paper';
import { setDefaultAddress } from '../../../store/address/addressSlice';
import { useGetAddressList } from '../../../hooks/address/useGetAddressList';

export const HomeScreen = ({ navigation }) => {
  const [addressData, setAddressData] = useState(null);
  const { addressList, loading } = useGetAddressList();

  const defaultAddresses = addressList;
  console.log('jnjdcbdjcd--dd-', defaultAddresses)


  
  return (
    <SafeAreaView style={styles.maincontainer}>
      <ScreenHeader headerTitle={"Let's Find \nFood Near You"} />
      <View
        style={{
          marginHorizontal: 20,
          width: '85%',
          bottom: Platform.OS === 'ios' ? 20 : 10
        }}>
        <View style={{ flexDirection: 'row', }}>
          <MaterialIcons
            name="location-on"
            size={25}
            color={Colors.red}
            style={{ marginTop: Platform.OS === 'ios' ? '4%' : '5%' }}
          />
          <Text style={styles.title}>Home</Text>
          <Ionicons
            name="chevron-down-sharp"
            size={10}
            color={Colors.black}
            style={{ top: Platform.OS === 'ios' ? '5%' : '6%', left: 5 }}
          />
        </View>
        <Text style={styles.textAddress}>{addressList[0]?.address2 && addressList[0]?.address1}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
              <TouchableOpacity style={styles.orderNowButton}>
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

            <Text style={styles.title}>Popular Items</Text>
            <View
              style={{
                height: Platform.OS === 'ios' ? '18%' : '19%',
                flex: 1,
              }}>
              <PopularItems
                source={images.kadaiPaneer}
                title="Chole Bhatoore"
                subTitle="Prem Di hatti"
                price="₹ 249"
              />
            </View>

            <Text style={[styles.title, { marginVertical: 0 }]}>
              What's On your mind ?
            </Text>
            <View
              style={{
                height: 220,
                flex: 1,
              }}>
              <RecommendedItems source={images.kadaiPaneer} title="Pizza" />
            </View>

            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <MaterialIcons
                  name="location-on"
                  size={25}
                  color={Colors.red}
                  style={{ top: Platform.OS === 'ios' ? '4%' : '5%' }}
                />
                <Text style={styles.title}>Top places near you</Text>
              </View>
              <RestaurantTopPlaces
                source={images.restaurant}
                icon="cards-heart-outline"
                restaurantName="Manorama"
                restaurantRating="3.8(10K+) . 29 mins"
                restDishType="North Indian, Chinese,Biryani"
                restAddress="DLF Phase 3 . 4.3 km"
                restType=""
                restaurantOffer="₹125 OFF"
                restaurantMaxOffer="above ₹249"
                onPressHandler={() => navigation.navigate('RestaurantScreen')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
