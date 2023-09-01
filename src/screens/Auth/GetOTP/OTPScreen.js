import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Platform,
} from 'react-native';

import { images } from '../../../utils/Images';
import { styles } from './OTPScreen.styles';

export const OTPScreen = ({ navigation }) => {
  const [code, setCode] = useState('');
  const inputRefs = useRef([]);

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
    inputRefs.current.forEach((ref) => ref.clear());
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={images.backgroundImg}
          style={styles.backgroundImage}>
          <View style={styles.overlay}>
            <Text style={styles.text}>Hello, Customer!</Text>
            <Text style={styles.subTitle}>Please Enter OTP</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.loginView}>
        <ScrollView>
          <View style={{ marginHorizontal: 20 }}>
            <View style={{ marginTop: '15%' }}>
              <Text style={styles.headingText}>Verify OTP to Continue</Text>
            </View>

            <View style={styles.inputTextField}>
              {[0, 1, 2, 3].map((index) => (
                <TextInput
                  key={index}
                  style={[styles.inputText, borderBottom]}
                  maxLength={1}
                  keyboardType="numeric"
                  value={code[index]}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  onChangeText={(value) => handleCodeChange(value, index)}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.btnView} >
              <Text style={styles.textSignIn}>Verify</Text>
            </TouchableOpacity>

            <View style={{ marginTop: '5%' }}>
              <Text style={styles.verifyOTPText}>Didn't Received the OTP?</Text>
              <Text
                style={styles.btnResend}
                onPress={() => navigation.navigate('ResetPassword')}>
                Resend
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
