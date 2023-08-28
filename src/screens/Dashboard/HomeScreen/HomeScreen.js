import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  ImageBackground,
} from 'react-native';
import { styles } from './HomeScreen.styles';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';


import { images } from '../../../utils/Images';
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '../../../components/header/ScreenHeader';
import { PopularItems, RecomendedItem, ResturantTopPlaces } from './PopularItems';
import { Colors } from '../../../utils/Colors';



export const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('All');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <ScreenHeader headerTitle={"Let's Find \nFood Near You"} />
      <TouchableOpacity style={styles.searchView} onPress={() => navigation.navigate('Search')}>
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
            <View style={{ height: 200, width: '100%', borderRadius: 20, justifyContent: 'center' }}>
              <Image source={images.bannerImg} style={styles.bannerImg} />
              <Text style={styles.textImg}>lowest delivery {"\n"} charges ever</Text>
              <TouchableOpacity style={styles.orderNowButton}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.orderText}>Order Now</Text>
                  <AntDesign name="arrowright" size = {15} color='#ffffff' style={styles.arrowIcon}/>
                </View>
              </TouchableOpacity>

            </View>
            <Text style={styles.title}>Popular Items</Text>
            <View style={{ height: 210 }}>
              <PopularItems
                source={images.kadaiPaneer}
                title="Chole Bhatoore"
                subTitle="Prem Di hatti"
                price="₹ 249"
              />
            </View>
            <View style={{ height: 230 }}>
              <Text style={[styles.title, { marginVertical: 0 }]}>What's On your mind ?</Text>
              <RecomendedItem
                source={images.burger}
                title="Pizza"

              />
            </View>

            <View style={{ flexDirection: 'row', bottom: '8%' }}>
              <MaterialIcons name="location-on" size={25} color="#000000" style={{ top: Platform.OS === 'ios' ? '4%' : '5%' }} />
              <Text style={[styles.title,]}>Top places near you</Text>
            </View>
            <View style={{ top: -30 }}>
              <ResturantTopPlaces
                source={images.momos}
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

