import React from 'react';
import { SafeAreaView, View, Text, ScrollView, Pressable, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './CustomerSupportScreen.styles';
import { Colors } from '../../../utils/Colors';
import { useGetProfileData } from '../../../hooks';

export const CustomerSupportScreen = ({ navigation }) => {
  const {profileData, loading} = useGetProfileData();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ marginHorizontal: 20 }}>
            <Text
              style={styles.title}
              onPress={() => navigation.navigate('CustomerFeedback')}>
              Hey {profileData?.fullName.split(' ')[0]}, How can we help you.
            </Text>
          </View>

          <View style={{ marginHorizontal: 10, padding: 10 }}>
            <View style={styles.mainView}>
              <Pressable style={styles.innerView}
                onPress={() => { Linking.openURL('tel:1234567890'); }}
              >
                <Ionicons name="call" size={20} color={Colors.primary} />
                <Text style={styles.customerText}>
                  Talk to a Customer Support Executive
                </Text>
              </Pressable>
              <View style={styles.horizontalLine} />
              <Pressable
                style={{
                  flexDirection: 'row',
                  marginTop: '5%',
                  marginLeft: '5%',
                }} onPress={() => { Linking.openURL('whatsapp://send?phone=1234567890') }}>
                <Ionicons
                  name="logo-whatsapp"
                  size={20}
                  color={Colors.primary}
                />
                <Text style={styles.customerText}>
                  Chat to a Customer Support Executive
                </Text>
              </Pressable>
              <View style={styles.horizontalLine} />
              <Pressable
                style={{
                  flexDirection: 'row',
                  marginTop: '5%',
                  marginLeft: '5%',
                }} onPress={() => {
                  Linking.openURL('mailto:support@gmail.com');
                }}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color={Colors.primary}
                />
                <Text style={styles.customerText}>Raise a Complaint</Text>
              </Pressable>
              <View style={{ marginBottom: 10 }} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
