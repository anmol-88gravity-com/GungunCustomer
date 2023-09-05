import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {styles} from './ForgotPasswordScreen.styles';
import Feather from 'react-native-vector-icons/dist/Feather';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';

import {images} from '../../../utils/Images';
import {generateOTP} from '../../../store/auth/forgotPasswordSlice';
import {useError} from '../../../context/ErrorProvider';
import {Colors} from '../../../utils/Colors';

export const ForgotPasswordScreen = ({navigation}) => {
  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string().required('Phone number is required*'),
  });

  const dispatch = useDispatch();
  const setError = useError();

  const handleLogin = async ({phoneNumber}) => {
    try {
      await dispatch(generateOTP({phoneNumber})).unwrap();
      navigation.navigate('OTP', {phoneNumber: phoneNumber});
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
            <Text style={styles.subTitle}>
              {'Please Enter Your Registered\nPhone Number'}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.loginView}>
        <ScrollView>
          <Formik
            initialValues={{phoneNumber: ''}}
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
              <View style={{marginHorizontal: 20}}>
                <View style={{marginTop: '15%'}}>
                  <Text style={styles.headingText}>Forgot Your Password?</Text>
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
                    keyboardType="phone-pad"
                    maxLength={10}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                  />
                </View>
                {touched.phoneNumber && errors.phoneNumber && (
                  <Text style={styles.errors}>{errors.phoneNumber}</Text>
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
                  Continue
                </Button>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
