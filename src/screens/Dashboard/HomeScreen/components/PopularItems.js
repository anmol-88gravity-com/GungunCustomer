import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import {Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Colors} from '../../../../utils/Colors';
import {FONT_SIZES} from '../../../../utils/FontSize';
import {Font_Family} from '../../../../utils/Fontfamily';
import {styles} from '../HomeScreen.styles';
import {images} from '../../../../utils/Images';

export const PopularItems = ({source, title, subTitle, price}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const data = [
    {id: '1', title: 'Item 1'},
    {id: '2', title: 'Item 2'},
    {id: '3', title: 'Item 3'},
    {id: '4', title: 'Item 2'},
    {id: '5', title: 'Item 3'},
  ];

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.popularitems}
        onPress={() => setModalVisible(true)}>
        <View style={styles.imgView}>
          <Image source={source} style={{height: '100%', width: '100%'}} />
        </View>
        <Text style={styles.Itemtitle}>
          {title}
          {'\n'}
        </Text>
        <Text style={styles.subItemtitle}>{subTitle}</Text>
        <Text style={styles.pricetitle}>{price}</Text>
      </TouchableOpacity>
    );
  };

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
                backgroundColor: 'red',
              }}>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <AntDesign name="close" size={24} color="black" />
              </Pressable>
            </View>

            <View style={styles.modalInnerView}>
              <View style={{backgroundColor: Colors.white}}>
                <View style={{height: 200, width: '100%', borderRadius: 20}}>
                  <Image
                    source={images.vadaFood}
                    style={{height: '100%', width: '100%', borderRadius: 10}}
                  />
                  <View style={{position: 'absolute', alignSelf: 'flex-end'}}>
                    <MaterialCommunityIcons
                      name="heart-circle-outline"
                      size={30}
                      color="#000000"
                    />
                    <MaterialCommunityIcons
                      name="share-circle"
                      size={30}
                      color="#000000"
                    />
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <MaterialCommunityIcons
                  name="square-circle"
                  size={18}
                  color={Colors.green}
                />
                <View
                  style={{
                    backgroundColor: '#f29652',
                    borderRadius: 5,
                    marginLeft: 5,
                    alignSelf: 'center',
                    padding: 2,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: Font_Family.regular,
                      fontSize: FONT_SIZES.tweleve,
                      color: Colors.white,
                    }}>
                    Bestseller
                  </Text>
                </View>
              </View>

              <View style={{marginTop: '2%'}}>
                <Text
                  style={{
                    fontFamily: Font_Family.medium,
                    fontSize: FONT_SIZES.fifteen,
                    color: Colors.black,
                  }}>
                  Rava Masala Dosa
                </Text>

                <FlatList
                  data={data}
                  horizontal={true}
                  renderItem={({item}) => (
                    <View style={{flexDirection: 'row'}}>
                      <MaterialCommunityIcons
                        name="star-outline"
                        size={30}
                        color="black"
                      />
                    </View>
                  )}
                  keyExtractor={item => item.id}
                />
                <Text
                  style={{
                    fontSize: FONT_SIZES.tweleve,
                    fontFamily: Font_Family.medium,
                    top: '3%',
                    left: '5%',
                    color: Colors.black,
                  }}>
                  8 ratings
                </Text>
              </View>

              <Text
                style={{
                  marginTop: '3%',
                  fontFamily: Font_Family.regular,
                  fontSize: FONT_SIZES.tweleve,
                }}>
                Currently rava masala dosa made of rava batter filled with mash
                potatoes and spices served with tangy sambar and chutney.
              </Text>
            </View>

            <Button
              onPress={() => setModalVisible(true)}
              buttonColor={Colors.primary}
              theme={{roundness: 0}}
              style={{
                width: '100%',
                alignSelf: 'center',
                marginTop: 20,
                marginBottom: 10,
                borderRadius: 8,
              }}
              contentStyle={{height: 50}}
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
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
