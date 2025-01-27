import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  ScrollView,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { Formik } from 'formik';
import Feather from 'react-native-vector-icons/dist/Feather';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';

import { styles } from './LoginScreen.styles';
import { images } from '../../../utils/Images';
import { Font_Family } from '../../../utils/Fontfamily';
import { Colors } from '../../../utils/Colors';
import { FONT_SIZES } from '../../../utils/FontSize';
import { login, generateOTP, verifyOTP } from '../../../store/auth/authSlice';

export const LoginScreen = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [otpSent, setOtpSent] = useState(false); // Track OTP sent status
  const [otpVerified, setOtpVerified] = useState(false); // Track OTP verification status
  const [showOtpInput, setShowOtpInput] = useState(false); // Control visibility of OTP input field
  const [otpRequested, setOtpRequested] = useState(false); // To track if OTP was requested

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    otp: otpSent ? Yup.string().required('OTP is required') : Yup.string(),
  });

  const dispatch = useDispatch();

  const handleLogin = async ({ phoneNumber, otp }) => {
    try {
      if (!otpRequested) {
        // Generate OTP
        const response = await dispatch(generateOTP({ phoneNumber })).unwrap();

        if (response?.message === 'OTP sent successfully') {
          setOtpRequested(true); // Mark OTP requested
          setOtpSent(true); // Mark OTP as sent
          setShowOtpInput(true); // Show OTP input
          setOtpVerified(false); // Reset OTP verification status
          showMessage({
            message: response.message,
            type: 'default',
            backgroundColor: Colors.secondary,
            color: Colors.white,
            textStyle: { fontSize: FONT_SIZES.fifteen, fontFamily: Font_Family.medium },
          });
        } else {
          showMessage({
            message: 'Failed to send OTP. Please try again.',
            type: 'danger',
            backgroundColor: Colors.error,
            color: Colors.white,
          });
        }
      } else {
        // Immediate OTP Verification on Submit
        const verifyResponse = await dispatch(verifyOTP({ mobileNumber: phoneNumber, code: otp })).unwrap();

        if (verifyResponse) {
          setOtpVerified(true); // Mark OTP as verified
          const { client_id, client_secret, email, name, token } = verifyResponse;

          // Now, dispatch login with phoneNumber and OTP (since the login API expects both)
          const loginResponse = await dispatch(login({ phoneNumber, otp, client_id, client_secret, email, name, token })).unwrap();

          // Show success message and navigate to Dashboard
          if (loginResponse) {
            showMessage({
              message: 'Login Successful!',
              type: 'default',
              backgroundColor: Colors.secondary,
              color: Colors.white,
            });
          }
        } else {
          showMessage({
            message: 'OTP verification failed.',
            type: 'danger',
            backgroundColor: Colors.error,
            color: Colors.white,
          });
        }
      }
    } catch (error) {
      showMessage({
        message: error.message || 'An error occurred. Please try again.',
        type: 'danger',
        backgroundColor: Colors.error,
        color: Colors.white,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ImageBackground source={images.backgroundImg} style={styles.backgroundImage}>
          <View style={styles.overlay}>
            <Text style={styles.text}>Hello, Customer!</Text>
            <Text style={styles.subTitle}>Please Sign in to your Account</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.loginView}>
        <ScrollView>
          <Formik
            initialValues={{ phoneNumber: '9595454581', otp: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View style={{ marginHorizontal: 20 }}>
                <View style={{ marginVertical: 20 }}>
                  <Text style={styles.headingText}>Sign In</Text>
                </View>
                <View style={styles.inputContainer}>
                  <Feather
                    name="smartphone"
                    size={18}
                    color="#DEA812"
                    style={styles.imageIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Phone Number"
                    maxLength={10}
                    keyboardType="phone-pad"
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                  />
                </View>
                {touched.phoneNumber && errors.phoneNumber && (
                  <Text style={styles.errors}>{errors.phoneNumber}</Text>
                )}

                {showOtpInput && otpSent && (
                  <View style={styles.inputContainer}>
                    <FontAwesome
                      name="lock"
                      size={20}
                      color="#DEA812"
                      style={styles.imageIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter OTP"
                      keyboardType="numeric"
                      onChangeText={handleChange('otp')}
                      onBlur={handleBlur('otp')}
                      value={values.otp}
                    />
                  </View>
                )}
                {touched.otp && errors.otp && (
                  <Text style={styles.errors}>{errors.otp}</Text>
                )}

                {/* Dynamic Button for OTP Sending and Verifying */}
                <Button
                  onPress={handleSubmit}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  buttonColor={Colors.primary}
                  theme={{ roundness: 0 }}
                  style={styles.buttonStyles}
                  contentStyle={{ height: 50 }}
                  labelStyle={styles.buttonLabel}
                  uppercase={true}
                  mode={'contained'}>
                  {otpSent
                    ? otpVerified
                      ? 'Login'
                      : 'Verify OTP'
                    : 'Send OTP'}
                </Button>
                <View style={{ marginTop: '10%' }}>
                  <Text style={styles.bottomtmtitledText}>
                    New User? Let's get started by
                    <Text
                      style={{
                        color: '#005C79',
                        fontFamily: Font_Family.regular,
                      }}
                      onPress={() => navigation.navigate('Register')}>
                      {' '}
                      Signing-Up{' '}
                    </Text>
                    and
                  </Text>
                  <Text style={styles.bottomtmtitledText}>
                    Exploring gunGun
                  </Text>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
