import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable,
  Dimensions
} from 'react-native';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import Feather from 'react-native-vector-icons/dist/Feather';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { images } from '../../../utils/Images';
import { styles } from './RegisterScreen.styles';
import { register, registerOTP } from '../../../store/auth/authSlice';
import { EmailValidation, MobileValidation } from '../../../utils/helper';
import { ApiEndpoints } from '../../../store/ApiEndPoints';
import { Button } from 'react-native-paper';
import { Colors } from '../../../utils/Colors';
import { useDispatch } from 'react-redux';
import { useError } from '../../../context/ErrorProvider';
import { useAuthMessage } from '../../../context/MessageProvider';

const HEIGHT = Dimensions.get('screen').height;
export const RegisterScreen = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const setError = useError();
  const setMessage = useAuthMessage();


  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
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
              email: values,
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
              phone_number: values,
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
      const res = await dispatch(registerOTP({phoneNumber})).unwrap();
      if (res) {
        setModalVisible(true);
        setMobileNumber(phoneNumber);
      }
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, []);

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
            onSubmit={(values) => console.log(values, 'values')}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
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
                    style={styles.input}
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
                  <Pressable onPress={() => generateOTP(values.phoneNumber)}>
                    <Text style={styles.btnGetOTP}>Get OTP</Text>
                  </Pressable>
                </View>
                {touched.phoneNumber && errors.phoneNumber && (
                  <Text style={styles.errors}>{errors.phoneNumber}</Text>
                )}

                <Button
                  // onPress={handleSubmit}
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
      </View>
    </SafeAreaView>
  );
};
