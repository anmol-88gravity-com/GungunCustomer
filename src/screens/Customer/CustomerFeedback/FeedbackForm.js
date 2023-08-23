import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './CustomerFeedbackScreen.styles';
import Header from '../../../components/header/Header';





const FeedbackForm = () => {
    const [phone, setPhone] = useState('');
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <Header headerTitle={"Customer Feedback"} />
                <View style={styles.container}>
                    <View style={styles.mainfeedbackForm}>
                        <View style={styles.feedbackForm}>
                            <Text style={[styles.title, { marginVertical: 0 }]}>Order ID: 14512</Text>
                            <Text style={[styles.subtitle, { marginTop: 10 }]}>Chole Bhatoore from Prem Di Hatti</Text>
                            <Text style={[styles.subtitle]}>Hey, Vishnu please share your valuable Feedbacks....</Text>
                            <View style={styles.txtForm}>
                                <TextInput placeholder='Enter Text' style={{ padding: 10 }} multiline={true} />
                            </View>

                            <TouchableOpacity style={styles.btnfeedback} onPress={() => navigation.navigate('Home')}>
                                <Text style={styles.textfeedback}>Send Feedback</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default FeedbackForm;