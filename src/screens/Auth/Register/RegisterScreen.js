import React, { useCallback, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  ScrollView,
  TextInput,
  Pressable,
  Modal,
  Dimensions
} from 'react-native';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import Feather from 'react-native-vector-icons/dist/Feather';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { images } from '../../../utils/Images';
import { styles } from './RegisterScreen.styles';
import { otpVerify, register, registerOTP } from '../../../store/auth/authSlice';
import { EmailValidation, MobileValidation } from '../../../utils/helper';
import { ApiEndpoints } from '../../../store/ApiEndPoints';
import { Button } from 'react-native-paper';
import { Colors } from '../../../utils/Colors';
import { useDispatch } from 'react-redux';
import { useError } from '../../../context/ErrorProvider';
import { useAuthMessage } from '../../../context/MessageProvider';
import { Axios } from '../../../lib/Axios';
import { showMessage } from 'react-native-flash-message';
import { FONT_SIZES } from '../../../utils/FontSize';
import { Font_Family } from '../../../utils/Fontfamily';


const HEIGHT = Dimensions.get('screen').height;
export const RegisterScreen = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  const dispatch = useDispatch();
  const setError = useError();
  const setMessage = useAuthMessage();


  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleCodeChange = (value, index) => {
    const tempCode = code.split('');
    tempCode[index] = value;
    setCode(tempCode.join(''));

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
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


  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf(
        [Yup.ref('password'), ''],
        'Password amd Confirm Password must be same.',
      ),
    email: Yup.string()
      .matches(EmailValidation, 'Email is not valid')
      .required('Email is required')
      .test('Email already exists', async values => {
        if (values) {
          try {
            let response = await Axios.post(ApiEndpoints.auth.uniqueCheck, {
              email: values.email,
              phone_number: '',
            });
            return response.data.status === 'ok';
          } catch (error) {
            console.log(error);
          }
        }
      }
      ),
    phoneNumber: Yup.string()
      .required('Phone Number is required')
      .matches(MobileValidation, 'Enter Valid Phone Number')
      .test('Phone Number already exists', async values => {
        if (values) {
          try {
            let response = await Axios.post(ApiEndpoints.auth.uniqueCheck, {
              email: '',
              phone_number: values.phoneNumber,
            });
            return response.data.status === 'ok';
          } catch (error) {
            console.log(error);
          }
        }
      }),

  });


  const generateOTP = useCallback(async (phoneNumber) => {
    if (phoneNumber === '') {
      setMessage('Phone Number is required');
      return;
    }
    setLoading(true);
    try {
      const res = await dispatch(registerOTP({ phoneNumber })).unwrap();
      if (res) {
        showMessage({
          message: 'OTP has been sent successfully',
          type: 'default',
          backgroundColor: Colors.secondary,
          color: Colors.white,
          textStyle: {
            fontSize: FONT_SIZES.fifteen,
            fontFamily: Font_Family.medium,
          },
        });
        setModalVisible(true);
        setMobileNumber(phoneNumber);
      }
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, []);


  const otpVerifyHandler = useCallback(async () => {
    try {
      const res = await dispatch(otpVerify({ mobileNumber, code })).unwrap();
      if (res) {
        setModalVisible(false);
        setVerified(true);
      }
    } catch (e) {
      setError(e.message);
    }
  }, [verified, mobileNumber, code]);


  const handleRegister = async ({ fullName, password, confirmPassword, email, phoneNumber }) => {
    try {
      await dispatch(register({ fullName, password, confirmPassword, email, phoneNumber })).unwrap();
      showMessage({
        message: 'Registration Successfully.',
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
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <ImageBackground
          source={images.backgroundImg}
          style={styles.backgroundImage}>
          <View style={styles.overlay}>
            <Text style={styles.text}>Hello, Customer!</Text>
            <Text style={styles.subTitle}>New User? Lets Get Started By</Text>
            <Text style={styles.subTitlee}>
              Signing-Up and Exploring Gungun
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.loginView}>
        <ScrollView>
          <Formik
            initialValues={{
              fullName: '', password: '', confirmPassword: '', email: '', phoneNumber: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,isSubmitting
            }) => (
              <View style={{ marginHorizontal: 20 }}>
                <View style={{ marginVertical: 20 }}>
                  <Text style={styles.headingText}>Create Account</Text>
                </View>
                <View style={styles.inputContainer}>
                  <Octicons
                    name="person"
                    size={20}
                    color="#DEA812"
                    style={styles.imageIcon}
                  />
                  <TextInput
                    style={[styles.input,{textTransform:'capitalize'}]}
                    placeholder="Full name"
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    value={values.fullName}
                    
                  />
                </View>
                {touched.fullName && errors.fullName && (
                  <Text style={styles.errors}>{errors.fullName}</Text>
                )}
                <View style={styles.inputContainer}>
                  <Feather
                    name="lock"
                    size={20}
                    color="#DEA812"
                    style={styles.imageIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={secureTextEntry}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  {secureTextEntry ? (
                    <Feather
                      name="eye-off"
                      size={20}
                      color="#ccc"
                      onPress={toggleSecureEntry}
                      style={styles.eyeImageIcon}
                    />
                  ) : (
                    <Feather
                      name="eye"
                      size={20}
                      color="#ccc"
                      onPress={toggleSecureEntry}
                      style={styles.eyeImageIcon}
                    />
                  )}
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errors}>{errors.password}</Text>
                )}
                <View style={styles.inputContainer}>
                  <Feather
                    name="lock"
                    size={20}
                    color="#DEA812"
                    style={styles.imageIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry={secureTextEntry}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                  />
                  {secureTextEntry ? (
                    <Feather
                      name="eye-off"
                      size={20}
                      color="#ccc"
                      onPress={toggleSecureEntry}
                      style={styles.eyeImageIcon}
                    />
                  ) : (
                    <Feather
                      name="eye"
                      size={20}
                      color="#ccc"
                      onPress={toggleSecureEntry}
                      style={styles.eyeImageIcon}
                    />
                  )}
                </View>
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errors}>{errors.confirmPassword}</Text>
                )}

                <View style={styles.inputContainer}>
                  <Entypo
                    name="email"
                    size={20}
                    color="#DEA812"
                    style={styles.imageIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errors}>{errors.email}</Text>
                )}
                <View style={styles.inputContainer}>
                  <Feather
                    name="smartphone"
                    size={18}
                    color="#DEA812"
                    style={styles.imageIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                    maxLength={10}
                  />
                  {mobileNumber === values.phoneNumber && verified ? (
                    <Pressable >
                      <Text style={[styles.btnGetOTP, { color: Colors.green }]}>Verify</Text>
                    </Pressable>
                  ) : (<Pressable
                    onPress={() => generateOTP(values.phoneNumber)}
                  // onPress={() => setModalVisible(true)}
                  >
                    <Text style={styles.btnGetOTP}>Get OTP</Text>
                  </Pressable>)}

                </View>
                {touched.phoneNumber && errors.phoneNumber && (
                  <Text style={styles.errors}>{errors.phoneNumber}</Text>
                )}

                <Button
                  onPress={handleSubmit}
                  loading={isSubmitting}
                  disabled={!verified || isSubmitting}
                  buttonColor={Colors.primary}
                  theme={{ roundness: 0 }}
                  style={styles.buttonStyles}
                  contentStyle={{ height: 50 }}
                  labelStyle={styles.buttonlabel}
                  mode={'contained'}>
                  CREATE ACCOUNT
                </Button>

              </View>
            )}
          </Formik>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Entypo name="cross" size={20} style={{ alignSelf: 'flex-end', bottom: 20, }} color={Colors.black} onPress={() => setModalVisible(!modalVisible)} />
              <Text style={styles.modalText}> OTP sent successfully on your Phone Number 💬.</Text>
              <View style={{ marginHorizontal: 20 }}>
                <View style={{ marginTop: '15%' }}>
                  <Text style={styles.headingTextt}>Enter OTP to Continue</Text>
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
                  onPress={otpVerifyHandler}
                  loading={isLoading}
                  disabled={isLoading}
                  buttonColor={Colors.primary}
                  theme={{ roundness: 0 }}
                  style={styles.buttonStyless}
                  contentStyle={{ height: 50 }}
                  labelStyle={styles.buttonLabel}
                  uppercase={true}
                  mode={'contained'}>
                  Verify
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
