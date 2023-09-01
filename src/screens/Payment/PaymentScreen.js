import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {Button} from 'react-native-paper';
import * as Progress from 'react-native-progress';

import {styles} from './PaymentScreen.styles';
import {images} from '../../utils/Images';
import {Colors} from '../../utils/Colors';
import {Font_Family} from '../../utils/Fontfamily';
import {FONT_SIZES} from '../../utils/FontSize';

export const PaymentScreen = ({navigation}) => {
  const [progress, setProgress] = useState(0);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const handleProgressComplete = () => {
    setPaymentSuccessful(true);
    navigation.navigate('OrderTracking');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 1) {
          clearInterval(timer);
          handleProgressComplete();
          return 1;
        }
        return prevProgress + 0.1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.successImg}>
        <Image
          source={images.success}
          style={{height: '100%', width: '100%'}}
        />
      </View>
      {/*{paymentSuccessful && (*/}
      <Text style={styles.paymentText}>Payment Successful</Text>
      {/*)}*/}
      <Text style={styles.orderIdText}>
        Your Order of OrderId: GUNGUN0279802134 has been placed.
      </Text>

      {!paymentSuccessful && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 25,
            marginHorizontal: 10,
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: 10,
            left: 5,
            right: 5,
          }}>
          <View>
            <Text
              style={{
                fontFamily: Font_Family.medium,
                fontSize: FONT_SIZES.thirteen,
                color: Colors.black,
              }}>
              You can cancel your order in 60 seconds.
            </Text>
            <View style={{marginTop: 15}}>
              <Progress.Bar
                progress={progress}
                width={230}
                animated={true}
                color={Colors.primary}
                height={5}
                onComplete={handleProgressComplete}
              />
            </View>
          </View>
          <Button
            buttonColor={Colors.primary}
            theme={{roundness: 0}}
            style={styles.buttonStyles}
            contentStyle={{height: 50}}
            labelStyle={styles.buttonlabel}
            mode={'contained'}>
            Cancel
          </Button>
        </View>
      )}
    </View>
  );
};
