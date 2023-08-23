import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './ProfileScreen.styles';
import { images } from '../../utils/Images';
import Header from '../../components/header/Header';






const Profile = () => {
    const [phone, setPhone] = useState('');
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Header headerTitle={"Profile"} />
                <View style={styles.container}>
                    <View style={{ marginHorizontal: 20, marginTop:'2%'}}>
                        {/* <Ionicons name="arrow-back" size={20} onPress={() => navigation.goBack()} color='#000000' style={styles.icon} /> */}
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={images.profile} />
                            <View style={styles.profileView}>
                                <FontAwesome name="edit" size={12} color="#FFFFFF" style={{ justifyContent: 'center', alignSelf: 'center', margin: '20%' }} />
                            </View>
                            <Text style={styles.changeImgText}>Change Image</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Octicons name="person" size={18} color="#DEA812" />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter full name"
                            />

                        </View>
                        <View style={styles.inputContainer}>
                            <Entypo name="email" size={18} color="#DEA812" />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Email Address"
                            />

                        </View>
                        <View style={styles.inputContainer}>
                            <FontAwesome name="mobile-phone" size={20} color="#DEA812" />
                            <TextInput
                                style={styles.input}
                                placeholder="Phone Number"
                            />

                        </View>
                        <View style={styles.inputContainer}>
                            <FontAwesome name="transgender-alt" size={18} color="#DEA812" />
                            <TextInput
                                style={styles.input}
                                placeholder="Gender"
                            />

                        </View>
                        <Text style={styles.profileTitle}>Special Dates<Text style={styles.profileOptTitle}>(Optionals)</Text></Text>

                        <View style={styles.inputContainer}>
                            <FontAwesome name="birthday-cake" size={18} color="#DEA812" />
                            <TextInput
                                style={styles.input}
                                placeholder="Birthday"
                            />
                        </View>


                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons name="candelabra-fire" size={20} color="#DEA812" />
                            <TextInput
                                style={styles.input}
                                placeholder="Anniversary"
                            />

                        </View>

                        <TouchableOpacity style={styles.btnView} onPress={()=>navigation.navigate('CustomerSupport')}>
                            <Text style={styles.textSignIn}>Submit</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Profile;