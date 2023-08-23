import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { useNavigation } from '@react-navigation/native';
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
    const inputRef6 = useRef(null);

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
            <View style={styles.container}>
                <View style={{ marginHorizontal: 20, }}>
                    <Ionicons name="arrow-back" size={20} onPress={() => navigation.goBack()} color='#000000' style={styles.icon} />
                    <Text style={styles.title}>Verify OTP to Continue</Text>
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
                        <TextInput
                            style={[styles.inputText, borderBottom]}
                            maxLength={1}
                            keyboardType="numeric"
                            placeholder='.'
                            value={code[4]}
                            onChangeText={(value) => handleCodeChange(value, inputRef6)}
                            ref={inputRef5}
                        />
                        <TextInput
                            style={[styles.inputText, borderBottom]}
                            maxLength={1}
                            placeholder='.'
                            keyboardType="numeric"
                            value={code[5]}
                            onChangeText={(value) => handleCodeChange(value, inputRef6)}
                            ref={inputRef6}
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
            </View>
        </SafeAreaView>
    )
}
export default OTPScreen;





