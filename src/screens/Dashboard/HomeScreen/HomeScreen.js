import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
  Pressable,
  ImageBackground,
} from 'react-native';
import { styles } from './HomeScreen.styles';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import { images } from '../../../utils/Images';
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '../../../components/header/ScreenHeader';
import { PopularItems, RecomendedItem, ResturantTopPlaces } from './PopularItems';




export const HomeScreen = () => {
  const navigation = useNavigation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <ScreenHeader headerTitle={"Let's Find \nFood Near You"} />
      <TouchableOpacity
        style={styles.searchView}
        onPress={() => navigation.navigate('Search')}>
        <AntDesign
          name="search1"
          size={20}
          color="#aaaaaa"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search here"
          placeholderTextColor="#aaaaaa"
          editable={false}
        />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
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
              <Text style={styles.textImg}>lowest delivery {"\n"} charges ever</Text>
              <TouchableOpacity style={styles.orderNowButton}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.orderText}>Order Now </Text>
                  <AntDesign name="arrowright" size={15} color='#ffffff' style={styles.arrowIcon} />
                </View>
              </TouchableOpacity>

            </View>

            <Text style={styles.title}>Popular Items</Text>
            <View style={{
              height: Platform.OS === 'ios' ? '18%' : '19%',
              //  backgroundColor: 'red', 
              flex: 1
            }}>
              <PopularItems
                source={images.kadaiPaneer}
                title="Chole Bhatoore"
                subTitle="Prem Di hatti"
                price="₹ 249"
              />
            </View>

            <Text style={[styles.title, { marginVertical: 0 }]}>What's On your mind ?</Text>
            <View style={{
              height: 220,
              // backgroundColor: 'pink', 
              flex: 1
            }}>
              <RecomendedItem
                source={images.burger}
                title="Pizza"
              />

            </View>

            <View style={{ flex: 1, }}>
              <View style={{
                flexDirection: 'row',
              }}>
                <MaterialIcons name="location-on" size={25} color="#000000" style={{ top: Platform.OS === 'ios' ? '4%' : '5%' }} />
                <Text style={[styles.title,]}>Top places near you</Text>
              </View>
              <ResturantTopPlaces
                source={images.kadaiPaneer}
                resturantName="Manorama"
                resturentRatting="3.8(10K+) . 29 mins"
                restDishType="North Indian, Chinese,Biryani"
                restAddress="DLF Phase 3 . 4.3 km"
                restType="FLAT DEAL"
                resturentOffer="₹125 OFF"
                resturentMaxOffer="ABOVE ₹249"

              />
            </View>

          </View>

        </View>
      </ScrollView>

    </SafeAreaView>
  );
};
