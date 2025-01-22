import React, { useEffect, useState } from 'react';
import { Modal, Pressable, Text, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, TextInput } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { styles } from '../Mapscreen.styles';
import { AddressTypeButton } from './AddressTypeButton';
import { Colors } from '../../../../utils/Colors';
import { useError } from '../../../../context/ErrorProvider';
import { FONT_SIZES } from '../../../../utils/FontSize';
import { Font_Family } from '../../../../utils/Fontfamily';
import { useGetSingleAddress } from '../../../../hooks';
import { Loader } from '../../../../components/common/Loader';
import {
  addAddress,
  updateAddress,
} from '../../../../store/address/addressSlice';

export const AddressModal = ({
  open,
  onClose,
  addressId,
  address2,
  lat,
  long,
}) => {
  const [addressTitle, setAddressTitle] = useState('home');
  const [add1, setAddress1] = useState('');
  const [add2, setAddress2] = useState('');
  const [landmark, setLandmark] = useState('');

  const { addressDetails, loading } = useGetSingleAddress(addressId);

  useEffect(() => {
    setAddress2(address2);
  }, [address2]);

  const validationSchema = Yup.object().shape({
    address1: Yup.string().required(
      'Flat / House No / Floor / Building is required',
    ),
    address2: Yup.string().required('Area / Sector / Locality is required'),
    addressType: Yup.string().required('Address save as is required'),
  });

  const dispatch = useDispatch();
  const setError = useError();

  const onSubmit = async ({ address1, address2, landmark, addressType }) => {
    try {
      await dispatch(
        addAddress({
          address1,
          address2,
          landmark,
          addressType,
          lat,
          long,
        }),
      ).unwrap();
      showMessage({
        message: 'Added Successfully.',
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
    onClose();
  };

  const onHandleSubmit = async ({
    address1,
    address2,
    landmark,
    addressType,
  }) => {
    try {
      await dispatch(
        updateAddress({ address1, address2, landmark, addressType, addressId }),
      ).unwrap();
      showMessage({
        message: 'Updated Successfully.',
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
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <KeyboardAvoidingView
          style={styles.modalView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView
              enableOnAndroid
              enableAutomaticScroll
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.modalContent}>
              <View style={styles.modalContainer}>
                <Text style={styles.exactAddress}>Enter the Exact Address</Text>
                <Pressable onPress={onClose}>
                  <AntDesign name="close" size={24} color="black" />
                </Pressable>
              </View>
              {addressDetails && loading ? (
                <View style={{ marginVertical: 20 }}>
                  <Loader />
                </View>
              ) : (
                <Formik
                  initialValues={{
                    address1: add1,
                    address2: add2,
                    landmark: landmark,
                    addressType: addressTitle,
                  }}
                  enableReinitialize={true}
                  validationSchema={validationSchema}
                  onSubmit={addressId === undefined ? onSubmit : onHandleSubmit}>
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    setFieldValue,
                  }) => (
                    <>
                      <Text style={styles.saveAs}>Save as*</Text>
                      <View style={styles.buttonRow}>
                        <AddressTypeButton
                          handlePress={() => {
                            setFieldValue('addressType', 'home', true);
                            setAddressTitle('home');
                          }}
                          icon={
                            <AntDesign
                              name={'home'}
                              size={18}
                              color={
                                addressTitle === 'home'
                                  ? Colors.secondary
                                  : '#808080'
                              }
                            />
                          }
                          title={'home'}
                          addressTitle={addressTitle}
                        />
                        <AddressTypeButton
                          handlePress={() => {
                            setFieldValue('addressType', 'work', true);
                            setAddressTitle('work');
                          }}
                          icon={
                            <MaterialCommunityIcons
                              name="office-building-marker"
                              size={18}
                              color={
                                addressTitle === 'work'
                                  ? Colors.secondary
                                  : '#808080'
                              }
                            />
                          }
                          title={'work'}
                          addressTitle={addressTitle}
                        />
                        <AddressTypeButton
                          handlePress={() => {
                            setFieldValue('addressType', 'other', true);
                            setAddressTitle('other');
                          }}
                          icon={
                            <MaterialCommunityIcons
                              name="map-marker"
                              size={18}
                              color={
                                addressTitle === 'Other'
                                  ? Colors.secondary
                                  : '#808080'
                              }
                            />
                          }
                          title={'other'}
                          addressTitle={addressTitle}
                        />
                      </View>
                      {touched.addressType && errors.addressType && (
                        <Text style={styles.errors}>{errors.addressType}</Text>
                      )}
                      <TextInput
                        label={'Flat / House No / Floor / Building*'}
                        style={styles.flatStyles}
                        mode={'outlined'}
                        outlineStyle={styles.outlineStyles}
                        inputStyle={styles.inputStyles}
                        dense={true}
                        placeholderTextColor={'#ccc'}
                        onChangeText={handleChange('address1')}
                        onBlur={handleBlur('address1')}
                        value={values.address1}
                      />
                      {touched.address1 && errors.address1 && (
                        <Text style={styles.errors}>{errors.address1}</Text>
                      )}
                      <TextInput
                        label={'Area / Sector / Locality*'}
                        outlineStyle={styles.outlineStyles}
                        inputStyle={styles.inputStyles}
                        style={styles.flatStyles}
                        mode={'outlined'}
                        dense={true}
                        placeholderTextColor={'#ccc'}
                        onChangeText={handleChange('address2')}
                        onBlur={handleBlur('address2')}
                        value={values.address2}
                      />
                      {touched.address2 && errors.address2 && (
                        <Text style={styles.errors}>{errors.address2}</Text>
                      )}
                      <TextInput
                        label={'Nearby landmark (optional)'}
                        outlineStyle={styles.outlineStyles}
                        inputStyle={styles.inputStyles}
                        style={styles.flatStyles}
                        mode={'outlined'}
                        dense={true}
                        placeholderTextColor={'#ccc'}
                        onChangeText={handleChange('landmark')}
                        onBlur={handleBlur('landmark')}
                        value={values.landmark}
                      />
                      {touched.landmark && errors.landmark && (
                        <Text style={styles.errors}>{errors.landmark}</Text>
                      )}
                      <Button
                        buttonColor={Colors.primary}
                        theme={{ roundness: 0 }}
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        onPress={handleSubmit}
                        style={styles.modalButton}
                        contentStyle={{ height: 50 }}
                        labelStyle={styles.buttonLabelStyles}
                        mode={'contained'}>
                        SAVE
                      </Button>
                    </>
                  )}
                </Formik>
              )}
            </KeyboardAwareScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};
