import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ImageBackground,ScrollView } from 'react-native';
import { styles } from './ResetPasswordScreen.styles';
import Feather from 'react-native-vector-icons/dist/Feather';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { Formik } from 'formik';
import { images } from '../../../utils/Images';
import * as Yup from 'yup';



const ResetPassword = () => {
    const [phone, setPhone] = useState('');


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, }}>
                <ImageBackground
                    source={images.backgroundImg}
                    style={styles.backgroundImage}>
                    <View style={styles.overlay}>
                        <Text style={styles.text}
                        >Hello, Customer!</Text>
                        <Text style={styles.subTitle}>Please Reset your Password</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.loginView}>
            <ScrollView>
                <View style={{ marginHorizontal: 20 }}>
                    <View style={{ marginTop: "15%" }}>
                        <Text style={styles.headingText}>Reset Password</Text>
                    </View>
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
                </ScrollView>
            </View>

        </SafeAreaView>

    )
}
export default ResetPassword;