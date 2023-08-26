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
import Octicons from 'react-native-vector-icons/dist/Octicons';
import Feather from 'react-native-vector-icons/dist/Feather';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {images} from '../../../utils/Images';
import {styles} from './RegisterScreen.styles';

export const RegisterScreen = ({navigation}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const validationSchema = Yup.object().shape({
    resturantName: Yup.string().required('Resturant Name is required *'),
    fullName: Yup.string().required('Enter full name *'),
    password: Yup.string().required('Enter password *'),
    phoneNumber: Yup.string().required('Enter phone number *'),
    email: Yup.string().required('Enter valid email *'),
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, backgroundColor: 'red'}}>
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
              resturantName: '',
              fullName: '',
              password: '',
              phoneNumber: '',
              email: '',
            }}
            validationSchema={validationSchema}
            onSubmit={values => console.log('values--', values)}>
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
                    />
                  ) : (
                    <Feather
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
                    />
                  ) : (
                    <Feather
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
                  />
                </View>
                {touched.phoneNumber && errors.phoneNumber && (
                  <Text style={styles.errors}>{errors.phoneNumber}</Text>
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
                <TouchableOpacity style={styles.btnView} onPress={handleSubmit}>
                  <Text style={styles.textSignIn}>CREATE ACCOUNT</Text>
                </TouchableOpacity>
                {/* <View style={{ marginTop: '10%' }}>
                                    <View style={{ backgroundColor: '#E1E1E1', height: 1, width: '100%' }}></View>
                                </View>
                                <View style={{ marginTop: '10%' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <Image source={images.google} style={[styles.icon, { marginTop: -2 }]} />
                                        <Text style={{ textDecorationLine: 'underline', color: '#ccc',fontFamily: Font_Family.medium,fontSize:FONT_SIZES.fifteen }}>OR SIGNUP USING GMAIL</Text>
                                    </View>
                                </View> */}
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
