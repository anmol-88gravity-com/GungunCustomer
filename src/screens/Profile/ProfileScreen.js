import React, { useState } from 'react';
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

import { styles } from './ProfileScreen.styles';
import { images } from '../../utils/Images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors } from '../../utils/Colors';


export const ProfileScreen = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [showDropdown, setShowDropdown] = useState();

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
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
              <TextInput style={styles.input} placeholder="Enter full name" />
            </View>
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
              />
            </View>
            <View style={styles.inputContainer}>
              <Feather
                name="smartphone"
                size={18}
                color="#DEA812"
                style={styles.imageIcon}
              />
              <TextInput style={styles.input} placeholder="Phone Number" />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome
                name="transgender-alt"
                size={18}
                color="#DEA812"
                style={styles.imageIcon}
              />
              <Text style={styles.input}>
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
              <TextInput style={styles.input} placeholder="Birthday" />
            </View>

            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="candelabra-fire"
                size={20}
                color="#DEA812"
                style={styles.imageIcon}
              />
              <TextInput style={styles.input} placeholder="Anniversary" />
            </View>

            <TouchableOpacity
              style={styles.btnView}
              onPress={() => navigation.navigate('CustomerSupport')}>
              <Text style={styles.textSignIn}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
