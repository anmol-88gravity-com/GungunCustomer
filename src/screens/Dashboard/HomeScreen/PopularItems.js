import React, { useState } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, FlatList, ImageBackground, Pressable, TextInput, ScrollView } from 'react-native';
import { styles } from './HomeScreen.styles';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import { Colors } from '../../../utils/Colors';
import { FONT_SIZES } from '../../../utils/FontSize';
import { Font_Family } from '../../../utils/Fontfamily';
import { Button } from 'react-native-paper';
import { images } from '../../../utils/Images';

export const PopularItems = ({ source, title, subTitle, price }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const data = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },

  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.popularitems} onPress={() => setModalVisible(true)}>
        <View style={styles.imgView}>
          <Image source={source} style={{ height: '100%', width: '100%' }} />
        </View>
        <Text style={styles.Itemtitle}>{title}{'\n'}</Text>
        <Text style={styles.subItemtitle}>{subTitle}</Text>
        <Text style={styles.pricetitle}>{price}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                alignSelf: 'flex-end',
                // paddingVertical: 15,
                backgroundColor: 'red'
              }}>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <AntDesign name="close" size={24} color="black" />
              </Pressable>
            </View>



            <View style={styles.modalInnerView}>
              <View style={{ backgroundColor: Colors.white }} >
                {/* <ImageBackground source={images.vadaFood} style={{ width: '100%', height: '100%', resizeMode: 'stretch', borderRadius: 20 }} >
                      <View style={{ alignItems: 'flex-end', marginTop: '2%' }}>
                        <MaterialCommunityIcons name="heart-circle-outline" size={30} color='#000000' />
                        <MaterialCommunityIcons name="share-circle" size={30} color='#000000' />
                      </View>
                    </ImageBackground> */}
                <View style={{ height: 200, width: '100%', borderRadius: 20 }}>
                  <Image source={images.vadaFood} style={{ height: '100%', width: '100%', borderRadius: 10 }} />
                  <View style={{ position:'absolute', alignSelf:'flex-end'}}>
                  <MaterialCommunityIcons name="heart-circle-outline" size={30} color='#000000' />
                  <MaterialCommunityIcons name="share-circle" size={30} color='#000000' />
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="square-circle" size={18} color={Colors.green} />
                <View style={{ backgroundColor: '#f29652', borderRadius: 5, left: '5%', alignSelf: 'center', padding: 2 }}>
                  <Text style={{ textAlign: 'center', fontFamily: Font_Family.regular, fontSize: FONT_SIZES.tweleve, color: Colors.white }}>Bestseller</Text>
                </View>
              </View>

              <Text style={{ marginTop: '3%', fontFamily: Font_Family.regular, fontSize: FONT_SIZES.tweleve }}>Currently rava masala dosa made of rava batter filled with mash potatoes and spices served with tangy sambar and chutney.</Text>
            </View>











            <Button
              onPress={() => setModalVisible(true)}
              buttonColor={Colors.primary}
              theme={{ roundness: 0 }}
              style={{
                width: '100%',
                alignSelf: 'center',
                marginTop: 20,
                marginBottom: 10,
                borderRadius: 8,
              }}
              contentStyle={{ height: 50 }}
              labelStyle={{
                fontFamily: Font_Family.regular,
                fontSize: FONT_SIZES.fifteen,
              }}
              mode={'contained'}>
              Add Item ₹ 100
            </Button>
          </View>
        </View>
      </Modal>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
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
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },

  ];

  const renderItem = () => {
    return (
      <View >
        <View style={{ height: 60, width: 60, marginHorizontal: 20, top: '15%' }}>
          <Image source={source} style={styles.recomendImg} />
          <Text style={[styles.subItemtitle, { color: '#000000', marginTop: '10%' }]}>{title}</Text>
          <Image source={source} style={{ height: '100%', width: '100%', borderRadius: 30 }} />
          <Text style={[styles.subItemtitle, { top: '5%', color: '#000000' }]}>{title}</Text>
        </View>
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
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },



  ];

  const topResturents = () => {
    return (
      <View style={{ marginHorizontal: 5 }}>
        <View style={styles.resturantPlacesView}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 2, height: 100 }}>
              <View style={{ justifyContent: 'center', padding: 10 }}>
                <Text style={[styles.title, { marginVertical: 0 }]}>{resturantName}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: '2%' }}>
                  <MaterialCommunityIcons name="star-circle" size={20} color="#000000" style={styles.restuIcon} />
                  <Text style={[styles.resturantPlaceTitle,]}>{resturentRatting}</Text>
                </View>
                <Text style={styles.resturantPlaceTitle}>{restDishType}</Text>
                <Text style={[styles.resturantPlaceTitle, { marginTop: 5 }]}>{restAddress}</Text>

              </View>

            </View>
            <View style={{ flex: 1, }}>
              <ImageBackground source={source} style={styles.resturentBackImg}>
                <MaterialCommunityIcons name="cards-heart-outline" size={25} color="#000000" style={{ alignSelf: 'flex-end' }} />
                <View style={{

                  alignItems: 'flex-end',
                  // top: '15%',
                }}>
                  <Text style={[styles.title, { color: Colors.black, marginVertical: 0, fontWeight: 'bold' }]}>{restType}</Text>
                  <Text style={[styles.title, { color: Colors.black, marginVertical: 0, fontWeight: 'bold' }]}>{resturentOffer}</Text>
                  <Text style={[styles.title, { color: Colors.black, marginVertical: 0, fontWeight: 'bold' }]}>{resturentMaxOffer}</Text>
                </View>
              </ImageBackground>
            </View>
          </View>
        </View>
      </View>


    )
  }
  return (
    <FlatList data={data} renderItem={topResturents} />

  )
}



