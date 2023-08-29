import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {styles} from './AccountManagementScreen.styles';
import {Colors} from '../../../utils/Colors';
import {FONT_SIZES} from '../../../utils/FontSize';
import {Font_Family} from '../../../utils/Fontfamily';

const RowItem = ({onPressHandler, heading, icon}) => {
  return (
    <TouchableOpacity style={styles.rowStyles} onPress={onPressHandler}>
      {icon}
      <Text style={styles.customerText}>{heading}</Text>
    </TouchableOpacity>
  );
};

export const AccountManagement = ({navigation}) => {
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

          <View style={{padding: 10}}>
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
                heading={'Your Transactions'}
                onPressHandler={() => {}}
                icon={
                  <MaterialCommunityIcons
                    name="progress-clock"
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
                onPressHandler={() => {}}
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
          <View style={{padding: 10}}>
            <View style={styles.mainView}>
              <RowItem
                heading={'About Us'}
                onPressHandler={() => {}}
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
                onPressHandler={() => {}}
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
                onPressHandler={() => {}}
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
          <View style={{padding: 10}}>
            <View style={styles.mainView}>
              <RowItem
                heading={'Delete Account'}
                onPressHandler={() => {}}
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
