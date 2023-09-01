import React from 'react';
import {View, Text, Pressable, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Colors} from '../../utils/Colors';
import {styles} from './cart.styles';

export const CartScreen = ({navigation}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text style={styles.heading}>Items Added</Text>
      <View style={styles.cardContainer}>
        <View style={[styles.itemRowStyles, {paddingVertical: 10}]}>
          <View style={styles.itemInnerRow}>
            <MaterialCommunityIcons
              name="square-circle"
              size={18}
              color={Colors.green}
            />
            <Text numberOfLines={3} style={styles.itemName}>
              Mung Dal Halwa
            </Text>
          </View>
          <View style={styles.itemPriceBox}>
            <Text numberOfLines={1} style={styles.itemPrice}>
              Rs 220
            </Text>
          </View>
          <View style={styles.qtyBox}>
            <View style={styles.qtyContainer}>
              <Pressable style={{padding: 5}}>
                <AntDesign name="minus" size={22} color={Colors.primary} />
              </Pressable>
              <Text style={styles.qty}>1</Text>
              <Pressable style={{padding: 5}}>
                <Ionicons name="add" size={20} color={Colors.primary} />
              </Pressable>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.itemRowStyles,
            {
              marginTop: 20,
            },
          ]}>
          <View style={styles.itemInnerRow}>
            <MaterialCommunityIcons
              name="square-circle"
              size={18}
              color={Colors.green}
            />
            <Text numberOfLines={3} style={styles.itemName}>
              Mung Dal Halwa
            </Text>
          </View>
          <View style={styles.itemPriceBox}>
            <Text numberOfLines={1} style={styles.itemPrice}>
              Rs 220
            </Text>
          </View>
          <View style={styles.qtyBox}>
            <View style={styles.qtyContainer}>
              <Pressable style={{padding: 5}}>
                <AntDesign name="minus" size={22} color={Colors.primary} />
              </Pressable>
              <Text style={styles.qty}>1</Text>
              <Pressable style={{padding: 5}}>
                <Ionicons name="add" size={20} color={Colors.primary} />
              </Pressable>
            </View>
          </View>
        </View>
        <Pressable style={styles.addMoreRow}>
          <View style={styles.rowStyles}>
            <MaterialIcons name="add-box" size={24} color="black" />
            <Text style={styles.addMoreItemsText}>Add more Items</Text>
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
      <Pressable style={styles.deliveryBox}>
        <Pressable style={styles.deliveryInnerContainer}>
          <View style={[styles.rowStyles, {width: '70%'}]}>
            <Ionicons name="location" size={20} color={Colors.secondary} />
            <View>
              <Text style={styles.deliveryText}>Delivery Location</Text>
            </View>
          </View>

          <View style={styles.rowStyles}>
            <Text style={styles.changeText}>Change</Text>
            <Entypo name="chevron-small-right" size={24} color={Colors.grey} />
          </View>
        </Pressable>
        <Text numberOfLines={3} style={styles.addressText}>
          511, Udyog Vihar Phase-5, Gurugram, Haryana 122016
        </Text>
      </Pressable>
      <Text style={styles.billSummary}>Bill Summary</Text>
      <View style={styles.billBox}>
        <View style={styles.billRow}>
          <Text style={styles.amountTitle}>Sub Total</Text>
          <Text style={styles.amount}>Rs. 440.00</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.amountTitle}>GST</Text>
          <Text style={styles.amount}>Rs. 115.50</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.amountTitle}>Delivery Partner fee</Text>
          <Text style={styles.amount}>Rs. 40.00</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.amountTitle}>Gungun Points</Text>
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
        theme={{roundness: 0}}
        labelStyle={styles.btnLabelStyles}
        style={{marginVertical: 20, borderRadius: 15}}
        contentStyle={{height: 50}}>
        Proceed to payment
      </Button>
    </ScrollView>
  );
};
