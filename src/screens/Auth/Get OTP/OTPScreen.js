import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../../utils/Images';

import { styles } from './OTPScreen.styles';



const OTPScreen = () => {
    const [code, setCode] = useState('');
    const [phone, setPhone] = useState('');
    const navigation = useNavigation();

    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);
    const inputRef5 = useRef(null);


    const handleCodeChange = (value, inputRef) => {
        setCode(value);
        if (value.length === 1) {
            inputRef.current.focus();
        }
    };

    const borderBottom = Platform.OS === 'ios'
        ? { borderBottomColor: code.length > 0 ? '#000' : '#ccc', borderBottomWidth: 2 }
        : { borderBottomColor: code.length > 0 ? '#000' : '#ccc', borderWidth: 0, borderBottomWidth: 2 };






    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, }}>
                <ImageBackground
                    source={images.backgroundImg}
                    style={styles.backgroundImage}>
                    <View style={styles.overlay}>
                        <Text style={styles.text}
                        >Hello, Customer!</Text>
                        <Text style={styles.subTitle}>Please Enter OTP</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.loginView}>
                <ScrollView>
                    <View style={{ marginHorizontal: 20 }}>
                        <View style={{ marginTop: "15%" }}>
                            <Text style={styles.headingText}>Verify OTP to Continue</Text>
                        </View>

                        <View style={styles.inputTextField}>
                            <TextInput
                                style={[styles.inputText, borderBottom]}
                                maxLength={1}
                                keyboardType="numeric"
                                placeholder='.'
                                value={code[0]}
                                onChangeText={(value) => handleCodeChange(value, inputRef2)}
                                ref={inputRef1}
                            />
                            <TextInput
                                style={[styles.inputText, borderBottom]}
                                maxLength={1}
                                keyboardType="numeric"
                                placeholder='.'
                                value={code[1]}
                                onChangeText={(value) => handleCodeChange(value, inputRef3)}
                                ref={inputRef2}
                            />
                            <TextInput
                                style={[styles.inputText, borderBottom]}
                                maxLength={1}
                                keyboardType="numeric"
                                placeholder='.'
                                value={code[2]}
                                onChangeText={(value) => handleCodeChange(value, inputRef4)}
                                ref={inputRef3}
                            />
                            <TextInput
                                style={[styles.inputText, borderBottom]}
                                maxLength={1}
                                keyboardType="numeric"
                                placeholder='.'
                                value={code[3]}
                                onChangeText={(value) => handleCodeChange(value, inputRef5)}
                                ref={inputRef4}
                            />

                        </View>

                        <TouchableOpacity style={styles.btnView} >
                            <Text style={styles.textSignIn}>Verify</Text>
                        </TouchableOpacity>

                        <View style={{ marginTop: '5%' }}>
                            <Text style={styles.verifyOTPText}>Didn't Received the OTP?</Text>
                            <Text style={styles.btnResend} onPress={() => navigation.navigate('ConfirmPassword')}>Resend</Text>
                        </View>

                    </View>
                </ScrollView>

            </View>

        </SafeAreaView>

    )
}
export default OTPScreen;