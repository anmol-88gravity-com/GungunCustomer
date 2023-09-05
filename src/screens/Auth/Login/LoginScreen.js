import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {Formik} from 'formik';
import Feather from 'react-native-vector-icons/dist/Feather';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';

import {styles} from './LoginScreen.styles';
import {images} from '../../../utils/Images';
import {Font_Family} from '../../../utils/Fontfamily';
import {login} from '../../../store/auth/authSlice';
import {useAuthMessage} from '../../../context/MessageProvider';

export const LoginScreen = ({navigation}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string().required('Phone number is required'),
    password: Yup.string().required('Password is required'),
  });

  const dispatch = useDispatch();
  const setMsg = useAuthMessage();

  const handleLogin = async ({phoneNumber, password}) => {
    try {
      await dispatch(login({phoneNumber, password})).unwrap();
      setMsg('Login Successfully.');
    } catch (e) {
      // setError(e.message);
      console.log('ls', e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <ImageBackground
          source={images.backgroundImg}
          style={styles.backgroundImage}>
          <View style={styles.overlay}>
            <Text
              style={styles.text}
              // onPress={()=>login()}
            >
              Hello, Customer!
            </Text>
            <Text style={styles.subTitle}>Please Sign in to your Account</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.loginView}>
        <ScrollView>
          <Formik
            initialValues={{phoneNumber: '8858493334', password: '123456'}}
            validationSchema={validationSchema}
            onSubmit={handleLogin}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
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
                    placeholder="Phone Number"
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
                <View style={styles.inputContainer}>
                  <FontAwesome
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
                    <FontAwesome
                      name="eye-slash"
                      size={20}
                      color="#ccc"
                      onPress={toggleSecureEntry}
                    />
                  ) : (
                    <FontAwesome
                      name="eye"
                      size={20}
                      color="#ccc"
                      onPress={toggleSecureEntry}
                    />
                  )}
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errors}>{errors.password}</Text>
                )}
                <Text
                  style={styles.forgotText}
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  Forgot Your Password?
                </Text>
                <TouchableOpacity style={styles.btnView} onPress={handleSubmit}>
                  <Text style={styles.textSignIn}>SIGN IN</Text>
                </TouchableOpacity>
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
