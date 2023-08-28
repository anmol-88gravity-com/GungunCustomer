import React from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {styles} from './CustomerSupportScreen.styles';
import {Colors} from '../../../utils/Colors';

export const CustomerSupportScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{marginHorizontal: 20}}>
            <Text
              style={styles.title}
              onPress={() => navigation.navigate('CustomerFeedback')}>
              Hey Vishnu, How can we help you.
            </Text>
          </View>

          <View style={{marginHorizontal: 10, padding: 10}}>
            <View style={styles.mainView}>
              <View style={styles.innerView}>
                <Ionicons name="call" size={20} color={Colors.primary} />
                <Text style={styles.customerText}>
                  Talk to a Customer Support Executive
                </Text>
              </View>
              <View style={styles.horizontalLine} />
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: '5%',
                  marginLeft: '5%',
                }}>
                <Ionicons
                  name="logo-whatsapp"
                  size={20}
                  color={Colors.primary}
                />
                <Text style={styles.customerText}>
                  Chat to a Customer Support Executive
                </Text>
              </View>
              <View style={styles.horizontalLine} />
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: '5%',
                  marginLeft: '5%',
                }}>
                <MaterialCommunityIcons
                  name="message-alert"
                  size={20}
                  color={Colors.primary}
                />
                <Text style={styles.customerText}>Raise a Complaint</Text>
              </View>
              <View style={{marginBottom: 10}} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
