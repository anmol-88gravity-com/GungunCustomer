import React, {useState} from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';

import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {styles} from './CustomerSupportScreen.styles';
import Header from '../../../components/header/Header';

export const CustomerSupportScreen = ({navigation}) => {
  const [phone, setPhone] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Header headerTitle={'CustomerSupport'} />
      <ScrollView>
        <View style={styles.container}>
          <View style={{marginHorizontal: 20}}>
            {/* <Ionicons name="arrow-back" size={20} onPress={() => navigation.goBack()} color='#000000' style={styles.icon} /> */}
            <Text
              style={styles.title}
              onPress={() => navigation.navigate('CustomerFeedback')}>
              Hey Vishnu, How can we help you.
            </Text>
          </View>

          <View style={{marginHorizontal: 10, padding: 10}}>
            <View style={styles.mainView}>
              <View style={styles.innerView}>
                <AntDesign name="customerservice" size={20} color="#000000" />
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
                <AntDesign name="wechat" size={20} color="#000000" />
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
                <AntDesign name="customerservice" size={20} color="#000000" />
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
