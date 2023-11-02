import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button, RadioButton} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';

import {Colors} from '../../utils/Colors';
import {styles} from './cart.styles';
import {useGetAddressList, useGetProfileData} from '../../hooks';
import {useGetCartItemsData} from '../../hooks/cart/useGetCartItemsData';
import {
  decreaseItemQuantity,
  deleteCart,
  increaseItemQuantity,
} from '../../store/cart/cartSlice';
import {FONT_SIZES} from '../../utils/FontSize';
import {Font_Family} from '../../utils/Fontfamily';
import {Loader} from '../../components/common/Loader';
import {useError} from '../../context/ErrorProvider';
import {useGetBillSummary} from '../../hooks/cart/useGetBillSummary';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Config from '../../config';
import {SafeAreaView} from 'react-native-safe-area-context';

export const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {profileData} = useGetProfileData();
  const {addressList, loading} = useGetAddressList();
  const {billData, loading: loadBill} = useGetBillSummary();
  const {cartItems, loading: isLoading} = useGetCartItemsData();

  const [addressData, setAddressData] = useState(null);
  const [cartItemsData, setCartItemsData] = useState([]);
  const [incLoader, setIncLoader] = useState(false);
  const [decLoader, setDecLoader] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('offline');

  const setError = useError();

  useEffect(() => {
    setCartItemsData(cartItems);
    setIsOpen(false)
  }, [cartItems]);

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

  const CartItem = ({
    item_id,
    itemName,
    itemPrice,
    itemQuantity,
    dish_type,
    dish_id,
    category_name,
  }) => {
    const increaseQuantityHandler = async (
      itemId,
      cartItemId,
      itemCategoryName,
    ) => {
      setSelected(cartItemId);
      setIncLoader(true);
      try {
        await dispatch(
          increaseItemQuantity({itemId, cartItemId, itemCategoryName}),
        ).unwrap();
        showMessage({
          message: 'Item quantity increased successfully.',
          type: 'default',
          backgroundColor: Colors.secondary,
          color: Colors.white,
          textStyle: {
            fontSize: FONT_SIZES.fifteen,
            fontFamily: Font_Family.medium,
          },
        });
        setIncLoader(false);
      } catch (e) {
        setError(e.message);
      }
      setIncLoader(false);
    };

    const decreaseQuantityHandler = async (
      itemId,
      cartItemId,
      itemCategoryName,
    ) => {
      setSelected(cartItemId);
      setDecLoader(true);
      try {
        await dispatch(
          decreaseItemQuantity({itemId, cartItemId, itemCategoryName}),
        ).unwrap();
        showMessage({
          message: 'Item quantity decreased successfully.',
          type: 'default',
          backgroundColor: Colors.secondary,
          color: Colors.white,
          textStyle: {
            fontSize: FONT_SIZES.fifteen,
            fontFamily: Font_Family.medium,
          },
        });
        setDecLoader(false);
      } catch (e) {
        setError(e.message);
      }
      setDecLoader(false);
    };

    return (
      <View
        style={{
          borderBottomColor: Colors.grey,
          borderBottomWidth: 1,
          paddingVertical: 8,
        }}>
        <View style={styles.itemRowStyles}>
          <View style={styles.itemInnerRow}>
            {dish_type === 'V' ? (
              <MaterialCommunityIcons
                name="square-circle"
                size={18}
                color={Colors.green}
              />
            ) : (
              <MaterialCommunityIcons
                name="square-circle"
                size={18}
                color={Colors.red}
              />
            )}
            <Text
              numberOfLines={3}
              style={[styles.itemName, {textTransform: 'capitalize'}]}>
              {itemName}
            </Text>
          </View>
          <View style={styles.qtyBox}>
            <View style={styles.qtyContainer}>
              <Pressable
                style={{padding: 5}}
                onPress={() =>
                  decreaseQuantityHandler(dish_id, item_id, category_name)
                }>
                <AntDesign name="minus" size={22} color={Colors.primary} />
              </Pressable>
              {(incLoader || decLoader) && item_id === selected ? (
                <ActivityIndicator
                  size={'small'}
                  color={Colors.primary}
                  style={{
                    alignSelf: 'center',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                  }}
                />
              ) : (
                <Text style={styles.qty}>{itemQuantity}</Text>
              )}
              <Pressable
                style={{padding: 5}}
                onPress={() =>
                  increaseQuantityHandler(dish_id, item_id, category_name)
                }>
                <Ionicons name="add" size={20} color={Colors.primary} />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={[styles.itemRowStyles, {marginTop: 5}]}>
          <Text numberOfLines={1} style={[styles.itemPrice, {marginLeft: 25}]}>
            Rs {itemPrice}
          </Text>
          <Text numberOfLines={1} style={styles.itemPrice}>
            Rs {itemPrice * itemQuantity}
          </Text>
        </View>
      </View>
    );
  };

  const handleAddMoreItems = () => {
    if (cartItemsData) {
      cartItemsData.forEach(item => {
        navigation.navigate('RestaurantScreen', {
          restaurantId: item.store_id,
          dishId: null,
          categoryName: null,
        });
      });
    }
  };

  const handleProceedToPayment = () => {
    {
      var options = {
        description: 'Credits towards consultation',
        image: Config?.API_URL + profileData?.profileImage?.uri,
        currency: 'INR',
        key: Config?.RazorPay_TestKey,
        amount: '5000',
        name: 'Gungun',
        order_id: '',
        prefill: {
          email: profileData?.email,
          contact: profileData?.phoneNumber,
          name: profileData?.fullName,
        },
        theme: {color: Colors.primary},
      };
      RazorpayCheckout.open(options)
        .then(data => {
          alert(`Success: ${data.razorpay_payment_id}`);
        })
        .catch(error => {
          alert(`Error: ${error.code} | ${error.description}`);
        });
    }
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      {loading || isLoading || loadBill ? (
        <Loader />
      ) : cartItems?.length === 0 ? (
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../assets/icons/empty-cart.png')}
            style={{width: 200, height: 200}}
            resizeMode={'contain'}
          />
          <Text
            style={{
              fontFamily: Font_Family.semiBold,
              fontSize: FONT_SIZES.eighteen,
              color: 'black',
              paddingHorizontal: 10,
              textAlign: 'center',
            }}>
            Your cart is empty
          </Text>
          <Text
            style={[
              styles.addMoreItemsText,
              {textAlign: 'center', width: '60%', marginTop: 10},
            ]}>
            Looks like you haven't added anything to your cart yet.
          </Text>
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <Text style={styles.heading}>Items Added</Text>
            <View style={styles.cardContainer}>
              <View>
                {cartItemsData?.length > 0 &&
                  cartItemsData?.map((item, index) => (
                    <CartItem
                      key={index}
                      item_id={item?.item_id}
                      itemName={item?.dish_name}
                      itemPrice={item?.price}
                      itemQuantity={item?.quantity}
                      dish_type={item?.dish_type}
                      dish_id={item?.dish_id}
                      category_name={item?.category_name}
                    />
                  ))}
              </View>
              <Pressable style={styles.addMoreRow} onPress={handleAddMoreItems}>
                <View style={styles.rowStyles}>
                  <MaterialIcons name="add-box" size={24} color="black" />
                  <Text style={styles.addMoreItemsText}>Add more Items</Text>
                </View>
                <Entypo name="chevron-small-right" size={24} color="black" />
              </Pressable>
            </View>
            {/*<Pressable style={styles.shadowCard}>*/}
            {/*<View style={styles.rowStyles}>*/}
            {/*  <MaterialCommunityIcons*/}
            {/*    name="brightness-percent"*/}
            {/*    size={24}*/}
            {/*    color={Colors.secondary}*/}
            {/*  />*/}
            {/*  <View>*/}
            {/*    <Text style={styles.couponHeading}>*/}
            {/*      /!*Apply Coupon*!/*/}
            {/*      Coupon Applied*/}
            {/*    </Text>*/}
            {/*    <Text style={styles.couponText}>EXTRA200</Text>*/}
            {/*  </View>*/}
            {/*</View>*/}
            {/*  <View style={styles.rowStyles}>*/}
            {/*    <Text style={styles.viewAllText}>View All</Text>*/}
            {/*    <Entypo*/}
            {/*      name="chevron-small-right"*/}
            {/*      size={24}*/}
            {/*      color={Colors.grey}*/}
            {/*    />*/}
            {/*  </View>*/}
            {/*</Pressable>*/}
            {/*<FlatList*/}
            {/*  data={DATA}*/}
            {/*  renderItem={({item}) => (*/}
            {/*    <Item title={item.title} imageSource={item.imageSource} />*/}
            {/*  )}*/}
            {/*  keyExtractor={item => item.id}*/}
            {/*  horizontal={true}*/}
            {/*  showsHorizontalScrollIndicator={false}*/}
            {/*/>*/}
            <Pressable style={styles.deliveryBox}>
              <Pressable style={styles.deliveryInnerContainer}>
                <View style={[styles.rowStyles, {width: '70%'}]}>
                  <Ionicons
                    name="location"
                    size={20}
                    color={Colors.secondary}
                  />
                  <View>
                    <Text style={styles.deliveryText}>Delivery Location</Text>
                  </View>
                </View>

                <View style={styles.rowStyles}>
                  <Pressable
                    onPress={() => navigation.navigate('CartAddresses')}>
                    <Text style={styles.changeText}>Change</Text>
                  </Pressable>
                  <Entypo
                    name="chevron-small-right"
                    size={24}
                    color={Colors.grey}
                  />
                </View>
              </Pressable>
              <Text numberOfLines={3} style={styles.addressText}>
                {addressData?.address1 +
                  ', ' +
                  addressData?.address2 +
                  ', ' +
                  addressData?.city +
                  ', ' +
                  addressData?.state}
              </Text>
            </Pressable>
            <Text style={styles.billSummary}>Bill Summary</Text>
            <View style={styles.billBox}>
              <View style={styles.billRow}>
                <Text style={styles.amountTitle}>Sub Total</Text>
                <Text style={styles.amount}>Rs. {billData.subtotal}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.amountTitle}>GST</Text>
                <Text style={styles.amount}>Rs. {billData.gst}</Text>
              </View>
              {/*<View style={styles.billRow}>*/}
              {/*  <Text style={styles.amountTitle}>Applied Cupon</Text>*/}
              {/*  <Text style={styles.amount}>(-) Rs. 35.00</Text>*/}
              {/*</View>*/}
              <View style={styles.grandTotalRow}>
                <Text style={styles.grandTotalText}>Grand Total</Text>
                <Text style={styles.grandTotal}>
                  Rs. {billData.net_payable}
                </Text>
              </View>
            </View>
          </ScrollView>
          <View
            style={[
              styles.itemRowStyles,
              {
                backgroundColor: 'white',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 10,
                borderTopWidth: 1,
                borderTopColor: '#cdc',
              },
            ]}>
            <View
              style={{
                alignItems: 'center',
                width: '35%',
                alignSelf: 'flex-start',
              }}>
              <Text style={styles.amountTitle}>Rs. {billData.net_payable}</Text>
              <Text style={[styles.amountTitle, {color: Colors.secondary}]}>
                See Price Details
              </Text>
            </View>
            <Button
              onPress={() => setIsOpen(true)}
              mode={'contained'}
              style={{width: '58%'}}
              theme={{roundness: 2}}
              labelStyle={styles.btnLabelStyles}>
              Continue
            </Button>
          </View>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
              }}
              onPress={() => setIsOpen(false)}>
              <AntDesign
                name="closecircle"
                size={20}
                color="black"
                style={{padding: 10}}
                onPress={() => setIsOpen(false)}
              />
            </Pressable>
            <Text
              style={{
                fontFamily: Font_Family.medium,
                fontSize: FONT_SIZES.eighteen,
                color: Colors.secondary,
                marginBottom: 8,
              }}>
              Choose Payment Method:-
            </Text>
            <RadioButton.Group
              onValueChange={value => setValue(value)}
              value={value}>
              <RadioButton.Item
                label="Pay Online"
                value="online"
                labelStyle={{
                  fontFamily: Font_Family.medium,
                  fontSize: FONT_SIZES.fifteen,
                }}
              />
              <RadioButton.Item
                label="Cash On Delivery"
                value="offline"
                labelStyle={{
                  fontFamily: Font_Family.medium,
                  fontSize: FONT_SIZES.fifteen,
                }}
              />
            </RadioButton.Group>
            <Button
              mode={'contained'}
              onPress={() =>
                value === 'offline' ? navigation.navigate('Payment') : ''
              }
              style={{width: '100%', marginTop: 10}}
              theme={{roundness: 2}}
              labelStyle={styles.btnLabelStyles}>
              {value === 'offline'
                ? 'Place Order'
                : `Pay Rs.${billData.net_payable} `}
            </Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
