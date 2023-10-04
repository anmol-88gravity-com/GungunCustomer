import React from 'react';
import {View, Image, Text, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../../../../utils/Colors';
import {Font_Family} from '../../../../utils/Fontfamily';
import {FONT_SIZES} from '../../../../utils/FontSize';

export const DishCard = m => {
  return (
    <Pressable
      style={{
        backgroundColor: 'white',
        borderRadius: 20,
        marginLeft: m.item === 1 ? 2 : 0,
        padding: 10,
        marginVertical: 10,
        marginRight: 15,
        width: 300,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '40%',
            }}>
            <Image
              source={require('../../../../assets/data/food.jpeg')}
              style={{
                width: 100,
                height: 100,
                alignSelf: 'center',
                marginVertical: 5,
                borderWidth: 2,
                borderColor: Colors.secondary,
                borderRadius: 10,
              }}
            />
          </View>

          <View style={{width: '60%'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(0,92,121,0.2)',
                padding: 5,
                width: 90,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: Colors.primary,
              }}>
              <Image
                source={require('../../../../assets/dashboardImages/medal.png')}
                style={{width: 15, height: 15}}
              />
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: Font_Family.regular,
                  color: Colors.primary,
                }}>
                Bestseller
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <MaterialCommunityIcons
                name="square-circle"
                size={18}
                color={Colors.green}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: Font_Family.bold,
                  color: Colors.black,
                }}>
                {'  '}Masala Dosa
              </Text>
            </View>
            <Text
              style={{
                fontSize: 15,
                fontFamily: Font_Family.regular,
                color: Colors.black,
                marginBottom: 5,
              }}>
              Rs. 129
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontFamily: Font_Family.bold,
                fontSize: FONT_SIZES.thirteen,
              }}>
              ⭐ 3.4{' '}
              <Text style={{color: '#808080', fontFamily: Font_Family.regular}}>
                (30K)
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
