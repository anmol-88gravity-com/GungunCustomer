import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList, ScrollView, Platform } from 'react-native';
import { FONT_SIZES } from '../../../utils/FontSize';
import { Font_Family } from '../../../utils/Fontfamily';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../utils/Colors';

import { images } from '../../../utils/Images';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];
const { height } = Dimensions.get('window');
const Item = () => (
  <View style={styles.mainItemView}>
    <View style={styles.itemDetailView}>
      <View style={{ flexDirection: 'row' }}>
        <MaterialCommunityIcons
          name="star-circle"
          size={20}
          color={Colors.green}
          style={styles.restuIcon}
        />
        <Image source={images.medal} style={{ height: 20, width: 20 }} />
        <Text style={styles.textBestSeller}>Bestseller</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={[styles.dishText, { marginLeft: 2 }]}>Onion Pizza</Text>
        <Text style={[styles.dishDetailText, { marginLeft: 2, marginTop: 10, fontSize: 15 }]}>₹105</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: '5%' }}>
        <MaterialCommunityIcons
          name="star-circle"
          size={18}
          color={Colors.green}
          style={styles.restuIcon}
        />
        <Text style={styles.dishRatingText}>3.2(82)</Text>
      </View>
     
    </View>

    <View style={styles.itemImg}>
      <Image source={images.bannerImg} style={styles.itemImgSize} />
    </View>
  </View>
);

export const AddAddressScreen = () => {

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.adView}>
              <Text style={{ textAlign: 'center', fontSize: 10, }}>Ad</Text>
            </View>
            <Text style={styles.dishText}>La Pino'a Pizza</Text>
          </View>
          <AntDesign name="arrowright" size={18} color={Colors.primary} />
        </View>

        <View style={{ flexDirection: 'row', marginTop: '2%' }}>
          <MaterialCommunityIcons
            name="star-circle"
            size={20}
            color={Colors.green}
            style={styles.restuIcon}
          />
          <Text style={styles.dishDetailText}>3.8 (500+) . 22mins</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: '2%' }}>
          <MaterialIcons name="percent" size={18} color={Colors.black} />
          <Text style={styles.dishDiscountText}>60% off upto 120</Text>
        </View>
        <FlatList
          data={DATA}
          renderItem={Item}
          keyExtractor={item => item.id}
          
        />

      </View>
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'white', alignItems: 'center', marginTop: '20%'
  },
  mainView: {
    backgroundColor: Colors.white,
    padding: 20,
    width: '100%',
    height: height * 0.4, 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  adView: { backgroundColor: '#ccc', width: 20, height: 20, justifyContent: 'center', borderRadius: 5 },
  dishText: {
    fontSize: FONT_SIZES.eighteen,
    fontFamily: Font_Family.bold,
    marginLeft: 10
  },
  dishDetailText: {
    fontSize: FONT_SIZES.eighteen,
    fontFamily: Font_Family.medium,
    marginLeft: 10
  },
  dishDiscountText: {
    fontSize: FONT_SIZES.fifteen,
    fontFamily: Font_Family.medium,
    marginLeft: 10,
    color: Colors.grey
  },
  dishRatingText: {
    fontSize: FONT_SIZES.thirteen,
    fontFamily: Font_Family.medium,
    marginLeft: 8,
    marginTop: '2%'
  },
  iconColor: {
    backgroundColor: Colors.green,
    borderRadius: 50,
    padding: 2,
    justifyContent: 'center',
    alignContent: 'center'
  },
  mainItemView: {
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 10,
    // paddingBottom: '5%',
    width: '100%',
    // height: Platform.OS === 'ios' ? 180 : 200,

  },
  itemDetailView: {
    // backgroundColor: 'yellow', 
    flex: 2, padding: 10,

  },
  itemImg: {
    // backgroundColor: 'green',
    flex: 1, padding: 10
  },
  itemImgSize: {
    height: 110,
    width: '100%',
    borderRadius: 10
  },
  textBestSeller: {
    color: Colors.secondary,
    fontFamily: Font_Family.bold,
    fontSize: FONT_SIZES.tweleve,
    marginTop: '2%'
  },
  moreView: {
    borderWidth: 1,
    borderColor: Colors.grey,
    width: '50%',
    padding: 5,
    borderRadius: 20,
    flexDirection: 'row',
    marginTop: '10%'
  },
  moreText: { fontSize: FONT_SIZES.thirteen, color: Colors.grey, fontFamily: Font_Family.medium, marginTop: '2%' },
  addButton:
  {
    padding: 8,
    backgroundColor: Colors.white,
    bottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText:
  {
    textAlign: 'center',
    fontFamily: Font_Family.bold,
    fontSize: FONT_SIZES.fifteen,
    color: Colors.green,
  }

})