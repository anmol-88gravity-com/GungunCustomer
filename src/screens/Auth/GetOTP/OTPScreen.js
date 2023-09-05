import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';

import { images } from '../../../utils/Images';
import { styles } from './OTPScreen.styles';
import { Colors } from '../../../utils/Colors';
import { otpVerify } from '../../../store/auth/forgotPasswordSlice';
import { useError } from '../../../context/ErrorProvider';

export const OTPScreen = ({ navigation, route }) => {
  const phoneNumber = route.params.phoneNumber;

  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  const dispatch = useDispatch();
  const setError = useError();

  const handleCodeChange = (value, index) => {
    const tempCode = code.split('');
    tempCode[index] = value;
    setCode(tempCode.join(''));

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = () => {
    setCode('');
    inputRefs.current.forEach(ref => ref.clear());
  };

  const borderBottom =
    Platform.OS === 'ios'
      ? {
        borderBottomColor: code.length > 0 ? '#000' : '#ccc',
        borderBottomWidth: 2,
      }
      : {
        borderBottomColor: code.length > 0 ? '#000' : '#ccc',
        borderWidth: 0,
        borderBottomWidth: 2,
      };

  const onPressHandler = async () => {
    setIsLoading(true);
    try {
      const res = await dispatch(otpVerify({ phoneNumber, code })).unwrap();
      if (res) {
        navigation.navigate('ResetPassword', { phoneNumber: phoneNumber });
      }
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={images.backgroundImg}
          style={styles.backgroundImage}>
          <View style={styles.overlay}>
            <Text style={styles.text}>Hello, Customer!</Text>
            <Text style={styles.subTitle}>
              {'OTP is sent to your registered\nmobile number.'}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.loginView}>
        <ScrollView>

          <View style={{ marginHorizontal: 20 }}>
            <View style={{ marginTop: '15%' }}>
              <Text style={styles.headingText}>Enter OTP to Continue</Text>
            </View>

            <View style={styles.inputTextField}>
              {[0, 1, 2, 3].map(index => (
                <TextInput
                  key={index}
                  style={[styles.inputText, borderBottom]}
                  maxLength={1}
                  keyboardType="numeric"
                  value={code[index]}
                  ref={ref => (inputRefs.current[index] = ref)}
                  onChangeText={value => handleCodeChange(value, index)}
                />
              ))}
            </View>

            <View
              style={{
                marginVertical: 40,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.verifyOTPText}>OTP not received? </Text>
              <Text style={styles.btnResend}>Resend OTP</Text>
            </View>

            <Button
              onPress={onPressHandler}
              loading={isLoading}
              disabled={isLoading}
              buttonColor={Colors.primary}
              theme={{ roundness: 0 }}
              style={styles.buttonStyles}
              contentStyle={{ height: 50 }}
              labelStyle={styles.buttonLabel}
              uppercase={true}
              mode={'contained'}>
              Verify
            </Button>
          </View>


        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
