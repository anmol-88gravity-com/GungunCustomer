import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';

import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './CustomerFeedbackScreen.styles';
import { images } from '../../../utils/Images';
import Header from '../../../components/header/Header';





const CustomerFeedback = () => {
    const [phone, setPhone] = useState('');
    const navigation = useNavigation();

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            image: images.choleBhatoore,
            title: 'Chole Bhatoore',
            subTitle: 'Prem Di Hatti'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            image: images.momos,
            title: 'Momos',
            subTitle: 'dolma Aunty Momo`s'
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            image: images.kadaiPaneer,
            title: 'kadai Paneer',
            subTitle: 'Prem Di Hatti'
        },
    ];

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.mainView} onPress={() => navigation.navigate('FeedbackForm')}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.subtitle, { marginTop: 0 }]}>Order Id: 14512</Text>
                    <Text style={[styles.subtitle, { marginTop: 0 }]}>30-07-2023</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: '5%', }}>
                    <View style={styles.imgView}>
                        <View style={{ height: 80, width: 80, }}>
                            <Image source={item.image} style={{ height: '100%', width: '100%', }} />
                        </View>
                    </View>
                    <View style={{ flex: 3, alignSelf: 'center', left: '10%' }}>
                        <Text style={[styles.title, { marginVertical: 0 }]}>{item.title}</Text>
                        <Text style={[styles.subtitle]}>{item.subTitle}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <Header headerTitle={"Customer Feedback"} />
                <View style={styles.container}>
                    <View style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title} >Good Afternoon, Vishnu</Text>
                        <Text style={[styles.title, { color: '#005C79' }]}>View More</Text>
                    </View>
                    <View style={styles.searchView}>
                        <AntDesign name="search1" size={20} color="#aaaaaa" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Search here"
                            placeholderTextColor="#aaaaaa"

                        />
                        <MaterialCommunityIcons name="tune-vertical" size={20} color="#005C79" style={styles.sideIcon} />

                    </View>
                    <View style={{ marginHorizontal: 10, padding: 10, }}>
                        <Text style={[styles.title, { marginVertical: '5%' }]} >Choose For Feedbacking - Recent Order</Text>
                        <FlatList
                            data={DATA}
                            renderItem={renderItem}
                        // keyExtractor={item => item.id}
                        />

                    </View>

                    <View style={{ marginHorizontal: 20 }}>
                        <TouchableOpacity style={styles.btnView} onPress={() => navigation.navigate('FeedbackForm')}>
                            <Text style={styles.textSignIn}>Talk To A Help Executive</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 30 }}></View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default CustomerFeedback;