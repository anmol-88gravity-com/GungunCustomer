import React from 'react';
import { View, Text, ScrollView, Image, Pressable, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { styles } from './MyOrderScreen.styles';
import { Button, Divider, TextInput } from 'react-native-paper';
import { images } from '../../../utils/Images';
import { FONT_SIZES } from '../../../utils/FontSize';







export const MyOrdersScreen = ({ navigation }) => {

  const Data = [1, 2, 3, 4, 5]

  const renderItem = () => {
    return (
      <Pressable style={{ flex: 1, marginVertical: '2%' }} onPress={() => navigation.navigate('OrderDetails')}>
        <View style={styles.resturentDetails}>
          <Text style={[styles.resturentTitle,]}>Order Id:- 123456</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '3%' }}>
            <Text style={[styles.address]}>24 Aug 2023 at 10:37PM</Text>
            <Text style={styles.resturentTitle}>₹500.60</Text>
          </View>

          <View style={{ backgroundColor: '#ccc', height: 1, width: '100%', marginTop: 10 }} />
          <View style={{ flexDirection: 'row', marginTop: '3%' }}>
            <View style={{ flex: 3, }}  >
              <View style={{ flexDirection: 'row' }}>
                <Image source={images.choleBhatoore} />
                <View style={{ left: 10, alignSelf: 'center', }}>
                  <Text style={styles.resturentTitle}>Domino's Pizza</Text>
                  <Text style={styles.address}>DLF Cyber City, Gurgaon</Text>
                  <Text style={styles.time}>25 mins</Text>
                </View>
              </View>
            </View>
            <View style={{
              flex: 1,
            }}>
              <Pressable style={styles.statusView}>
                <Text style={{ textAlign: 'center', fontSize: FONT_SIZES.tweleve }}>Delivered</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.horizontalLine} />
          <View style={{ flexDirection: 'row', marginTop: '5%' }}>
            <MaterialCommunityIcons name="square-circle" color="#47BA34" size={20} />
            <View style={{ left: '15%', alignSelf: 'center' }}>
              <Text style={styles.resturentTitle}>1 * Veg Loaded</Text>
              <Text style={[styles.address, { marginTop: 5 }]}>Ghevar Khoya[250 Gms]</Text>
            </View>

          </View>

          <View style={{ backgroundColor: '#ccc', height: 1, width: '100%', marginTop: '5%' }} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
            <Button icon="reload1" mode="contained" style={styles.buttonColor}>
              Reorder
            </Button>
            <Text style={[styles.resturentTitle, { alignSelf: 'center' }]}>Payment failed</Text>
          </View>
        </View>
      </Pressable>

    )
  }

  return (


    <View style={styles.container}>
      <View pointerEvents={'none'} style={styles.searchView}>
        <TextInput
          style={styles.input}
          placeholder="Search here"
          placeholderTextColor="#808080"
          mode={'outlined'}
          theme={{ roundness: 15 }}
          outlineStyle={{ borderColor: '#cdcdcd' }}
          left={<TextInput.Icon icon="search1" color={Colors.primary} />}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={Data}
          renderItem={renderItem}

        />
      </ScrollView>



    </View>

  );
};
