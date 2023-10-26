import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Image,
  ImageBackground,
  ActivityIndicator,
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
  cartLoading,
  increment,
  decrement,
  qtyLoader,
  selectDishQty,
}) => {
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
    added_to_cart: false,
    quantity_in_cart: 0,
    category_name: '',
  });
  useEffect(() => {
    if (dishDetails !== undefined && dishDetails !== null) {
      setDetails(dishDetails);
    }
  }, [dishDetails]);

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
            {details.added_to_cart && (
              <View style={styles.countDownBtn}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.buttonDecrement}
                    disabled={qtyLoader}
                    onPress={() =>
                      decrement(details.id, details.category_name)
                    }>
                    <Entypo name="minus" size={24} color={Colors.primary} />
                  </TouchableOpacity>
                  <View style={styles.numberContainer}>
                    {qtyLoader && selectDishQty === details.id ? (
                      <ActivityIndicator
                        size={18}
                        color={Colors.primary}
                        style={{alignSelf: 'center'}}
                      />
                    ) : (
                      <Text style={styles.number}>
                        {details.quantity_in_cart}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    disabled={qtyLoader}
                    style={styles.buttonIncrement}
                    onPress={() =>
                      increment(details.id, details.category_name)
                    }>
                    <Entypo name="plus" size={24} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <Button
              onPress={() =>
                onPressHandler({
                  dishItemId: details.id,
                  storeId: details.partner_user,
                  price: details.dish_price,
                  quantity: 1,
                  categoryItemName: details.category_name,
                })
              }
              disabled={cartLoading || details.added_to_cart}
              loading={cartLoading}
              buttonColor={Colors.secondary}
              theme={{roundness: 0}}
              style={{
                width: details.added_to_cart ? '60%' : '100%',
                borderRadius: 8,
              }}
              contentStyle={{height: 50}}
              labelStyle={{
                fontFamily: Font_Family.regular,
                fontSize: FONT_SIZES.fifteen,
              }}
              mode={'contained'}>
              {details.added_to_cart ? 'Added to cart' : 'Add to cart'}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
