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
        <TouchableOpacity style={styles.searchView} onPress={()=>navigation.navigate('Search')}>
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
            editable={false}
          />
        </TouchableOpacity>

        <View style={{marginHorizontal: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>Popular Items</Text>
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
    </SafeAreaView>
  );
};
export default Home;
