import React from 'react';
import {SafeAreaView, View, Text, TextInput, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import {Button} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';

import {styles} from './ChangePasswordScreen.styles';
import {Colors} from '../../../utils/Colors';
import {useError} from '../../../context/ErrorProvider';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {changePassword} from '../../../store/user/userSlice';
import {FONT_SIZES} from '../../../utils/FontSize';
import {Font_Family} from '../../../utils/Fontfamily';

export const ChangePasswordScreen = ({navigation}) => {
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

  const onSubmit = async ({confirmPassword, newPassword}) => {
    try {
      const res = await dispatch(
        changePassword({confirmPassword, newPassword}),
      ).unwrap();
      if (res) {
        showMessage({
          message: 'Password updated Successfully.',
          type: 'default',
          backgroundColor: Colors.secondary,
          color: Colors.white,
          textStyle: {
            fontSize: FONT_SIZES.fifteen,
            fontFamily: Font_Family.medium,
          },
        });
        navigation.goBack();
      }
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{marginHorizontal: 20, marginTop: 20}}>
            <KeyboardAwareScrollView>
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
                  <View>
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
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        secureTextEntry={true}
                      />
                    </View>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Text style={styles.errors}>
                        {errors.confirmPassword}
                      </Text>
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
            </KeyboardAwareScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
