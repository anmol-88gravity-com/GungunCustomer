import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { styles } from './CustomerFeedbackScreen.styles';
import { images } from '../../../utils/Images';
import { getUserProfile } from '../../../store/user/userSlice';

export const CustomerFeedback = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const userProfile = useSelector(state => state.user); // get user data from Redux state

  // Dynamically update profile data when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setProfileData({
        fullName: userProfile.name,
        phoneNumber: userProfile.phone_number,
        profileImage: userProfile.profile_image || '', // handle null case
      });
      setLoading(false);
    } else {
      dispatch(getUserProfile()).then(() => setLoading(false)); // Fetch user profile on component mount
    }
  }, [dispatch, userProfile]);

  const DATA = [
    {
      image: images.choleBhatoore,
      title: 'Chole Bhatoore',
      subTitle: 'Prem Di Hatti',
    },
    {
      image: images.momos,
      title: 'Momos',
      subTitle: 'Dolma Aunty Momo`s',
    },
    {
      image: images.kadaiPaneer,
      title: 'Kadai Paneer',
      subTitle: 'Prem Di Hatti',
    },
    {
      image: images.kadaiPaneer,
      title: 'Kadai Paneer',
      subTitle: 'Prem Di Hatti',
    },
    {
      image: images.kadaiPaneer,
      title: 'Kadai Paneer',
      subTitle: 'Prem Di Hatti',
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, paddingBottom: '2%' }}>
        <TouchableOpacity style={styles.mainView} onPress={() => navigation.navigate('SendFeedback')}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.subtitle, { marginTop: 0 }]}>Order Id: 14512</Text>
            <Text style={[styles.subtitle, { marginTop: 0 }]}>30-07-2023</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: '5%' }}>
            <View style={styles.imgView}>
              <View style={{ height: 80, width: 80 }}>
                <Image source={item.image} style={{ height: '100%', width: '100%' }} />
              </View>
            </View>
            <View style={{ flex: 3, alignSelf: 'center', left: '10%' }}>
              <Text style={[styles.title, { marginVertical: 0 }]}>{item.title}</Text>
              <Text style={[styles.subtitle]}>{item.subTitle}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()} // Ensure unique key
      ListHeaderComponent={
        <View style={{ marginHorizontal: 20 }}>
          {!loading && profileData ? (
            <Text style={styles.title}>Good Afternoon, {profileData.fullName}</Text>
          ) : (
            <Text style={styles.title}>Loading...</Text> // Loading state if profile is not available
          )}

          <View style={styles.searchView}>
            <AntDesign name="search1" size={20} color="#aaaaaa" style={styles.icon} />
            <TextInput style={styles.input} placeholder="Search here" placeholderTextColor="#aaaaaa" />
          </View>
        </View>
      }
      contentContainerStyle={{ paddingBottom: 30 }} // Add padding at the bottom
    />
  );
};
