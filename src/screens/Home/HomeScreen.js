import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TextInput, TouchableOpacity, Image, FlatList, Platform, Modal, ImageBackground } from 'react-native';
import { styles } from './HomeScreen.styles';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import { images } from '../../utils/Images';
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '../../components/header/ScreenHeader';
import { Colors } from '../../utils/Colors';
import { Font_Family } from '../../utils/Fontfamily';
import { FONT_SIZES } from '../../utils/FontSize';


const Home = () => {
    const navigation = useNavigation();
    const [selectedTab, setSelectedTab] = useState('All');
    const [isModalVisible, setIsModalVisible] = useState(false);


    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };


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


    const popularRenderitem = ({ item }) => {
        return (
            <View style={styles.popularitems}>
                <View style={styles.imgView}>
                    <Image source={item.image} style={{ height: '100%', width: '100%' }} />
                </View>
                <Text style={styles.Itemtitle}>Chole {"\n"}Bhatoore</Text>
                <Text style={styles.subItemtitle}>Prem Di hatti</Text>
                <Text style={styles.pricetitle}>₹ 249</Text>
            </View>
        )
    }

    const data = [1, 2, 3, 4, 5];

    const renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons
                    name={'star-outline'}
                    size={20}
                    color={Colors.black}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScreenHeader
                headerTitle={"Let's Find \nFood Near You"}
            />
            <View style={[styles.container]}>
                <TouchableOpacity style={styles.searchView} onPress={()=>navigation.navigate('Search')}>
                    <AntDesign name="search1" size={20} color="#aaaaaa" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search here"
                        placeholderTextColor="#aaaaaa"
                        editable={false}

                    />
                     </TouchableOpacity>

                <View style={styles.btnItems}>
                    <TouchableOpacity
                        style={selectedTab === 'All' ? styles.selectedButton : styles.button}
                        onPress={() => setSelectedTab('All')}>
                        <Text style={selectedTab === 'All' ? styles.selectedText : styles.text}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={selectedTab === 'Grocery' ? styles.selectedButton : styles.button}
                        onPress={() => setSelectedTab('Grocery')}>
                        <Text style={selectedTab === 'Grocery' ? styles.selectedText : styles.text}>Grocery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={selectedTab === 'Pet Food' ? styles.selectedButton : styles.button}
                        onPress={() => setSelectedTab('Pet Food')}>
                        <Text style={selectedTab === 'Pet Food' ? styles.selectedText : styles.text}>Pet Food</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={selectedTab === 'Pan' ? styles.selectedButton : styles.button}
                        onPress={() => setSelectedTab('Pan')}>
                        <Text style={selectedTab === 'Pan' ? styles.selectedText : styles.text}>Pan</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginHorizontal: 10, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={styles.title} >Popular Items</Text>
                        <Text style={[styles.title, { color: '#005C79' }]}>View More</Text>
                    </View>
                </View>


                <View style={{ marginTop: '5%' }}>
                    <TouchableOpacity style={styles.popularitems}
                        // onPress={() => navigation.navigate('AccountManagement')}
                        onPress={() => toggleModal()}
                    >
                        <View style={styles.imgView}>
                            <Image source={images.kadaiPaneer} style={{ height: '100%', width: '100%' }} />
                        </View>
                        <Text style={styles.Itemtitle}>Chole {"\n"}Bhatoore</Text>
                        <Text style={styles.subItemtitle}>Prem Di hatti</Text>
                        <Text style={styles.pricetitle}>₹ 249</Text>
                    </TouchableOpacity>
                    {/* <FlatList
                        data={DATA}
                        renderItem={popularRenderitem} 
                        // horizontal
                        /> */}
                </View>
            </View>


            

        </SafeAreaView>
    )
}
export default Home;