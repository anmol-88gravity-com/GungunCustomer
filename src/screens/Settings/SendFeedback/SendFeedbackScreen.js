import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { styles } from '../CustomerFeedback/CustomerFeedbackScreen.styles';
import Header from '../../../components/header/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Colors } from '../../../utils/Colors';
import { images } from '../../../utils/Images';

export const SendFeedbackScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/*<Header headerTitle={'Customer Feedback'} />*/}
        <View style={styles.container}>
          <View style={styles.mainfeedbackForm}>
            <View style={styles.feedbackForm}>
              <Text style={[styles.title, { marginVertical: 0 }]}>
                Order ID: 14512
              </Text>
              <Text style={[styles.subtitle, { marginTop: 10 }]}>
                Chole Bhatoore from Prem Di Hatti
              </Text>
              <Text style={[styles.subtitle]}>
                Hey, Vishnu please share your valuable Feedbacks....
              </Text>
              <View style={styles.txtForm}>
                <TextInput
                  placeholder="Enter Text"
                  style={{ padding: 10 }}
                  multiline={true}
                />
              </View>

              <View style={styles.chooseImage}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                  <MaterialCommunityIcons name="file-upload" size={20} color={Colors.primary} />
                  <Text style={[styles.title, { marginTop: 0, textAlign: 'center' }]}>Upload</Text>
                </View>
              </View>

              <View style={{ marginTop: '5%', borderWidth: 1, borderColor: '#ccc', borderRadius: 10, width: '100%', padding: 10 }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Image source={images.bannerImg} style={{ height: 60, width: 50 }} />
                  <Image source={images.bannerImg} style={{ height: 60, width: 50, marginLeft: '3%' }} />




                </View>

              </View>

              <TouchableOpacity
                style={styles.btnfeedback}
                onPress={() => navigation.navigate('Home')}>
                <Text style={styles.textfeedback}>Send Feedback</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
