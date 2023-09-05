import React, {useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {styles} from '../ForgotPassword/ForgotPasswordScreen.styles';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import {Button} from 'react-native-paper';

import {images} from '../../../utils/Images';
import {Colors} from '../../../utils/Colors';
import {useError} from '../../../context/ErrorProvider';
import {updatePassword} from '../../../store/auth/forgotPasswordSlice';
import {showMessage} from 'react-native-flash-message';
import {FONT_SIZES} from '../../../utils/FontSize';
import {Font_Family} from '../../../utils/Fontfamily';

export const ResetPassword = ({route, navigation}) => {
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string().required('New Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf(
        [Yup.ref('newPassword'), ''],
        'Password amd Confirm Password must be same.',
      ),
  });

  const dispatch = useDispatch();
  const setError = useError();

  const phoneNumber = route.params.phoneNumber;

  const onSubmit = async ({newPassword}) => {
    try {
      const res = await dispatch(
        updatePassword({phoneNumber, newPassword}),
      ).unwrap();
      if (res) {
        showMessage({
          message: 'Password updated Successfully.',
          type: 'default',
          backgroundColor: Colors.secondary,
          color: Colors.primary,
          textStyle: {
            fontSize: FONT_SIZES.fifteen,
            fontFamily: Font_Family.medium,
          },
        });
        navigation.navigate('Login');
      }
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
            <Text style={styles.subTitle}>Please Reset your Password</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.loginView}>
        <ScrollView>
          <Formik
            initialValues={{newPassword: '', confirmPassword: ''}}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
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
                  <Text style={styles.headingText}>Reset Password</Text>
                </View>
                <View style={styles.inputContainer}>
                  <FontAwesome
                    name="lock"
                    size={18}
                    color="#DEA812"
                    style={styles.imageIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter New Password"
                    keyboardType="phone-pad"
                    maxLength={10}
                    onChangeText={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    value={values.newPassword}
                    secureTextEntry={true}
                  />
                </View>
                {touched.newPassword && errors.newPassword && (
                  <Text style={styles.errors}>{errors.newPassword}</Text>
                )}
                <View style={styles.inputContainer}>
                  <FontAwesome
                    name="lock"
                    size={18}
                    color="#DEA812"
                    style={styles.imageIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter New Confirm Password"
                    keyboardType="phone-pad"
                    maxLength={10}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry={true}
                  />
                </View>
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errors}>{errors.confirmPassword}</Text>
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
                  update
                </Button>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
