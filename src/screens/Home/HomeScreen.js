import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
} from 'react-native';
import {styles} from './HomeScreen.styles';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {images} from '../../utils/Images';
import {useNavigation} from '@react-navigation/native';
import ScreenHeader from '../../components/header/ScreenHeader';
import {Colors} from '../../utils/Colors';
import {Font_Family} from '../../utils/Fontfamily';
import {FONT_SIZES} from '../../utils/FontSize';

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
      subTitle: 'Prem Di Hatti',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      image: images.momos,
      title: 'Momos',
      subTitle: 'dolma Aunty Momo`s',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      image: images.kadaiPaneer,
      title: 'kadai Paneer',
      subTitle: 'Prem Di Hatti',
    },
  ];

  const popularRenderitem = ({item}) => {
    return (
      <View style={styles.popularitems}>
        <View style={styles.imgView}>
          <Image source={item.image} style={{height: '100%', width: '100%'}} />
        </View>
        <Text style={styles.Itemtitle}>Chole {'\n'}Bhatoore</Text>
        <Text style={styles.subItemtitle}>Prem Di hatti</Text>
        <Text style={styles.pricetitle}>₹ 249</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader headerTitle={"Let's Find \nFood Near You"} />
      <View style={[styles.container]}>
        <View style={styles.searchView}>
          <AntDesign
            name="search1"
            size={20}
            color="#aaaaaa"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search here"
            placeholderTextColor="#aaaaaa"
          />
          <MaterialCommunityIcons
            name="tune-vertical"
            size={20}
            color="#005C79"
            style={styles.sideIcon}
          />
        </View>

        <View style={styles.btnItems}>
          <TouchableOpacity
            style={
              selectedTab === 'All' ? styles.selectedButton : styles.button
            }
            onPress={() => setSelectedTab('All')}>
            <Text
              style={selectedTab === 'All' ? styles.selectedText : styles.text}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              selectedTab === 'Grocery' ? styles.selectedButton : styles.button
            }
            onPress={() => setSelectedTab('Grocery')}>
            <Text
              style={
                selectedTab === 'Grocery' ? styles.selectedText : styles.text
              }>
              Grocery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              selectedTab === 'Pet Food' ? styles.selectedButton : styles.button
            }
            onPress={() => setSelectedTab('Pet Food')}>
            <Text
              style={
                selectedTab === 'Pet Food' ? styles.selectedText : styles.text
              }>
              Pet Food
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              selectedTab === 'Pan' ? styles.selectedButton : styles.button
            }
            onPress={() => setSelectedTab('Pan')}>
            <Text
              style={selectedTab === 'Pan' ? styles.selectedText : styles.text}>
              Pan
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{marginHorizontal: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>Popular Items</Text>
            <Text style={[styles.title, {color: '#005C79'}]}>View More</Text>
          </View>
        </View>

        <View style={{marginTop: '5%'}}>
          <TouchableOpacity
            style={styles.popularitems}
            // onPress={() => navigation.navigate('AccountManagement')}
            onPress={() => toggleModal()}>
            <View style={styles.imgView}>
              <Image
                source={images.kadaiPaneer}
                style={{height: '100%', width: '100%'}}
              />
            </View>
            <Text style={styles.Itemtitle}>Chole {'\n'}Bhatoore</Text>
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

      {/* <Modal
                animationType="slide"
                transparent={true}
                // opacity={0.5}
                visible={isModalVisible}
                onRequestClose={() => {
                    toggleModal();
                }}
            >
                <View style={styles.modalView}>
                    <ScrollView>
                        <View style={styles.modalInnerView}>
                            <View style={{ width: '100%', height: 200, backgroundColor: Colors.white, padding: 10 }} >
                                <Image source={images.vadaFood} style={{ width: '100%', height: '100%', resizeMode: 'stretch', borderRadius: 10 }} />

                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialCommunityIcons name="square-circle" size={18} color={Colors.green} />
                                <View style={{ backgroundColor: '#f29652', borderRadius: 5, left: '5%', alignSelf: 'center', padding: 2 }}>
                                    <Text style={{ textAlign: 'center', fontFamily: Font_Family.regular, fontSize: FONT_SIZES.tweleve, color: Colors.white }}>Bestseller</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: '2%' }}>
                                <View>
                                    <Text style={{ fontFamily: Font_Family.medium, fontSize: FONT_SIZES.fifteen, color: Colors.black }}>Rava Masala Dosa</Text>

                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                    <MaterialCommunityIcons name="heart-circle-outline" size={25} color='#f29652' />
                                    <MaterialCommunityIcons name="share-circle" size={25} color='#f29652' />
                                </View>

                            </View>
                        </View>
                        <TouchableOpacity onPress={() => toggleModal()}>
                            <Text> Close Modal</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal> */}
    </SafeAreaView>
  );
};
export default Home;
