import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from './AccountManagementScreen.styles';
import { Colors } from '../../../utils/Colors';
import { FONT_SIZES } from '../../../utils/FontSize';
import { Font_Family } from '../../../utils/Fontfamily';
import BaseConfig from '../../../config';

const RowItem = ({ onPressHandler, heading, icon }) => {
  return (
    <TouchableOpacity style={styles.rowStyles} onPress={onPressHandler}>
      {icon}
      <Text style={styles.customerText}>{heading}</Text>
    </TouchableOpacity>
  );
};

export const AccountManagement = ({ navigation }) => {

  const onPressHandler = async () =>
  Alert.alert('Wait!', 'Are you sure you want to delete the app ?', [
    {text: 'YES', 
    // onPress: () => logoutHandler()
  },
    {text: 'NO'},
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text style={styles.title}>Account Settings</Text>
          </View>

          <View style={{ padding: 10 }}>
            <View style={styles.mainView}>
              <RowItem
                heading={'Change Password'}
                onPressHandler={() => navigation.navigate('ChangePassword')}
                icon={
                  <Ionicons
                    name="lock-closed"
                    size={20}
                    color={Colors.primary}
                  />
                }
              />
              <RowItem
                heading={'Notification'}
                onPressHandler={() => navigation.navigate('Notification')}
                icon={
                  <MaterialCommunityIcons
                    name="bell-badge-outline"
                    size={20}
                    color={Colors.primary}
                  />
                }
              />
              <RowItem
                heading={'Customer Feedback'}
                onPressHandler={() => navigation.navigate('CustomerFeedback')}
                icon={
                  <MaterialIcons
                    name="feedback"
                    size={20}
                    color={Colors.primary}
                  />
                }
              />
              <RowItem
                heading={'Customer Support'}
                onPressHandler={() => navigation.navigate('CustomerSupport')}
                icon={
                  <MaterialIcons
                    name="headset-mic"
                    size={20}
                    color={Colors.primary}
                  />
                }
              />
              <RowItem
                heading={'FAQ'}
                onPressHandler={()=>Linking.openURL(BaseConfig?.faqUrl)}
                icon={
                  <AntDesign
                    name="questioncircle"
                    size={20}
                    color={Colors.primary}
                  />
                }
              />
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text style={styles.title}>More</Text>
          </View>

          <View style={{ padding: 10 }}>
            <View style={styles.mainView}>
              <RowItem
                heading={'About Us'}
                onPressHandler={()=>Linking.openURL(BaseConfig?.aboutUsUrl)}
                icon={
                  <Ionicons
                    name="information-circle-sharp"
                    size={20}
                    color={Colors.primary}
                  />
                }
              />
              <RowItem
                heading={'Terms and Conditons'}
                onPressHandler={()=>Linking.openURL(BaseConfig?.termsAndConditionsUrl)}
                icon={
                  <Ionicons
                    name="document-text"
                    size={20}
                    color={Colors.primary}
                  />
                }
              />
              <RowItem
                heading={'Privacy Policy'}
                onPressHandler={()=>Linking.openURL(BaseConfig?.privacyPolicyUrl)}
                icon={
                  <Ionicons
                    name="shield-checkmark-sharp"
                    size={20}
                    color={Colors.primary}
                  />
                }
              />
            </View>
          </View>
          
          <View
            style={{
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: FONT_SIZES.fifteen,
                fontFamily: Font_Family.semiBold,
                color: Colors.red,
              }}>
              ⚠️ Dangerous Area
            </Text>
          </View>
          <View style={{ padding: 10 }}>
            <View style={styles.mainView}>
              <RowItem
                heading={'Delete Account'}
                onPressHandler={onPressHandler}
                icon={
                  <MaterialIcons name="delete" size={20} color={Colors.red} />
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
