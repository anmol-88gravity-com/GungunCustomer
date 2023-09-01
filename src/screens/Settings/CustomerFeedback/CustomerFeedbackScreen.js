import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { styles } from './CustomerFeedbackScreen.styles';
import { images } from '../../../utils/Images';

export const CustomerFeedback = ({ navigation }) => {
  const [phone, setPhone] = useState('');

  const DATA = [
    {

      image: images.choleBhatoore,
      title: 'Chole Bhatoore',
      subTitle: 'Prem Di Hatti',
    },
    {

      image: images.momos,
      title: 'Momos',
      subTitle: 'dolma Aunty Momo`s',
    },
    {

      image: images.kadaiPaneer,
      title: 'kadai Paneer',
      subTitle: 'Prem Di Hatti',
    },
    {

      image: images.kadaiPaneer,
      title: 'kadai Paneer',
      subTitle: 'Prem Di Hatti',
    },
    {

      image: images.kadaiPaneer,
      title: 'kadai Paneer',
      subTitle: 'Prem Di Hatti',
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, paddingBottom: '2%' }}>
        <TouchableOpacity style={styles.mainView} onPress={() => navigation.navigate('SendFeedback')}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.subtitle, { marginTop: 0 }]}>
              Order Id: 14512
            </Text>
            <Text style={[styles.subtitle, { marginTop: 0 }]}>30-07-2023</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: '5%' }}>
            <View style={styles.imgView}>
              <View style={{ height: 80, width: 80 }}>
                <Image
                  source={item.image}
                  style={{ height: '100%', width: '100%' }}
                />
              </View>
            </View>
            <View style={{ flex: 3, alignSelf: 'center', left: '10%' }}>
              <Text style={[styles.title, { marginVertical: 0 }]}>
                {item.title}
              </Text>
              <Text style={[styles.subtitle]}>{item.subTitle}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={{ marginHorizontal: 20, }}>
          <Text style={styles.title}>Good Afternoon, Vishnu</Text>
        </View>

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
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{ marginTop: '5%' }}>
            <FlatList data={DATA} renderItem={renderItem} />
            <View style={{ marginBottom: 30 }} />
          </View>


          <View style={{ marginBottom: 30 }} />
        </ScrollView>
      </View>

    </SafeAreaView>
  );
};
