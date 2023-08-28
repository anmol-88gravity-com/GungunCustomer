import React, { useState } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, FlatList, ImageBackground, Pressable, TextInput, ScrollView } from 'react-native';
import { styles } from '../HomeScreen.styles';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import { Colors } from '../../../../utils/Colors';
import { FONT_SIZES } from '../../../../utils/FontSize';
import { Font_Family } from '../../../../utils/Fontfamily';
import { Button } from 'react-native-paper';
import { images } from '../../../../utils/Images';



export const ResturantTopPlaces = ({ source, resturantName, resturentRatting, restDishType, restAddress, restType, resturentOffer, resturentMaxOffer }) => {
    const data = [
        { id: '1', title: 'Item 1' },
        { id: '2', title: 'Item 2' },
        { id: '3', title: 'Item 3' },
        { id: '2', title: 'Item 2' },
        { id: '3', title: 'Item 3' },



    ];

    const topResturents = () => {
        return (
            <View style={{ marginHorizontal: 5 }}>
                <View style={styles.resturantPlacesView}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 2, height: 100 }}>
                            <View style={{ justifyContent: 'center', padding: 10 }}>
                                <Text style={[styles.title, { marginVertical: 0 }]}>{resturantName}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: '2%' }}>
                                    <MaterialCommunityIcons name="star-circle" size={20} color="#000000" style={styles.restuIcon} />
                                    <Text style={[styles.resturantPlaceTitle,]}>{resturentRatting}</Text>
                                </View>
                                <Text style={styles.resturantPlaceTitle}>{restDishType}</Text>
                                <Text style={[styles.resturantPlaceTitle, { marginTop: 5 }]}>{restAddress}</Text>

                            </View>

                        </View>
                        <View style={{ flex: 1, }}>
                            <ImageBackground source={source} style={styles.resturentBackImg}>
                                <MaterialCommunityIcons name="cards-heart-outline" size={25} color="#000000" style={{ alignSelf: 'flex-end' }} />
                                <View style={{

                                    alignItems: 'flex-end',
                                    // top: '15%',
                                }}>
                                    <Text style={[styles.title, { color: Colors.black, marginVertical: 0, fontWeight: 'bold' }]}>{restType}</Text>
                                    <Text style={[styles.title, { color: Colors.black, marginVertical: 0, fontWeight: 'bold' }]}>{resturentOffer}</Text>
                                    <Text style={[styles.title, { color: Colors.black, marginVertical: 0, fontWeight: 'bold' }]}>{resturentMaxOffer}</Text>
                                </View>
                            </ImageBackground>
                        </View>
                    </View>
                </View>
            </View>


        )
    }
    return (
        <FlatList data={data} renderItem={topResturents} />

    )
}