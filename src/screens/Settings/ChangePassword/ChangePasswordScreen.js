import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

import {styles} from './ChangePasswordScreen.styles';

export const ChangePasswordScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{marginHorizontal: 20, marginTop: 20}}>
            <View style={styles.inputContainer}>
              <FontAwesome
                name="lock"
                size={18}
                color="#DEA812"
                style={styles.imageIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter Current Password"
              />
            </View>
            <Text style={styles.forgotText}>Forgot Your Password?</Text>

            <View style={styles.inputContainer}>
              <FontAwesome
                name="lock"
                size={18}
                color="#DEA812"
                style={styles.imageIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter New Password"
              />
            </View>
            <View style={[styles.inputContainer, {marginVertical: 0}]}>
              <FontAwesome
                name="lock"
                size={18}
                color="#DEA812"
                style={styles.imageIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
              />
            </View>

            <TouchableOpacity style={styles.btnView}>
              <Text style={styles.textSignIn}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
