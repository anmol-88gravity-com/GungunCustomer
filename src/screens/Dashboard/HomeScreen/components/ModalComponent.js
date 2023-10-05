import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Image,
  ImageBackground,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Button} from 'react-native-paper';

import {styles} from '../HomeScreen.styles';
import {Colors} from '../../../../utils/Colors';
import {images} from '../../../../utils/Images';
import {FONT_SIZES} from '../../../../utils/FontSize';
import {Font_Family} from '../../../../utils/Fontfamily';
import Config from '../../../../config';
import Entypo from 'react-native-vector-icons/Entypo';

export const ModalComponent = ({
  isVisible,
  onClose,
  dishDetails,
  onPressHandler,
}) => {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    dish_category: '',
    dish_description: '',
    dish_image: '',
    dish_name: '',
    dish_price: '',
    dish_status: false,
    dish_type: '',
    id: '',
    partner_user: '',
  });
  useEffect(() => {
    if (dishDetails !== undefined && dishDetails !== null) {
      setDetails(dishDetails);
    }
  }, [dishDetails]);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count === 1) {
      return;
    } else {
      setCount(count - 1);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{alignSelf: 'flex-end'}}>
            <Pressable onPress={onClose}>
              <AntDesign name="close" size={24} color="black" />
            </Pressable>
          </View>
          <View style={styles.modalInnerView}>
            <ImageBackground
              source={{uri: Config.API_URL + details.dish_image}}
              resizeMode={'cover'}
              style={{
                height: 200,
                width: '100%',
                borderRadius: 20,
              }}>
              <View style={styles.bestSellerIcon}>
                <MaterialCommunityIcons
                  name="share-circle"
                  size={30}
                  color={Colors.primary}
                />
              </View>
            </ImageBackground>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <MaterialCommunityIcons
                name="square-circle"
                size={18}
                color={details.dish_type === 'V' ? Colors.green : Colors.red}
              />
              <Text style={styles.itemsName}>{details.dish_name}</Text>
            </View>
            <View style={styles.bestSellerView}>
              <Image source={images.medal} style={{height: 15, width: 15}} />
              <Text style={styles.txtBestSeller}>Bestseller </Text>
            </View>
            <Text
              style={{
                marginTop: '3%',
                fontFamily: Font_Family.regular,
                fontSize: FONT_SIZES.tweleve,
              }}>
              {details.dish_description}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 10,
            }}>
            <View style={styles.countDownBtn}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.buttonDecrement}
                  onPress={decrement}>
                  <Entypo name="minus" size={24} color={Colors.primary} />
                </TouchableOpacity>
                <View style={styles.numberContainer}>
                  <Text style={styles.number}>{count}</Text>
                </View>
                <TouchableOpacity
                  style={styles.buttonIncrement}
                  onPress={increment}>
                  <Entypo name="plus" size={24} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
            <Button
              onPress={() =>
                onPressHandler({
                  dishId: details.id,
                  storeId: details.partner_user,
                  price: details.dish_price,
                  quantity: count,
                })
              }
              disabled={loading}
              loading={loading}
              buttonColor={Colors.secondary}
              theme={{roundness: 0}}
              style={{
                width: '60%',
                borderRadius: 8,
              }}
              contentStyle={{height: 50}}
              labelStyle={{
                fontFamily: Font_Family.regular,
                fontSize: FONT_SIZES.fifteen,
              }}
              mode={'contained'}>
              Add to cart
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
