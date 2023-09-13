import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { styles } from './ProfileScreen.styles';
import { images } from '../../utils/Images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors } from '../../utils/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../store/user/userSlice';
import { useGetProfileData } from '../../hooks/useGetProfileData';


export const ProfileScreen = ({ navigation }) => {
  const getData = useGetProfileData();
  console.log('ugetData', getData);
  const dispatch = useDispatch();
  const user_Id = useSelector((state) => state?.auth?.userId);
  

  const [selectedGender, setSelectedGender] = useState();
  const [showDropdown, setShowDropdown] = useState();
  const [birthdayDate, setBirthdayDate] = useState(new Date());
  const [open, setOpen] = useState(false)
  const stringBirthdayDate = birthdayDate;
  const date = new Date(stringBirthdayDate);
  const formattedBirthdayDate = date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
  // console.log('birthday', formattedBirthdayDate)


  const [anniversarryDate, setAnniversarryDate] = useState(new Date());
  const [openDateModal, setOpenDateModal] = useState(false);
  const stringAnniversarryDate = anniversarryDate;
  const anniversarrydate = new Date(stringAnniversarryDate);
  const formattedAnniversarryDate = anniversarrydate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
  // console.log('anniversary', formattedAnniversarryDate)


  useEffect(() => {
    console.log('id----', user_Id)
    dispatch(getUserProfile(user_Id))
  }, [])

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required*'),
    email: Yup.string().email('Invalid email address').required('Email is required*'),
    phoneNumber: Yup.string().required('Phone number is required*'),
  });

  const handleSubmit = (values) => {
    console.log('sss', values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Formik
            initialValues={{
              fullName: '',
              email: '',
              phoneNumber: '',
              selectedGender: selectedGender,
              birthday: formattedBirthdayDate,
              anniversarry: formattedAnniversarryDate,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View style={{ marginHorizontal: 20, marginTop: '2%' }}>
                <View
                  style={{
                    width: 120,
                    height: 120,
                    alignSelf: 'center',
                    marginBottom: 20,
                  }}>
                  <Image
                    source={images.profile}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 100,
                      borderWidth: 2,
                      borderColor: Colors.secondary,
                    }}
                  />
                  <Pressable style={styles.profileView}>
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
                    value={formattedBirthdayDate}
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
                    value={formattedAnniversarryDate}
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

                <TouchableOpacity
                  style={styles.btnView}
                  onPress={handleSubmit}>
                  <Text style={styles.textSignIn}>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
