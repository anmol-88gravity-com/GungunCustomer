import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Colors } from '../../utils/Colors';
import { styles } from './cart.styles';
import { images } from '../../utils/Images';
import { useGetAddressList } from '../../hooks';
import { useGetCartItemsData } from '../../hooks/cart/useGetCartItemsData';
import { useDispatch } from 'react-redux';
import { decreaseItemQuantity, increaseItemQuantity } from '../../store/cart/cartSlice';
import { showMessage } from 'react-native-flash-message';
import { FONT_SIZES } from '../../utils/FontSize';
import { Font_Family } from '../../utils/Fontfamily';
import { Loader } from '../../components/common/Loader';


export const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [addressData, setAddressData] = useState(null);
  const { addressList, loading } = useGetAddressList();
  const { cartItems } = useGetCartItemsData('68');
  const [cartItemsData, setCartItemsData] = useState(null);





  // console.log('cartItemsData------', cartItemsData)

  useEffect(() => {
    setCartItemsData(cartItems)
  }, [cartItems])

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


  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      imageSource: images.cuponCard,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      imageSource: images.cuponCardImg,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      imageSource: images.cuponImg,
    },
  ];

  //calculate SubTotal
  const calculateSubTotal = () => {
    let subTotal = 0;
    if (cartItemsData?.items) {
      cartItemsData.items.forEach(item => {
        const totalPrice = item.price * item.quantity;
        subTotal += totalPrice;
      });
    }
    return subTotal;
  };

  //calculate SubTotal

  const Item = ({ imageSource }) => (
    <View style={styles.cuponView}>
      <Image source={imageSource} style={styles.cuponImage} />
    </View>
  );

  const CartItem = ({ item_id, itemName, itemPrice, itemQuantity, dish_type }) => {
    const increaseQuantityhandler = async () => {
      try {
        await dispatch(increaseItemQuantity({ item_id })).unwrap();
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
      } catch (e) {
        console.log("error---", e.message)
      }
    };

    const decreaseQuantityhandler = async () => {
      try {
        await dispatch(decreaseItemQuantity({ item_id })).unwrap();
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
      } catch (e) {
        // setError(e.message);
        console.log("error---", e.message)
      }
    };
    const totalPrice = itemPrice * itemQuantity;

    return (
      <View style={[styles.itemRowStyles, { paddingVertical: 10 }]}>
        <View style={styles.itemInnerRow}>
          {dish_type == "V" ? (<MaterialCommunityIcons
            name="square-circle"
            size={18}
            color={Colors.green}
          />) : (<MaterialCommunityIcons
            name="square-circle"
            size={18}
            color={Colors.red}
          />)}
          <Text numberOfLines={3} style={[styles.itemName, { textTransform: 'capitalize' }]}>
            {itemName}
          </Text>
        </View>
        <View style={styles.itemPriceBox}>
          <Text numberOfLines={1} style={styles.itemPrice}>
            Rs {totalPrice}
          </Text>
        </View>
        <View style={styles.qtyBox}>
          <View style={styles.qtyContainer}>
            <Pressable style={{ padding: 5 }} onPress={decreaseQuantityhandler}>
              <AntDesign name="minus" size={22} color={Colors.primary} />
            </Pressable>
            <Text style={styles.qty}>{itemQuantity}</Text>
            <Pressable style={{ padding: 5 }} onPress={increaseQuantityhandler} >
              <Ionicons name="add" size={20} color={Colors.primary} />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  const handleAddMoreItems = () => {
    if (cartItemsData?.items) {
      cartItemsData.items.forEach(item => {
        navigation.navigate('RestaurantScreen', { restaurantId: item.store_id });
      });
    }
  };



  return (
    <>
      {loading ? (<Loader />) : (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
          <Text style={styles.heading}>Items Added</Text>
          <View style={styles.cardContainer}>
            <View>
              {cartItemsData?.items && cartItemsData?.items?.map((item, index) => (
                <CartItem
                  key={index}
                  item_id={item?.item_id}
                  itemName={item?.dish_name}
                  itemPrice={item?.price}
                  itemQuantity={item?.quantity}
                  dish_type={item?.dish_type}
                />
              ))}
            </View>
            <Pressable style={styles.addMoreRow} onPress={handleAddMoreItems}>
              <View style={styles.rowStyles}>
                <MaterialIcons name="add-box" size={24} color="black" />
                <Text style={styles.addMoreItemsText}>Add more Itemsxxx</Text>
              </View>
              <Entypo name="chevron-small-right" size={24} color="black" />
            </Pressable>

          </View>
          <Pressable style={styles.shadowCard}>
            <View style={styles.rowStyles}>
              <MaterialCommunityIcons
                name="brightness-percent"
                size={24}
                color={Colors.secondary}
              />
              <View>
                <Text style={styles.couponHeading}>
                  {/*Apply Coupon*/}
                  Coupon Applied
                </Text>
                <Text style={styles.couponText}>EXTRA200</Text>
              </View>
            </View>
            <View style={styles.rowStyles}>
              <Text style={styles.viewAllText}>View All</Text>
              <Entypo name="chevron-small-right" size={24} color={Colors.grey} />
            </View>
          </Pressable>
          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <Item title={item.title} imageSource={item.imageSource} />
            )}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <Pressable style={styles.deliveryBox}>
            <Pressable style={styles.deliveryInnerContainer}>
              <View style={[styles.rowStyles, { width: '70%' }]}>
                <Ionicons name="location" size={20} color={Colors.secondary} />
                <View>
                  <Text style={styles.deliveryText}>Delivery Location</Text>
                </View>
              </View>

              <View style={styles.rowStyles}>
                <Pressable onPress={() => navigation.navigate('CartAddresses')}>
                  <Text style={styles.changeText}>Change</Text>
                </Pressable>
                <Entypo name="chevron-small-right" size={24} color={Colors.grey} />
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
              <Text style={styles.amount}>Rs. {calculateSubTotal().toFixed(2)}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.amountTitle}>GST</Text>
              <Text style={styles.amount}>Rs. 115.50</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.amountTitle}>Applied Cupon</Text>
              <Text style={styles.amount}>(-) Rs. 35.00</Text>
            </View>
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalText}>Grand Total</Text>
              <Text style={styles.grandTotal}>Rs. 560.50</Text>
            </View>
          </View>
          <Button
            onPress={() => navigation.navigate('Payment')}
            mode={'contained'}
            theme={{ roundness: 0 }}
            labelStyle={styles.btnLabelStyles}
            style={{ marginVertical: 20, borderRadius: 15 }}
            contentStyle={{ height: 50 }}>
            Proceed to payment
          </Button>

        </ScrollView>

      )}
    </>


  );
};
