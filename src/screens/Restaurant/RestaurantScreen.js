import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Divider, FAB, Switch, TextInput} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';

import {FONT_SIZES} from '../../utils/FontSize';
import {Font_Family} from '../../utils/Fontfamily';
import {Colors} from '../../utils/Colors';
import {ModalComponent} from '../Dashboard/HomeScreen/components';
import {AllCategories} from '../../data/AllCategories';
import {styles} from './Restaurant.styles';
import Config from '../../config';
import {Loader} from '../../components/common/Loader';
import {useGetRestaurantDetails} from '../../hooks';
import {useError} from '../../context/ErrorProvider';
import {addToCart} from '../../store/cart/cartSlice';

export const RestaurantScreen = ({navigation, route}) => {
  const {restaurantId} = route.params;
  const {restaurantDetails, loading} = useGetRestaurantDetails({restaurantId});
  const MenuList = restaurantDetails?.menu;

  const [count, setCount] = useState(0);
  const [isVegSwitchOn, setIsVegSwitchOn] = useState(false);
  const [isNonVegSwitchOn, setIsNonVegSwitchOn] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(3);
  const [dishDetails, setDishDetails] = useState(null);

  const handleToggleVegSwitch = () => {
    setIsVegSwitchOn(!isVegSwitchOn);
    setIsNonVegSwitchOn(false);
  };

  const handleToggleNonVegSwitch = () => {
    setIsNonVegSwitchOn(!isNonVegSwitchOn);
    setIsVegSwitchOn(false);
  };

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

  const dispatch = useDispatch();
  const setError = useError();
  const addToCartHandler = async ({dishId, storeId, price, quantity}) => {
    try {
      await dispatch(
        addToCart({
          dishId,
          storeId,
          price,
          quantity,
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
    } catch (e) {
      setError(e.message);
    }
  };

  const Item = ({dishes, categoryName}) => {
    const filteredDishes = dishes
      .filter(item => {
        if (isVegSwitchOn && isNonVegSwitchOn) {
          return true;
        } else if (isVegSwitchOn) {
          return item.dish_type === 'V';
        } else if (isNonVegSwitchOn) {
          return item.dish_type === 'N';
        } else {
          return dishes;
        }
      })
      .filter(item =>
        item.dish_name.toLowerCase().includes(searchText.toLowerCase()),
      );
    return (
      <View>
        <Text style={styles.categoryName}>{categoryName}</Text>
        {filteredDishes.map(item => (
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
                {count > 0 ? (
                  <View style={styles.countRow}>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        style={styles.buttonDecrement}
                        onPress={decrement}>
                        <Entypo name="minus" size={18} color={Colors.primary} />
                      </TouchableOpacity>
                      <View style={styles.numberContainer}>
                        <Text style={styles.number}>{count}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.buttonIncrement}
                        onPress={increment}>
                        <Entypo name="plus" size={18} color={Colors.primary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <Button
                    onPress={() => {
                      setCount(1);
                      addToCartHandler({
                        dishId: item.id,
                        storeId: item.partner_user,
                        price: item.dish_price,
                        quantity: 1,
                      });
                    }}
                    mode={'outlined'}
                    compact={true}
                    theme={{roundness: 1, colors: {outline: Colors.primary}}}
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
        ))}
      </View>
    );
  };

  const renderItem = ({item, index}) => (
    <Pressable key={index} style={styles.menuItem}>
      <Text
        style={{
          fontFamily:
            selected === item.id ? Font_Family.semiBold : Font_Family.regular,
          fontSize: FONT_SIZES.fifteen,
          color: selected === item.id ? Colors.primary : Colors.black,
          textTransform: 'capitalize',
        }}>
        {item?.category_name}
      </Text>
      <Text
        style={{
          fontFamily:
            selected === item.id ? Font_Family.semiBold : Font_Family.regular,
          fontSize: FONT_SIZES.fifteen,
          color: selected === item.id ? Colors.primary : Colors.black,
        }}>
        (6)
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={MenuList}
          renderItem={({item}) => (
            <Item dishes={item.dishes} categoryName={item.category_name} />
          )}
          keyExtractor={item => item.id}
          style={styles.flatListStyles}
          ListHeaderComponent={() => {
            return (
              <>
                <View style={styles.restaurantCard}>
                  <View style={styles.restaurantRowStyles}>
                    <Pressable onPress={() => navigation.goBack()}>
                      <MaterialCommunityIcons
                        name="arrow-left"
                        size={24}
                        color="black"
                      />
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
                        {restaurantDetails?.time} min ·{' '}
                        {restaurantDetails?.distance} KM ⏐{' '}
                        {restaurantDetails?.address?.address1 +
                          ' ' +
                          restaurantDetails?.address?.address2}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.restaurantCategory,
                        {textTransform: 'capitalize'},
                      ]}>
                      {MenuList &&
                        MenuList.slice(0, 3)
                          .map(item => item.category_name)
                          .join(' · ')}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.menuText}>Menu</Text>
                  <View style={{marginHorizontal: 10}}>
                    <TextInput
                      style={styles.searchBarStyles}
                      placeholder="Search here"
                      placeholderTextColor="#808080"
                      mode={'outlined'}
                      outlineStyle={{borderColor: '#cdcdcd'}}
                      theme={{roundness: 15}}
                      activeOutlineColor={Colors.primary}
                      left={
                        <TextInput.Icon icon="search1" color={Colors.primary} />
                      }
                      value={searchText}
                      onChangeText={text => setSearchText(text)}
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
              </>
            );
          }}
        />
      )}

      <FAB
        onPress={() => setVisible(true)}
        icon={() => (
          <MaterialIcons name="menu-book" size={24} color="#B8860B" />
        )}
        label={'Menu'}
        color={'#B8860B'}
        style={styles.fabStyles}
      />
      <ModalComponent
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        dishDetails={dishDetails}
      />

      <Modal
        animationType="fade"
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
              data={AllCategories}
              keyExtractor={item => String(item.id)}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};