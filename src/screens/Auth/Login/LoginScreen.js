import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  ScrollView,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {Formik} from 'formik';
import Feather from 'react-native-vector-icons/dist/Feather';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {Button} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';

import {styles} from './LoginScreen.styles';
import {images} from '../../../utils/Images';
import {Font_Family} from '../../../utils/Fontfamily';
import {requestOTP, verifyOTP} from '../../../store/auth/authSlice';
import {useError} from '../../../context/ErrorProvider';
import {Colors} from '../../../utils/Colors';
import {FONT_SIZES} from '../../../utils/FontSize';

export const LoginScreen = ({navigation}) => {
  const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit phone number'),
    otp: otpSent
      ? Yup.string()
          .required('OTP is required')
          .length(6, 'OTP must be 6 digits')
      : Yup.string(),
  });

  const dispatch = useDispatch();
  const setError = useError();

  const handleRequestOTP = async ({phoneNumber}) => {
    try {
      await dispatch(requestOTP({phoneNumber})).unwrap(); // API call to request OTP
      setOtpSent(true);
      showMessage({
        message: 'OTP sent successfully!',
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

  const handleVerifyOTP = async ({phoneNumber, otp}) => {
    try {
      await dispatch(verifyOTP({phoneNumber, otp})).unwrap(); // API call to verify OTP
      showMessage({
        message: 'Login Successful.',
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <ImageBackground
          source={images.backgroundImg}
          style={styles.backgroundImage}>
          <View style={styles.overlay}>
            <Text style={styles.text}>Hello, Customer!</Text>
            <Text style={styles.subTitle}>Sign in with OTP</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.loginView}>
        <ScrollView>
          <Formik
            initialValues={{phoneNumber: '', otp: ''}}
            validationSchema={validationSchema}
            onSubmit={otpSent ? handleVerifyOTP : handleRequestOTP}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View style={{marginHorizontal: 20}}>
                <View style={{marginVertical: 20}}>
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

                {otpSent && (
                  <>
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
                        maxLength={6}
                        keyboardType="number-pad"
                        onChangeText={handleChange('otp')}
                        onBlur={handleBlur('otp')}
                        value={values.otp}
                      />
                    </View>
                    {touched.otp && errors.otp && (
                      <Text style={styles.errors}>{errors.otp}</Text>
                    )}
                  </>
                )}

                <Button
                  onPress={handleSubmit}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  buttonColor={Colors.primary}
                  theme={{roundness: 0}}
                  style={styles.buttonStyles}
                  contentStyle={{height: 50}}
                  labelStyle={styles.buttonLabel}
                  uppercase={true}
                  mode={'contained'}>
                  {otpSent ? 'Verify OTP' : 'Request OTP'}
                </Button>
                <View style={{marginTop: '10%'}}>
                  <Text style={styles.bottomtmtitledText}>
                    New User? Lets get started by
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
