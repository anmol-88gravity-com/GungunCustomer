import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './OrderDetailScreen.styles';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Colors} from '../../../utils/Colors';
import {Button} from 'react-native-paper';

export const OrderDetailScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: '2%'}}>
          <Text style={styles.itemTitle}>Cakes 24*7.Com</Text>
          <Text style={[styles.itemSubTitle, {marginTop: 5}]}>
            Shop 2, Plot 373, 40 Feet Road, Satguru farm, Opposite Maruti Gate
            1, Phase 4, Sector 18, Near Sector 22, Gurgaon
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '3%',
            }}>
            <TouchableOpacity style={styles.invoiceButton}>
              <MaterialCommunityIcons
                name="newspaper-variant-multiple"
                size={20}
                color="#dea812"
              />
              <Text
                style={[
                  styles.itemSubTitle,
                  {alignSelf: 'center', marginLeft: 5},
                ]}>
                Download invoice
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.invoiceButton}>
              <MaterialCommunityIcons
                name="newspaper-variant-multiple"
                size={20}
                color="#dea812"
              />
              <Text
                style={[
                  styles.itemSubTitle,
                  {alignSelf: 'center', marginLeft: 5},
                ]}>
                Download Summary
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: '#ccc',
              height: 1,
              width: '100%',
              marginTop: 10,
            }}
          />
          <Text style={[styles.itemSubTitle, {marginTop: 10}]}>
            This order was delivered
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '5%',
              justifyContent: 'space-between',
            }}>
            <Text style={[styles.itemSubTitle, {fontWeight: 600}]}>
              Your Order
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#dea812',
                padding: 8,
                borderRadius: 20,
              }}>
              <Text style={styles.favouriteText}>REMOVE FROM FAVOURITES</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: '#ccc',
              height: 1,
              width: '100%',
              marginTop: 10,
            }}
          />
          <View style={{marginTop: '5%'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.itemSubTitle, {fontWeight: 600}]}>
                Item Total
              </Text>
              <Text style={[styles.favouriteText, {color: '#000000'}]}>
                ₹330.00
              </Text>
            </View>
            <View style={{marginTop: '5%', flexDirection: 'row'}}>
              <MaterialCommunityIcons
                name="square-circle"
                color="#47BA34"
                size={15}
              />
              <Text style={[styles.itemTotalTitle, {marginLeft: 10}]}>
                Chocolate Truffle Cake
              </Text>
            </View>
            <Text style={[styles.itemSubTitle, {marginVertical: '2%'}]}>
              Choose your preference: Eggless; Pick size of {'\n'} cake: 500
              grams
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    borderColor: 'green',
                    borderWidth: 1,
                    height: 20,
                    width: 20,
                    borderRadius: 2,
                  }}>
                  <Text style={{textAlign: 'center'}}>1</Text>
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    marginLeft: 5,
                    alignSelf: 'center',
                  }}>
                  X
                </Text>
                <Text
                  style={[
                    styles.favouriteText,
                    {
                      color: '#000000',
                      textAlign: 'center',
                      marginLeft: 5,
                      alignSelf: 'center',
                    },
                  ]}>
                  ₹330.00
                </Text>
              </View>
              <Text style={[styles.favouriteText, {color: '#000000'}]}>
                ₹330.00
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#ccc',
                height: 1,
                width: '100%',
                marginTop: 10,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '5%',
              }}>
              <Text style={[styles.itemSubTitle, {fontWeight: 600}]}>
                Taxes
              </Text>
              <Text style={[styles.favouriteText, {color: 'black'}]}>
                ₹330.00
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '2%',
              }}>
              <Text style={[styles.itemSubTitle, {fontWeight: 600}]}>
                Delivery Charge(Free delievery offer)
              </Text>
              <Text style={[styles.favouriteText, {color: 'black'}]}>
                ₹330.00 FREE
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#ccc',
                height: 1,
                width: '100%',
                marginTop: 10,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '5%',
              }}>
              <Text style={[styles.itemSubTitle, {fontWeight: 600}]}>
                Grand Total
              </Text>
              <Text style={[styles.grandFavouriteText, {color: '#000000'}]}>
                ₹330.00
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#ccc',
                height: 1,
                width: '100%',
                marginTop: 10,
              }}
            />

            <TouchableOpacity style={styles.btnTotalSaving}>
              <Text
                style={[
                  styles.itemSubTitle,
                  {fontWeight: 600, color: '#005C79', alignSelf: 'center'},
                ]}>
                Your total savings
              </Text>
              <Text style={[styles.grandFavouriteText, {color: '#005C79'}]}>
                ₹330
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                marginTop: '5%',
                justifyContent: 'space-between',
              }}>
              <Text style={[styles.itemSubTitle, {fontWeight: 600}]}>
                Order Details
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#ccc',
                height: 1,
                width: '100%',
                marginTop: 10,
              }}
            />

            <View style={{marginTop: '5%'}}>
              <Text style={[styles.itemSubTitle, {color: '#b7b7b7'}]}>
                Order Number
              </Text>
              <Text
                style={[styles.itemSubTitle, {color: '#000000', marginTop: 5}]}>
                1234567
              </Text>
            </View>

            <View style={{marginTop: '5%'}}>
              <Text style={[styles.itemSubTitle, {color: '#b7b7b7'}]}>
                Payment
              </Text>
              <Text
                style={[styles.itemSubTitle, {color: '#000000', marginTop: 5}]}>
                Paid: Using Upi
              </Text>
            </View>

            <View style={{marginTop: '5%'}}>
              <Text style={[styles.itemSubTitle, {color: '#b7b7b7'}]}>
                Date
              </Text>
              <Text
                style={[styles.itemSubTitle, {color: '#000000', marginTop: 5}]}>
                Jaunary 19, 2023 at 11:15 PM
              </Text>
            </View>

            <View style={{marginTop: '5%'}}>
              <Text style={[styles.itemSubTitle, {color: '#b7b7b7'}]}>
                Phone number
              </Text>
              <Text
                style={[styles.itemSubTitle, {color: '#000000', marginTop: 5}]}>
                12345678XXX
              </Text>
            </View>

            <View style={{marginTop: '5%'}}>
              <Text style={[styles.itemSubTitle, {color: '#b7b7b7'}]}>
                Deliver to
              </Text>
              <Text
                style={[styles.itemSubTitle, {color: '#000000', marginTop: 5}]}>
                Shop 2, Plot 373, 40 Feet Road, Satguru farm, Opposite Maruti
                Gate 1, Phase 4, Sector 18, Near Sector 22, Gurgaon
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#ccc',
                height: 1,
                width: '100%',
                marginTop: '10%',
              }}
            />
            <Text style={styles.customerText}>
              Call Cakes 24*7.Com(+ 91 0987654321)
            </Text>
            <View
              style={{
                backgroundColor: '#ccc',
                height: 1,
                width: '100%',
                marginTop: '5%',
              }}
            />
          </View>

          <Button
            buttonColor={Colors.secondary}
            theme={{roundness: 0}}
            style={styles.buttonStyles}
            contentStyle={{height: 50}}
            labelStyle={styles.buttonlabel}
            mode={'contained'}>
            Repeat Order
          </Button>
        </View>
        <View style={{marginBottom: 30}} />
      </ScrollView>
    </View>
  );
};
