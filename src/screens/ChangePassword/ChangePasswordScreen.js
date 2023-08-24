import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';


import { styles } from './ChangePasswordScreen.styles';



const ChangePassword = () => {
    const [phone, setPhone] = useState('');
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            {/* <Header headerTitle={"CustomerSupport"}/> */}
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ marginHorizontal: 20,marginTop:'10%' }}>
                        <Ionicons name="arrow-back" size={20} onPress={() => navigation.goBack()} color='#000000' style={styles.icon} />
                        <Text style={styles.title} onPress={() => navigation.navigate('CustomerFeedback')}>Reset Password</Text>
                    </View>

                    <View style={{ marginHorizontal: 20, }}>

                        <View style={styles.inputContainer}>
                            <FontAwesome name="lock" size={18} color="#DEA812" style={styles.imageIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Current Password"
                                keyboardType="phone-pad"

                            />
                        </View>
                        <Text style={styles.forgotText} >Forgot Your Password?</Text>

                        <View style={styles.inputContainer}>
                            <FontAwesome name="lock" size={18} color="#DEA812" style={styles.imageIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter New Password"
                                keyboardType="phone-pad"

                            />
                        </View>
                        <View style={[styles.inputContainer, { marginVertical: 0, }]}>
                            <FontAwesome name="lock" size={18} color="#DEA812" style={styles.imageIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm New Password"
                                keyboardType="phone-pad"

                            />
                        </View>

                        <TouchableOpacity style={styles.btnView} >
                            <Text style={styles.textSignIn}>Submit</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default ChangePassword;