import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  Modal
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { showMessage } from 'react-native-flash-message'



import { styles } from './ProfileScreen.styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors } from '../../utils/Colors';;
import { useGetProfileData } from '../../hooks/profile/useGetProfileData';
import Config from '../../config';
import { updateUserProfile } from '../../store/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthMessage } from '../../context/MessageProvider';
import { useError } from '../../context/ErrorProvider';
import { FONT_SIZES } from '../../utils/FontSize';
import { Font_Family } from '../../utils/Fontfamily';
import { Loader } from '../../components/common/Loader';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Button } from 'react-native-paper';


export const ProfileScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const setError = useError();
  const setMessage = useAuthMessage();

  const [profileUpdateData, setProfileUpdateData] = useState(profileData);
  const { profileData, loading } = useGetProfileData();
  const getProfileDetail = profileUpdateData?.partner_profile;
  // console.log('profileDatassss---', profileData?.partner_profile?.name);

  // console.log('getProfileDetail---', getProfileDetail);

  useEffect(() => {
    setProfileUpdateData(profileData);
  }, [profileData]);

  const [selectedGender, setSelectedGender] = useState();
  const [showDropdown, setShowDropdown] = useState();
  const [birthdayDate, setBirthdayDate] = useState(new Date());
  const [open, setOpen] = useState(false)
  const stringBirthdayDate = birthdayDate;
  const date = new Date(stringBirthdayDate);
  const formattedBirthdayDate = date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
  // console.log('formattedBirthdayDate--', formattedBirthdayDate)


  const [anniversarryDate, setAnniversarryDate] = useState(new Date());
  const [openDateModal, setOpenDateModal] = useState(false);
  const stringAnniversarryDate = anniversarryDate;
  const anniversarrydate = new Date(stringAnniversarryDate);
  const formattedAnniversarryDate = anniversarrydate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
  // console.log('formattedBirthdayDate--',formattedBirthdayDate)

  const genderOptions = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
  ];

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required*'),
    email: Yup.string().email('Invalid email address').required('Email is required*'),
    phoneNumber: Yup.string().required('Phone number is required*'),
  });

  const user_Id = useSelector((state) => state?.auth?.userId);
  const handleSubmit = async ({
    fullName,
    email,
    phoneNumber,
    selectedGender,
    birthday,
    anniversarry,
    profileImage
  }) => {
    try {
      await dispatch(
        updateUserProfile({ fullName, email, phoneNumber, selectedGender, birthday, anniversarry, profileImage }),
      ).unwrap();
      setProfileUpdateData({
        fullName: '',
        email: '',
        phoneNumber: '',
        selectedGender: '',
        birthday: '',
        anniversarry: '',
        profileImage: ''
      });
      // console.log('data------', fullName, email, phoneNumber, selectedGender, birthday, anniversarry, profileImage)
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

    }
    catch (e) {
      setError(e.message);
    }
  };


  // Image Gallery Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [captureImage, setCaptureImage] = useState(null);

  const openCamera = async () => {
    setModalVisible(false)
    const resultCam = await launchCamera({ mediaType: 'photo', quality: 0 });
    const fromCamraImage = resultCam.assets[0]?.uri;
    setCaptureImage(fromCamraImage)
    // console.log('==>>>resultCam', fromCamraImage)

  }

  const chooseImageFromGallery = async () => {
    setModalVisible(false)
    const resultGallery = await launchImageLibrary({ mediaType: 'photo', quality: 0 });
    const selectedImgFromgallery = resultGallery?.assets[0]?.uri;
    setSelectedImage(selectedImgFromgallery)
    // console.log('chooseImg--', selectedImgFromgallery)
  }




  return (
    <SafeAreaView style={styles.container}>
      {loading ? (<Loader />) : <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Formik
            initialValues={{
              fullName: getProfileDetail?.name || '',
              email: getProfileDetail?.email || '',
              phoneNumber: getProfileDetail?.phone_number || '',
              selectedGender: getProfileDetail?.gender || "",
              birthday: formattedBirthdayDate,
              anniversarry: formattedAnniversarryDate,
              profileImage: selectedImage,
              // birthday: getProfileDetail?.birthday,
              // anniversarry: getProfileDetail?.anniversary,
            }}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
              <View style={{ marginHorizontal: 20, marginTop: '2%' }}>
                <View
                  style={{
                    width: 120,
                    height: 120,
                    alignSelf: 'center',
                    marginBottom: 20,
                  }}>
                  <Image
                    source={{ uri: Config.API_URL + getProfileDetail?.profile_image }}
                    // source={{ uri: selectedImage }}
                    // source={{uri:captureImage}}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 100,
                      borderWidth: 2,
                      borderColor: Colors.secondary,
                    }}
                  />
                  <Pressable style={styles.profileView} onPress={() => setModalVisible(true)}>
                    <FontAwesome name="camera" size={18} color={Colors.white} />
                  </Pressable>
                </View>
                <View style={styles.inputContainer}>
                  <Octicons
                    name="person"
                    size={18}
                    color="#DEA812"
                    style={styles.imageIcon}
                  />
                  <TextInput style={styles.input} placeholder="Enter full name"
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    value={values.fullName} />
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
                  <TextInput style={styles.input} placeholder="Phone Number"
                    maxLength={10}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                  />
                </View>
                {errors.phoneNumber && (
                  <Text style={styles.errors}>{errors.phoneNumber}</Text>
                )}

                <View style={styles.inputContainerGender}>
                  <FontAwesome
                    name="transgender-alt"
                    size={18}
                    color="#DEA812"
                    style={styles.imageIcon}
                  />
                  <Text style={styles.input} setSelectedGender={selectedGender}>
                    {selectedGender ? selectedGender.label : 'Select Gender'}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowDropdown(!showDropdown)}
                  >
                    <FontAwesome
                      name={showDropdown ? 'chevron-up' : 'chevron-down'}
                      size={12}
                      color="#DEA812"
                      style={styles.dropdownIcon}
                    />
                  </TouchableOpacity>
                </View>
                {showDropdown && (
                  <View style={styles.dropdownOptions}>
                    {genderOptions.map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        style={styles.dropdownOption}
                        onPress={() => {
                          setSelectedGender(option);
                          setShowDropdown(false);
                        }}
                      >
                        <Text style={styles.dropdownOptionText}>{option.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>)}

                <Text style={styles.profileTitle}>
                  Special Dates
                  <Text style={styles.profileOptTitle}> (Optional)</Text>
                </Text>

                <View style={styles.inputContainer}>
                  <FontAwesome
                    name="birthday-cake"
                    size={18}
                    color="#DEA812"
                    style={styles.imageIcon}
                  />
                  <TextInput style={styles.input} placeholder="Birthday"
                    onChangeText={handleChange('birhday')}
                    onBlur={handleBlur('birhday')}
                    value={getProfileDetail?.birthday || formattedBirthdayDate}
                    editable={false}
                  />
                  <FontAwesome
                    name="calendar"
                    size={15}
                    color="#DEA812"
                    style={styles.imageSideIcon}
                    onPress={() => setOpen(true)}
                  />
                  <DatePicker
                    mode="date"
                    modal
                    open={open}
                    date={birthdayDate}
                    onConfirm={(birthdayDate) => {
                      setOpen(false)
                      setBirthdayDate(birthdayDate)
                      setFieldValue('birhday',birthdayDate)
                    }}
                    onCancel={() => {
                      setOpen(false)
                    }}
                  />
                  <DatePicker
                    mode="date"
                    modal
                    open={openDateModal}
                    date={anniversarryDate}
                    onConfirm={(anniversarryDate) => {
                      setOpen(false)
                      setAnniversarryDate(anniversarryDate)
                      setFieldValue('anniversarry',anniversarryDate)
                    }}
                    onCancel={() => {
                      setOpenDateModal(false)
                    }}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons
                    name="candelabra-fire"
                    size={20}
                    color="#DEA812"
                    style={styles.imageIcon}
                  />
                  <TextInput style={styles.input} placeholder="Anniversary"
                    onChangeText={handleChange('anniversarry')}
                    onBlur={handleBlur('anniversarry')}
                    // value={anniversarryDate.toLocaleDateString()}
                    value={getProfileDetail?.anniversary || formattedAnniversarryDate}
                    editable={false}
                  />
                  <FontAwesome
                    name="calendar"
                    size={15}
                    color="#DEA812"
                    style={styles.imageSideIcon}
                    onPress={() => setOpenDateModal(true)}
                  />
                </View>

                <Button
                  onPress={handleSubmit}
                  loading={isLoading}
                  buttonColor={Colors.primary}
                  theme={{ roundness: 0 }}
                  style={styles.buttonStyless}
                  contentStyle={{ height: 50 }}
                  labelStyle={styles.buttonLabel}
                  uppercase={true}
                  mode={'contained'}>
                  Submit
                </Button>
              </View>
            )}
          </Formik>
        </View>

      </KeyboardAwareScrollView>}

      {/* gallery  */}



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
            <View style={{ flexDirection: 'row', }}>
              <View>
                <TouchableOpacity style={styles.modalCameraBtn} onPress={openCamera}>
                  <FontAwesome name="camera" size={20} color={Colors.primary} style={{ alignSelf: 'center', }} />
                </TouchableOpacity>
                <Text style={styles.cameraModalText}>Camera</Text>
              </View>


              <View >
                <TouchableOpacity style={[styles.modalCameraBtn, { left: '50%' }]} onPress={chooseImageFromGallery}>
                  <MaterialIcons name="perm-media" size={20} color={Colors.primary} style={{ alignSelf: 'center', }} />
                </TouchableOpacity>
                <Text style={[styles.cameraModalText, { left: 20 }]}>Choose from gallery</Text>
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
