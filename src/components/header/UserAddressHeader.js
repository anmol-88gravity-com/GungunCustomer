import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../utils/Images';
import { Font_Family } from '../../utils/Fontfamily';
import { FONT_SIZES } from '../../utils/FontSize';

const UserAddressHeader = ({ headerTitle }) => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.mainHeaderView}>
            <View style={styles.middleHeaderView}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ height: 50, width: 50, borderRadius: 100, }}>
                        <Image source={images.profile} style={{ width: '100%', height: '100%', }} />
                    </View>
                    <Text style={styles.headerText}>{headerTitle}</Text>
                    {/* <View >
                        <View style={{ flexDirection: 'row', }}>
                            <MaterialIcons name="location-pin" size={25} color="#F56337" style={styles.locationIcon} />
                            
                            <MaterialCommunityIcons name="chevron-down" size={25} color="black" style={styles.dropdownIcon} />
                        </View>
                        <Text style={{width:'40%'}}>Shiv Vihar, Karawal Nagar, Delhi-110093sdcdscdscsdcdscdscdscdscdsccdscdscdsdsccsdcdsc</Text>
                    </View> */}
                </View>
                <Pressable style={{ marginLeft: 2 }} onPress={() => navigation.toggleDrawer()}>
                    <MaterialIcons name="menu" size={28} color="black" />
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default UserAddressHeader;

const styles = StyleSheet.create({
    mainHeaderView: {
        paddingHorizontal: 20,
        marginTop: Platform.OS === 'android' ? 20 : -40,
        // backgroundColor: 'white',
        shadowColor: '#000',
        // backgroundColor:'red'

    },
    middleHeaderView: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor:'yellow'
    },
    headerText: {
        fontFamily: Font_Family.semiBold,
        marginLeft: 3, fontSize: FONT_SIZES.sixteen,
        color: '#000000', left: '10%'
    },
    dropdownIcon: {
        bottom: Platform.OS === 'ios' ? '3%' : '2%',
        left: '10%'
    },
    locationIcon: {
        bottom: Platform.OS === 'ios' ? '2%' : '1%',
        left: '5%',
    }
})
