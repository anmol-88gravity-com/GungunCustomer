import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { styles } from './ResetPasswordScreen.styles';




const ConfrimPass = () => {
    const [phone, setPhone] = useState('');
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={{ marginHorizontal: 20, }}>
                    <Ionicons name="arrow-back" size={20} onPress={() => navigation.goBack()} color='#000000' style={styles.icon} />
                    <Text style={styles.title}>Reset Password</Text>

                    <View style={styles.inputContainer}>
                        <FontAwesome name="lock" size={20} color="#DEA812" />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter New Password"
                            // secureTextEntry={true}
                        />

                    </View>
                    <View style={styles.inputContainer}>
                        <FontAwesome name="lock" size={20} color="#DEA812" />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm New Password"
                            // secureTextEntry={true}
                        />

                    </View>

                    <TouchableOpacity style={styles.btnView} onPress={()=>navigation.navigate('Profile')}>
                        <Text style={styles.textSignIn}>Submit</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    )
}
export default ConfrimPass;