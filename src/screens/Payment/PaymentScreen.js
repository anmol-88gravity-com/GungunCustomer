import React, {useEffect, useState} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {Button} from 'react-native-paper';
import * as Progress from 'react-native-progress';

import {styles} from './PaymentScreen.styles';
import {images} from '../../utils/Images';
import {Colors} from '../../utils/Colors';
import {Font_Family} from '../../utils/Fontfamily';
import {FONT_SIZES} from '../../utils/FontSize';
import {SafeAreaView} from 'react-native-safe-area-context';

export const PaymentScreen = ({navigation}) => {
  const [progress, setProgress] = useState(0);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const handleProgressComplete = () => {
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
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      {progress < 1 ? (
        <>
          <View
            style={{
              backgroundColor: '#fff',
              flex: 0.9,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} color={Colors.secondary} />
            <Text>Waiting...</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 15,
              paddingHorizontal: 10,
              justifyContent: 'space-between',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              borderTopWidth: 1,
              borderTopColor: '#cdc',
            }}>
            <View>
              <Text
                style={{
                  fontFamily: Font_Family.medium,
                  fontSize: FONT_SIZES.thirteen,
                  color: Colors.black,
                }}>
                You can cancel your order in 30 seconds.
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
              labelStyle={{
                fontFamily: Font_Family.medium,
                fontSize: FONT_SIZES.fifteen,
                color: Colors.white,
              }}
              mode={'contained'}>
              Cancel
            </Button>
          </View>
        </>
      ) : (
        <>
          <View style={styles.successImg}>
            <Image
              source={images.success}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          <Text style={styles.paymentText}>Payment Successful</Text>
          <Text style={styles.orderIdText}>
            {'Your order has been placed with\nOrderId: GNG0279802134.'}
          </Text>
        </>
      )}
    </SafeAreaView>
  );
};
