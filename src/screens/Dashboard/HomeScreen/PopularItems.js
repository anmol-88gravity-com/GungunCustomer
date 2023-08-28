import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { styles } from './HomeScreen.styles';
import { images } from '../../../utils/Images';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Colors } from '../../../utils/Colors';

export const PopularItems = ({ source, title, subTitle, price }) => {

  const data = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },

  ];

  const renderItem = ({ item }) => (

    <TouchableOpacity style={styles.popularitems}>
      <View style={styles.imgView}>
        <Image source={source} style={{ height: '100%', width: '100%' }} />
      </View>
      <Text style={styles.Itemtitle}>{title}</Text>
      <Text style={styles.subItemtitle}>{subTitle}</Text>
      <Text style={styles.pricetitle}>{price}</Text>
    </TouchableOpacity>

  );

  return (
    // <TouchableOpacity style={styles.popularitems}>
    //   <View style={styles.imgView}>
    //     <Image source={source} style={{ height: '100%', width: '100%' }} />
    //   </View>
    //   <Text style={styles.Itemtitle}>{title}</Text>
    //   <Text style={styles.subItemtitle}>{subTitle}</Text>
    //   <Text style={styles.pricetitle}>{price}</Text>
    // </TouchableOpacity>
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export const RecomendedItem = ({ source, title }) => {

  const data = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },

  ];

  const renderItem = () => {
    return (
      <View style={{ height: 50, width: 50, marginHorizontal: 20, top: '15%' }}>
        <Image source={source} style={styles.recomendImg} />
        <Text style={[styles.subItemtitle, { color: '#000000' }]}>{title}</Text>
        <Image source={source} style={{ height: '100%', width: '100%', borderRadius: 30 }} />
        <Text style={[styles.subItemtitle, { top: '5%', color: '#000000' }]}>{title}</Text>
      </View>

    )
  }


  return (
    <FlatList data={data} renderItem={renderItem} horizontal={true} showsHorizontalScrollIndicator={false} />
  )
}

export const ResturantTopPlaces = ({ source, resturantName, resturentRatting, restDishType, restAddress, restType, resturentOffer, resturentMaxOffer }) => {
  const data = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },

  ];

  const topResturents = () => {
    return (
      <View style={styles.resturantPlacesView}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 2, height: 100 }}>
            <View style={{ justifyContent: 'center', padding: 10 }}>
              <Text style={[styles.title, { marginVertical: 0 }]}>{resturantName}</Text>
              <View style={{ flexDirection: 'row', }}>
                <MaterialCommunityIcons name="star-circle" size={20} color="#000000" style={styles.restuIcon} />
                <Text style={[styles.resturantPlaceTitle,]}>{resturentRatting}</Text>
              </View>
              <Text style={styles.resturantPlaceTitle}>{restDishType}</Text>
              <Text style={styles.resturantPlaceTitle}>{restAddress}</Text>

            </View>

          </View>
          <View style={{ flex: 1, height: 100 }}>
            <ImageBackground source={source} style={styles.resturentBackImg}>
              <MaterialCommunityIcons name="cards-heart-outline" size={25} color="#ffffff" />
              <View style={{ alignItems: 'flex-end', right: '5%', }}>
                <Text style={[styles.title, { color: Colors.white, marginVertical: 0, }]}>{restType}</Text>
                <Text style={[styles.title, { color: Colors.white, marginVertical: 0, }]}>{resturentOffer}</Text>
                <Text style={[styles.title, { color: Colors.white, marginVertical: 0, }]}>{resturentMaxOffer}</Text>
              </View>
            </ImageBackground>
          </View>

        </View>

      </View>

    )
  }
  return (
    <FlatList data={data} renderItem={topResturents} />

  )
}
