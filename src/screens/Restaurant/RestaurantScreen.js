import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Divider, Switch, TextInput} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';

import {FONT_SIZES} from '../../utils/FontSize';
import {Font_Family} from '../../utils/Fontfamily';
import {Colors} from '../../utils/Colors';
import {ModalComponent} from '../Dashboard/HomeScreen/components';
import {styles} from './Restaurant.styles';
import Config from '../../config';
import {Loader} from '../../components/common/Loader';
import {useGetRestaurantDetails} from '../../hooks';
import {useError} from '../../context/ErrorProvider';
import {
  createCart,
  decreaseItemQuantity,
  increaseItemQuantity,
  addToCart,
} from '../../store/cart/cartSlice';
import {ReplaceCartModel} from '../../components/common/ReplaceCartModel';
import {load} from '../../utils/storage';
import {useGetCartItemsData} from '../../hooks/cart/useGetCartItemsData';

export const RestaurantScreen = ({navigation, route}) => {
  const {restaurantId, dishId, categoryName} = route.params;
  const {cartList} = useSelector(state => state.cart);
  const {restaurantDetails, loading} = useGetRestaurantDetails({restaurantId});
  const {cartItems, loading: isLoading} = useGetCartItemsData();

  const dispatch = useDispatch();
  const setError = useError();

  const [isVegSwitchOn, setIsVegSwitchOn] = useState(false);
  const [isNonVegSwitchOn, setIsNonVegSwitchOn] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('');
  const [dishDetails, setDishDetails] = useState(null);
  const [cartModel, setCartModel] = useState(false);
  const [cartId, setCartId] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  const [foodId, setFoodId] = useState(null);
  const [menuList, setMenuList] = useState([]);
  const [updatedMenuList, setUpdatedMenuList] = useState([]);
  const [qtyLoader, setQtyLoader] = useState(false);
  const [selectDishQty, setSelectDishQty] = useState(null);
  const [details, setDetails] = useState({
    dishItemId: '',
    storeId: '',
    price: '',
    quantity: '',
    categoryItemName: '',
  });

  const sectionListRef = useRef(null);

  const onPressHandler = index => {
    sectionListRef.current.scrollToLocation({
      sectionIndex: index,
      viewPosition: 0,
      itemIndex: 0,
    });
  };

  useEffect(() => {
    if (
      restaurantDetails?.menu !== undefined &&
      restaurantDetails?.menu?.length > 0
    ) {
      const newData = restaurantDetails?.menu?.map(item => {
        return {title: item.category_name, data: item.dishes};
      });
      const x = newData.filter(m => m.data.length > 0);
      setMenuList(x);
      setUpdatedMenuList(x);
      if (dishId !== null && categoryName !== null) {
        const t = x.findIndex(b => b.title === categoryName);
        if (t > -1) {
          const m = x[t].data.findIndex(n => n.id === dishId);
          if (m > -1) {
            const timer = setTimeout(() => {
              sectionListRef.current.scrollToLocation({
                sectionIndex: t,
                viewPosition: 0,
                itemIndex: m,
              });
            }, 1000);
            return () => clearTimeout(timer);
          }
        }
      }
    }
  }, [categoryName, dishId, restaurantDetails]);

  useEffect(() => {
    if (isVegSwitchOn === false && isNonVegSwitchOn === false) {
      setUpdatedMenuList(menuList);
    }
  }, [isNonVegSwitchOn, isVegSwitchOn, menuList]);

  const handleToggleVegSwitch = useCallback(() => {
    setIsVegSwitchOn(!isVegSwitchOn);
    setIsNonVegSwitchOn(false);

    setUpdatedMenuList(() => {
      const arr = [...menuList];
      const filteredVeg = arr?.map(i => {
        return {
          title: i.title,
          data: i.data.filter(v => v.dish_type === 'V'),
        };
      });
      return filteredVeg.filter(m => m.data.length > 0);
    });
  }, [isVegSwitchOn, menuList]);

  const handleToggleNonVegSwitch = useCallback(() => {
    setIsNonVegSwitchOn(!isNonVegSwitchOn);
    setIsVegSwitchOn(false);

    setUpdatedMenuList(() => {
      const arr = [...menuList];
      const filteredNonVeg = arr?.map(i => {
        return {
          title: i.title,
          data: i.data.filter(v => v.dish_type === 'N'),
        };
      });
      return filteredNonVeg.filter(m => m.data.length > 0);
    });
  }, [isNonVegSwitchOn, menuList]);

  const increment = useCallback(
    async (itemId, itemCategoryName) => {
      setSelectDishQty(itemId);
      setQtyLoader(true);
      let cartItemId;
      const arr = [...cartItems];
      const i = arr.findIndex(j => j.dish_id === itemId);
      if (i > -1) {
        cartItemId = arr[i].item_id;
      }
      if (cartItemId !== undefined) {
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
          setIsModalVisible(false);
          setQtyLoader(false);
        } catch (e) {
          setError(e.message);
        }
      }
      setQtyLoader(false);
    },
    [cartItems, dispatch, setError],
  );

  const decrement = useCallback(
    async (itemId, itemCategoryName) => {
      setSelectDishQty(itemId);
      setQtyLoader(true);
      let cartItemId;
      const arr = [...cartItems];
      const i = arr.findIndex(j => j.dish_id === itemId);
      if (i > -1) {
        cartItemId = arr[i].item_id;
      }
      if (cartItemId !== undefined) {
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
          setIsModalVisible(false);
          setQtyLoader(false);
        } catch (e) {
          setError(e.message);
          console.log('1', e.message);
        }
      }
      setQtyLoader(false);
    },
    [cartItems, dispatch, setError],
  );

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
    setCartLoading(true);
    setFoodId(dishItemId);
    try {
      const res = await dispatch(createCart()).unwrap();
      if (res) {
        setCartId(res);
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
          setCartLoading(false);
          setIsModalVisible(false);
        } catch (e) {
          setError(e.message);
          console.log('2', e.message);
        }
        setCartLoading(false);
      }
    } catch (e) {
      setError(e.message);
      console.log('3', e.message);
    }
  };

  const addToCartHandler = useCallback(
    async ({dishItemId, storeId, price, quantity, categoryItemName}) => {
      console.log('My Cart Id =====> ', cartId);
      if (cartList?.length > 0 && cartList[0].store_id !== storeId) {
        setCartModel(true);
        setDetails({
          dishItemId: dishItemId,
          storeId: storeId,
          price: price,
          quantity: quantity,
          categoryItemName: categoryItemName,
        });
        return;
      }
      setCartLoading(true);
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
          setCartLoading(false);
          setIsModalVisible(false);
        } catch (e) {
          setError(e.message);
          console.log('5', e.message);
        }
        setCartLoading(false);
      }
    },
    [cartId, cartList, dispatch, setError],
  );

  const updateCartHandler = async () => {
    try {
      const res = false;
      // const res = await dispatch(deleteCart()).unwrap(); // need new api ko delete whole cart
      if (res) {
        await createAndAddToCartHandler({
          dishItemId: details.dishItemId,
          storeId: details.storeId,
          price: details.price,
          quantity: details.quantity,
          categoryItemName: details.categoryItemName,
        });
      }
    } catch (e) {
      setError(e.message);
      console.log('6', e.message);
    }
  };

  const searchFilterFunction = useCallback(
    text => {
      if (text) {
        const newData = menuList.map(i => {
          return {
            title: i.title,
            data: i.data.filter(v =>
              v.dish_name.toLowerCase().includes(text.toLowerCase()),
            ),
          };
        });

        const filteredData = newData.filter(m => m.data.length > 0);

        setUpdatedMenuList(filteredData);
        setSearchText(text);
      } else {
        setUpdatedMenuList(menuList);
        setSearchText(text);
      }
    },
    [menuList],
  );

  const Item = ({item}) => {
    return (
      <View style={styles.foodCard} key={item.id}>
        <View style={styles.cardInnerContainer}>
          <View style={styles.foodImage}>
            <Image
              source={{uri: Config.API_URL + item?.dish_image}}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: Colors.secondary,
              }}
            />
            {item.added_to_cart > 0 ? (
              <View style={styles.countRow}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.buttonDecrement}
                    disabled={qtyLoader}
                    onPress={() => decrement(item.id, item.category_name)}>
                    <Entypo name="minus" size={18} color={Colors.primary} />
                  </TouchableOpacity>
                  <View style={styles.numberContainer}>
                    {qtyLoader && selectDishQty === item.id ? (
                      <ActivityIndicator size={16} color={Colors.primary} />
                    ) : (
                      <Text style={styles.number}>{item.quantity_in_cart}</Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.buttonIncrement}
                    disabled={qtyLoader}
                    onPress={() => increment(item.id, item.category_name)}>
                    <Entypo name="plus" size={18} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <Button
                onPress={() =>
                  checkHandler({
                    dishItemId: item.id,
                    storeId: item.partner_user,
                    price: item.dish_price,
                    quantity: 1,
                    categoryItemName: item.category_name,
                  })
                }
                disabled={foodId === item.id && cartLoading}
                loading={foodId === item.id && cartLoading}
                mode={'outlined'}
                compact={true}
                theme={{
                  roundness: 1,
                  colors: {outline: Colors.primary},
                }}
                style={{
                  position: 'absolute',
                  bottom: -15,
                  width: '70%',
                  alignSelf: 'center',
                }}
                contentStyle={{
                  backgroundColor: '#fff',
                }}
                activeOutlineColor={Colors.primary}
                labelStyle={{
                  fontFamily: Font_Family.semiBold,
                  fontSize: FONT_SIZES.fifteen,
                  color: Colors.primary,
                }}>
                ADD
              </Button>
            )}
          </View>
          <View style={styles.foodRowStyles}>
            {item?.dish_type === 'V' ? (
              <MaterialCommunityIcons
                name="square-circle"
                size={20}
                color={Colors.green}
              />
            ) : (
              <MaterialCommunityIcons
                name="square-circle"
                size={20}
                color={Colors.red}
              />
            )}
            <Text style={styles.foodName} numberOfLines={3}>
              {item.dish_name}
            </Text>
            <Text style={styles.foodPrice}>₹ {item.dish_price}</Text>
            <Button
              onPress={() => {
                setDishDetails(item);
                setIsModalVisible(true);
              }}
              theme={{colors: {outline: Colors.secondary}}}
              mode={'outlined'}
              compact={true}
              style={{
                alignSelf: 'flex-end',
              }}
              labelStyle={{
                fontFamily: Font_Family.medium,
                fontSize: FONT_SIZES.tweleve,
                color: Colors.secondary,
                textDecorationLine: 'underline',
              }}>
              See More
            </Button>
          </View>
        </View>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <Pressable
        key={index}
        style={styles.menuItem}
        onPress={() => {
          setSelected(item.title);
          onPressHandler(index);
        }}>
        <Text
          style={{
            fontFamily:
              selected === item.title
                ? Font_Family.semiBold
                : Font_Family.regular,
            fontSize: FONT_SIZES.fifteen,
            color: selected === item.title ? Colors.primary : Colors.black,
            textTransform: 'capitalize',
          }}>
          {item?.title}
        </Text>
        <Text
          style={{
            fontFamily:
              selected === item.title
                ? Font_Family.semiBold
                : Font_Family.regular,
            fontSize: FONT_SIZES.fifteen,
            color: selected === item.title ? Colors.primary : Colors.black,
          }}>
          ({item.data.length})
        </Text>
      </Pressable>
    );
  };
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <View style={styles.restaurantCard}>
        <View style={styles.restaurantRowStyles}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
          </Pressable>
          <View style={styles.restaurantIcons}>
            <Ionicons name="heart-outline" size={24} color="black" />
            <Ionicons name="share-social" size={24} color="black" />
          </View>
        </View>
        <View style={styles.innerCard}>
          <Text style={styles.restaurantName}>
            {restaurantDetails?.store_name}
          </Text>
          <View style={styles.rowStyles}>
            <Image
              source={require('../../assets/icons/timer.png')}
              style={styles.timerStyles}
            />
            <Text style={styles.distanceText}>
              {' '}
              {restaurantDetails?.time} min · {restaurantDetails?.distance} KM ⏐{' '}
              {restaurantDetails?.address?.address1 +
                ' ' +
                restaurantDetails?.address?.address2}
            </Text>
          </View>
          <Text
            style={[styles.restaurantCategory, {textTransform: 'capitalize'}]}>
            {menuList &&
              menuList
                .slice(0, 3)
                .map(item => item.title)
                .join(' · ')}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.menuText}>Menu</Text>
        <View style={{marginHorizontal: 10, marginBottom: 12}}>
          <TextInput
            style={styles.searchBarStyles}
            placeholder="Search here"
            placeholderTextColor="#808080"
            mode={'outlined'}
            outlineStyle={{borderColor: '#cdcdcd'}}
            theme={{roundness: 15}}
            activeOutlineColor={Colors.primary}
            left={<TextInput.Icon icon="search1" color={Colors.primary} />}
            value={searchText}
            onChangeText={text => searchFilterFunction(text)}
          />
        </View>
        <View style={styles.filterRow}>
          <View style={styles.vegRow}>
            <Text style={styles.vegText}>Veg Only</Text>
            <Switch
              value={isVegSwitchOn}
              onValueChange={handleToggleVegSwitch}
              color={'#296c07'}
            />
          </View>
          <View style={styles.nonVegRow}>
            <Text style={styles.nonVegText}>Non-Veg Only</Text>
            <Switch
              value={isNonVegSwitchOn}
              onValueChange={handleToggleNonVegSwitch}
              color={'#a90404'}
            />
          </View>
        </View>
      </View>
      {loading ? (
        <Loader />
      ) : (
        updatedMenuList.length > 0 && (
          <SectionList
            sections={updatedMenuList}
            ref={sectionListRef}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => {
              return <Item item={item} />;
            }}
            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.categoryName}>{title}</Text>
            )}
            style={styles.flatListStyles}
          />
        )
      )}
      <Button
        mode={'contained'}
        icon={() => (
          <MaterialIcons name="menu-book" size={24} color="#B8860B" />
        )}
        labelStyle={{color: '#B8860B'}}
        contentStyle={{height: 50}}
        onPress={() => setVisible(true)}
        style={styles.fabStyles}>
        Menu
      </Button>
      <ModalComponent
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        dishDetails={dishDetails}
        onPressHandler={checkHandler}
        cartLoading={cartLoading}
        increment={increment}
        decrement={decrement}
        qtyLoader={qtyLoader}
        selectDishQty={selectDishQty}
      />
      <Modal
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <Pressable
          style={styles.centeredView}
          onPress={() => {
            setVisible(!visible);
          }}>
          <View style={styles.modalView}>
            <View style={styles.menuInnerModel}>
              <Text style={styles.modelHeading}>Menu</Text>
              <Pressable
                style={{paddingHorizontal: 5}}
                onPress={() => {
                  setVisible(!visible);
                }}>
                <Ionicons name={'close'} size={24} color={Colors.black} />
              </Pressable>
            </View>
            <Divider />
            <FlatList
              data={updatedMenuList}
              keyExtractor={index => index + Math.random()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Pressable>
      </Modal>
      <ReplaceCartModel
        onClose={() => setCartModel(false)}
        visible={cartModel}
        updateCart={() => updateCartHandler()}
        cartLoading={cartLoading}
      />
    </SafeAreaView>
  );
};
