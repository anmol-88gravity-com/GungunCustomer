import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';

import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './AccountManagementScreen.styles';
import { images } from '../../../utils/Images';
import UserAddressHeader from '../../../components/header/UserAddressHeader';



const AccountManagement = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <UserAddressHeader headerTitle={"Karawal Nagar"} />
                <View style={styles.container}>
                    <View style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title} >Recent Address and Delivery</Text>
                        <Text style={[styles.title, { color: '#005C79' }]}>View More</Text>
                    </View>

                    <View style={{ marginHorizontal: 20, marginTop: '5%' }}>
                        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 10 }}>
                            <Text style={[styles.title, { color: '#005C79', marginHorizontal: 20 }]}>Home</Text>
                            <Text style={[styles.address, { marginHorizontal: 20 }]}>A38 Gali No 2 Harijan Basti Patel Vihar Karawal Nagar,Patel Vihar, New Delhi, Delhi-110094 </Text>
                            <View style={styles.horizontalLine}></View>
                            <Text style={[styles.title, { marginHorizontal: 20 }]}>Recent Delivery</Text>
                            <View style={[styles.horizontalLine, { marginTop: 0, marginHorizontal: 20, width: '90%' }]}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                                <Text style={styles.subtitle}>Prem Di Hatti</Text>
                                <Text style={styles.subtitle}>29-07-2023</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: '5%' }}>
                                <View style={styles.imgView}>
                                    <View style={{ height: 80, width: 80, }}>
                                        <Image source={images.choleBhatoore} style={{ height: '100%', width: '100%', }} />
                                    </View>
                                </View>
                                <View style={{ flex: 3, alignSelf: 'center', left: '10%' }}>
                                    <Text style={[styles.title, { marginVertical: 0 }]}>Chole Bhatoore</Text>
                                    <Text style={[styles.subtitle]}>Qunatity:  2</Text>
                                    <Text style={[styles.subtitle]}>Price:  180*2 = 360</Text>

                                </View>
                            </View>
                            <View style={{ marginBottom: 20 }}></View>






                        </View>



                    </View>

                    {/* //Office */}


                    <View style={{ marginHorizontal: 20, marginTop: '5%' }}>
                        <View style={styles.mainDetailView}>
                            <Text style={[styles.title, { color: '#005C79', marginHorizontal: 20 }]}>Office</Text>
                            <Text style={[styles.address, { marginHorizontal: 20 }]}>A38 Gali No 2 Harijan Basti Patel Vihar Karawal Nagar,Patel Vihar, New Delhi, Delhi-110094 </Text>
                            <View style={styles.horizontalLine}></View>
                            <Text style={[styles.title, { marginHorizontal: 20 }]}>Recent Delivery</Text>
                            <View style={[styles.horizontalLine, { marginTop: 0, marginHorizontal: 20, width: '90%' }]}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                                <Text style={styles.subtitle}>The Bill's Hut</Text>
                                <Text style={styles.subtitle}>29-07-2023</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: '5%' }}>
                                <View style={styles.imgView}>
                                    <View style={{ height: 80, width: 80, }}>
                                        <Image source={images.kadaiPaneer} style={{ height: '100%', width: '100%', }} />
                                    </View>
                                </View>
                                <View style={{ flex: 3, alignSelf: 'center', left: '10%' }}>
                                    <Text style={[styles.title, { marginVertical: 0 }]}>Mix Sauce Paasta</Text>
                                    <Text style={[styles.subtitle]}>Qunatity:  4</Text>
                                    <Text style={[styles.subtitle]}>Price:  180*4 = 720</Text>

                                </View>
                            </View>
                            <View style={{ marginBottom: 20 }}></View>
                        </View>
                    </View>


                    <View style={{ marginHorizontal: 20 }}>
                        <View style={styles.cardTypes}>
                            <View style={styles.differentView}>
                                <AntDesign name="hearto" size={20} style={styles.iconType} />
                                <Text style={styles.difftitleText}>Likes</Text>
                            </View>

                            <View style={[styles.differentView, { marginLeft: '2%' }]}>
                                <MaterialIcons name="payment" size={20} style={styles.iconType} />
                                <Text style={styles.difftitleText}>Payments and Cupons</Text>
                            </View>

                            <View style={[styles.differentView, { marginLeft: '2%' }]}>
                                <Ionicons name="newspaper-outline" size={20} style={styles.iconType} />
                                <Text style={styles.difftitleText}>Order History</Text>
                            </View>

                        </View>
                    </View>

                    <View style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }} >
                        <Text style={styles.title} >Account Setting</Text>
                    </View>


                    <View style={{ marginHorizontal: 10, padding: 10 }}>
                        <View style={styles.mainView}>
                            <View style={styles.innerView}>
                                <AntDesign name="user" size={20} color='#000000' />
                                <Text style={styles.customerText}>User Profile</Text>
                            </View>
                            <View style={styles.horizontalLine}></View>
                            <View style={{ flexDirection: 'row', marginTop: '5%', marginLeft: '5%' }}>
                                <AntDesign name="Safety" size={20} color='#000000' />
                                <Text style={styles.customerText}>Change Password</Text>
                            </View>
                            <View style={styles.horizontalLine}></View>
                            <View style={{ flexDirection: 'row', marginTop: '5%', marginLeft: '5%' }}>
                                <AntDesign name="wallet" size={20} color='#000000' />
                                <Text style={styles.customerText}>User Wallet</Text>

                            </View>
                            <View style={styles.horizontalLine}></View>
                            <TouchableOpacity style={{ flexDirection: 'row', marginTop: '5%', marginLeft: '5%' }} onPress={() => navigation.navigate('Customer Feedback')}>
                                <AntDesign name="wechat" size={20} color='#000000' />
                                <Text style={styles.customerText}>Send Feedbacks</Text>

                            </TouchableOpacity>
                            <View style={styles.horizontalLine}></View>
                            <TouchableOpacity style={{ flexDirection: 'row', marginTop: '5%', marginLeft: '5%' }} onPress={() => navigation.navigate('CustomerSupport')}>
                                <AntDesign name="customerservice" size={20} color='#000000' />
                                <Text style={styles.customerText}>Customer Support </Text>

                            </TouchableOpacity>
                            <View style={styles.horizontalLine}></View>
                            <View style={{ flexDirection: 'row', marginTop: '5%', marginLeft: '5%' }}>
                                <AntDesign name="questioncircleo" size={20} color='#000000' />
                                <Text style={styles.customerText}>FAQ</Text>

                            </View>
                            <View style={{ marginBottom: 10 }}></View>


                        </View>
                    </View>

                    <View style={{ marginBottom: 30 }}></View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default AccountManagement;