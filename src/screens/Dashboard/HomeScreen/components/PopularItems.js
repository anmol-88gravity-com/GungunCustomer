import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {ModalComponent} from './ModalComponent';
import {styles} from '../HomeScreen.styles';
import Config from '../../../../config';
import {addToCart, createCart} from '../../../../store/cart/cartSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useError} from '../../../../context/ErrorProvider';
import {load} from '../../../../utils/storage';
import {showMessage} from 'react-native-flash-message';
import {Colors} from '../../../../utils/Colors';
import {FONT_SIZES} from '../../../../utils/FontSize';
import {Font_Family} from '../../../../utils/Fontfamily';

export const PopularItems = ({popularItems, source}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataAllPopularItems, setDataAllPopularItems] = useState([]);
  const {cartList} = useSelector(state => state.cart);
  const [cartId, setCartId] = useState(null);
  const [foodId, setFoodId] = useState(null);
  const [popularitemDetails, setPopularitemDetails] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);

  const dispatch = useDispatch();
  const setError = useError();

  useEffect(() => {
    if (popularItems && popularItems.length > 0) {
      setDataAllPopularItems(popularItems);
    }
  }, [popularItems]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.popularitems}
        onPress={() => {
          setPopularitemDetails(item);
          setIsModalVisible(true);
        }}>
        <View style={styles.imgView}>
          <Image
            source={{uri: Config.API_URL + item?.dish_image}}
            style={styles.popularImg}
          />
        </View>
        <Text style={styles.Itemtitle}>{item?.category_name}</Text>
        <Text style={styles.subItemtitle}>{item?.dish_name}</Text>
        <Text style={styles.pricetitle}>₹ {item?.dish_price}</Text>
      </TouchableOpacity>
    );
  };

  const checkHandler = async ({
    dishItemId,
    storeId,
    price,
    quantity,
    categoryItemName,
  }) => {
    const id = await load(Config.CART_ID);
    if (id) {
      setCartId(id);
      await addToCartHandler({
        dishItemId,
        storeId,
        price,
        quantity,
        categoryItemName,
      });
    } else {
      await createAndAddToCartHandler({
        dishItemId,
        storeId,
        price,
        quantity,
        categoryItemName,
      });
    }
  };
  const createAndAddToCartHandler = async ({
    dishItemId,
    storeId,
    price,
    quantity,
    categoryItemName,
  }) => {
    setFoodId(dishItemId);
    try {
      const res = await dispatch(createCart()).unwrap();
      if (res) {
        setCartId(res);
        console.log('res', res);
        try {
          await dispatch(
            addToCart({
              dishItemId,
              storeId,
              price,
              quantity,
              cart: res,
              categoryItemName,
            }),
          ).unwrap();
          showMessage({
            message: 'Add to Cart Successfully.',
            type: 'default',
            backgroundColor: Colors.secondary,
            color: Colors.white,
            textStyle: {
              fontSize: FONT_SIZES.fifteen,
              fontFamily: Font_Family.medium,
            },
          });
          setIsModalVisible(false);
        } catch (e) {
          setError(e.message);
        }
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const addToCartHandler = useCallback(
    async ({dishItemId, storeId, price, quantity, categoryItemName}) => {
      console.log('My Cart Id =====> ', cartId);
      if (cartList?.length > 0 && cartList[0].store_id !== storeId) {
        return;
      }
      setFoodId(dishItemId);
      const id = await load(Config.CART_ID);
      if (id) {
        try {
          await dispatch(
            addToCart({
              dishItemId,
              storeId,
              price,
              quantity,
              cart: id,
              categoryItemName,
            }),
          ).unwrap();
          showMessage({
            message: 'Add to Cart Successfully.',
            type: 'default',
            backgroundColor: Colors.secondary,
            color: Colors.white,
            textStyle: {
              fontSize: FONT_SIZES.fifteen,
              fontFamily: Font_Family.medium,
            },
          });
          setIsModalVisible(false);
        } catch (e) {
          setError(e.message);
        }
      }
    },
    [cartId, cartList, dispatch, setError],
  );

  return (
    <View>
      <ModalComponent
        popularitemDetails={popularitemDetails}
        isVisible={isModalVisible}
        onPressHandler={checkHandler}
        onClose={() => setIsModalVisible(false)}
      />
      <FlatList
        data={dataAllPopularItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
