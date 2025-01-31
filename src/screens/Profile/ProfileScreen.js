import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {showMessage} from 'react-native-flash-message';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Button} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import {Dropdown} from 'react-native-element-dropdown';
import {
  PERMISSIONS,
  RESULTS,
  check,
  request,
  openSettings,
} from 'react-native-permissions';

import {styles} from './ProfileScreen.styles';
import {Colors} from '../../utils/Colors';
import {useGetProfileData} from '../../hooks';
import {updateUserProfile} from '../../store/user/userSlice';
import {useError} from '../../context/ErrorProvider';
import {FONT_SIZES} from '../../utils/FontSize';
import {Font_Family} from '../../utils/Fontfamily';
import {Loader} from '../../components/common/Loader';
import Config from '../../config';


export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const setError = useError();
  const {profileData, loading} = useGetProfileData();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userBirthday, setUserBirthday] = useState('');
  const [userAnniversary, setUserAnniversary] = useState('');
  const [userImage, setUserImage] = useState({
    uri: '',
    type: '',
    name: '',
  });
  const [isFocus, setIsFocus] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDateModal, setOpenDateModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (profileData) {
      setUserName(profileData.fullName);
      setUserEmail(profileData.email);
      setUserGender(profileData.gender);
      setUserPhone(profileData.phoneNumber);
      setUserBirthday(profileData.birthday);
      setUserAnniversary(profileData.anniversary);
      setUserImage({
        uri:
          profileData.profileImage.uri === ''
            ? ''
            : Config.API_URL + profileData.profileImage.uri,
        type: profileData.profileImage.type,
        name: profileData.profileImage.name,
      });
    }
  }, [profileData]);

  const genderOptions = [
    {label: 'Male', value: 'M'},
    {label: 'Female', value: 'F'},
  ];

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required*'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required*'),
    phoneNumber: Yup.string().required('Phone number is required*'),
  });
  const onSubmit = async ({
    fullName,
    email,
    phoneNumber,
    gender,
    birthday,
    anniversary,
    profilePic,
  }) => {
    try {
      await dispatch(
        updateUserProfile({
          fullName,
          email,
          phoneNumber,
          gender,
          birthday,
          anniversary,
          profilePic,
        }),
      ).unwrap();
      showMessage({
        message: 'User Profile updated Successfully.',
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

  const openCamera = async () => {
    setModalVisible(false);
    const resultCam = await launchCamera({mediaType: 'photo', quality: 0});

    if (resultCam) {
      setUserImage({
        uri: resultCam?.assets[0]?.uri,
        type: resultCam?.assets[0]?.type,
        name: resultCam?.assets[0]?.fileName,
      });
    }
  };

  const chooseImageFromGallery = async () => {
    setModalVisible(false);
    const resultGallery = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0,
    });
    if (resultGallery) {
      setUserImage({
        uri: resultGallery?.assets[0]?.uri,
        type: resultGallery?.assets[0]?.type,
        name: resultGallery?.assets[0]?.fileName,
      });
    }
  };

  const choosePhotoFromLibrary = async type => {
    check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    )
      .then(result => {
        switch (result) {
          case RESULTS.GRANTED:
            if (type === 'camera') {
              openCamera();
            } else {
              chooseImageFromGallery();
            }
            break;
          case RESULTS.UNAVAILABLE:
            setError('This feature is not available on this device!');
            break;
          case RESULTS.DENIED:
            request(
              Platform.OS === 'ios'
                ? PERMISSIONS.IOS.PHOTO_LIBRARY
                : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
            ).then(requestResult => {
              if (requestResult === RESULTS.GRANTED) {
                if (type === 'camera') {
                  openCamera();
                } else {
                  chooseImageFromGallery();
                }
              }
            });
            break;
          case RESULTS.LIMITED:
            if (type === 'camera') {
              openCamera();
            } else {
              chooseImageFromGallery();
            }
            break;
          case RESULTS.BLOCKED:
            setError(
              'The permission is denied! Please enable storage permission.',
            );
            openSettings().catch(settingsErr =>
              setError('Unable to open settings!'),
            );
            break;
        }
      })
      .catch(e => {
        setError(e.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <Formik
              initialValues={{
                fullName: userName,
                email: userEmail,
                phoneNumber: userPhone,
                gender: userGender,
                birthday: userBirthday,
                anniversary: userAnniversary,
                profilePic: userImage.uri,
              }}
              onSubmit={onSubmit}
              enableReinitialize={true}
              validationSchema={validationSchema}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                setFieldValue,
                isSubmitting,
              }) => (
                <View style={{marginHorizontal: 20, marginTop: '2%'}}>
                  <View
                    style={{
                      width: 120,
                      height: 120,
                      alignSelf: 'center',
                      marginBottom: 20,
                      borderRadius: 100,
                      borderWidth: 2,
                      borderColor: Colors.secondary,
                    }}>
                    <Image
                      source={
                        values.profilePic === ''
                          ? require('../../assets/dashboardImages/user.png')
                          : {uri: values.profilePic}
                      }
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 100,
                      }}
                    />
                    <Pressable
                      style={styles.profileView}
                      onPress={() => setModalVisible(true)}>
                      <FontAwesome
                        name="camera"
                        size={18}
                        color={Colors.white}
                      />
                    </Pressable>
                  </View>
                  <View style={styles.inputContainer}>
                    <Octicons
                      name="person"
                      size={18}
                      color="#DEA812"
                      style={styles.imageIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter full name"
                      onChangeText={handleChange('fullName')}
                      onBlur={handleBlur('fullName')}
                      value={values.fullName}
                    />
                  </View>
                  {errors.fullName && (
                    <Text style={styles.errors}>{errors.fullName}</Text>
                  )}
                  <View style={styles.inputContainer}>
                    <Entypo
                      name="email"
                      size={18}
                      color="#DEA812"
                      style={styles.imageIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Email Address"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      editable={true}
                    />
                  </View>
                  {errors.email && (
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
                      maxLength={10}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      value={values.phoneNumber}
                      editable={true}
                    />
                  </View>
                  {errors.phoneNumber && (
                    <Text style={styles.errors}>{errors.phoneNumber}</Text>
                  )}
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus && {borderColor: Colors.secondary},
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={genderOptions}
                    search={false}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Gender' : '...'}
                    value={values.gender}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setFieldValue('gender', item.value);
                      setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                      <FontAwesome
                        name="transgender-alt"
                        size={18}
                        color="#DEA812"
                        style={styles.genderIcon}
                      />
                    )}
                  />
                  <Text style={styles.profileTitle}>
                    Special Dates
                    <Text style={styles.profileOptTitle}> (Optional)</Text>
                  </Text>

                  <Pressable onPress={() => setOpen(true)}>
                    <View pointerEvents={'none'} style={styles.inputContainer}>
                      <FontAwesome
                        name="birthday-cake"
                        size={18}
                        color="#DEA812"
                        style={styles.imageIcon}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Birthday"
                        onChangeText={handleChange('birthday')}
                        onBlur={handleBlur('birthday')}
                        value={values.birthday}
                        editable={false}
                      />
                      <FontAwesome
                        name="calendar"
                        size={15}
                        color="#DEA812"
                        style={styles.imageSideIcon}
                      />
                    </View>
                  </Pressable>
                  <DatePicker
                    mode="date"
                    modal
                    open={open}
                    date={new Date()}
                    onConfirm={date => {
                      setOpen(false);
                      setFieldValue(
                        'birthday',
                        moment(date).format('YYYY-MM-DD'),
                      );
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                  <Pressable onPress={() => setOpenDateModal(true)}>
                    <View pointerEvents={'none'} style={styles.inputContainer}>
                      <MaterialCommunityIcons
                        name="candelabra-fire"
                        size={20}
                        color="#DEA812"
                        style={styles.imageIcon}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Anniversary"
                        onChangeText={handleChange('anniversary')}
                        onBlur={handleBlur('anniversary')}
                        value={values.anniversary}
                        editable={false}
                      />
                      <FontAwesome
                        name="calendar"
                        size={15}
                        color="#DEA812"
                        style={styles.imageSideIcon}
                      />
                    </View>
                  </Pressable>
                  <DatePicker
                    mode="date"
                    modal
                    open={openDateModal}
                    date={new Date()}
                    onConfirm={date => {
                      setOpenDateModal(false);
                      setFieldValue(
                        'anniversary',
                        moment(date).format('YYYY-MM-DD'),
                      );
                    }}
                    onCancel={() => {
                      setOpenDateModal(false);
                    }}
                  />
                  <Button
                    onPress={handleSubmit}
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    buttonColor={Colors.primary}
                    theme={{roundness: 0}}
                    style={styles.buttonStyless}
                    contentStyle={{height: 50}}
                    labelStyle={styles.buttonLabel}
                    uppercase={true}
                    mode={'contained'}>
                    Submit
                  </Button>
                </View>
              )}
            </Formik>
          </View>
        </KeyboardAwareScrollView>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Choose Image</Text>
            <View style={{flexDirection: 'row'}}>
              <View>
                <TouchableOpacity
                  style={styles.modalCameraBtn}
                  onPress={() => choosePhotoFromLibrary('camera')}>
                  <FontAwesome
                    name="camera"
                    size={20}
                    color={Colors.primary}
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
                <Text style={styles.cameraModalText}>Camera</Text>
              </View>

              <View>
                <TouchableOpacity
                  style={[styles.modalCameraBtn, {left: '50%'}]}
                  onPress={() => choosePhotoFromLibrary('gallery')}>
                  <MaterialIcons
                    name="perm-media"
                    size={20}
                    color={Colors.primary}
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
                <Text style={[styles.cameraModalText, {left: 20}]}>
                  Choose from gallery
                </Text>
              </View>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
