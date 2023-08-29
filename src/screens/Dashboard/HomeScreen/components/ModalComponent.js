import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Pressable, Image, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { styles } from '../HomeScreen.styles';
import { Colors } from '../../../../utils/Colors';
import { images } from '../../../../utils/Images';
import { FONT_SIZES } from '../../../../utils/FontSize';
import { Font_Family } from '../../../../utils/Fontfamily';
import { Button } from 'react-native-paper';


export const ModalComponent = ({ isVisible, onClose }) => {
    const [count, setCount] = useState(0);
    const newData = [1, 2, 3, 4, 5]

    const starRenderItem = () => {
        return (
            <MaterialCommunityIcons name="star-outline" size={15} color="black" style={{ alignContent: 'center' }} />
        )
    }

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose} >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ alignSelf: 'flex-end', }}>
                        <Pressable onPress={onClose}>
                            <AntDesign name="close" size={24} color="black" />
                        </Pressable>
                    </View>
                    <View style={styles.modalInnerView}>
                        <View style={{ backgroundColor: Colors.white }} >
                            <View style={{ height: 200, width: '100%', borderRadius: 20 }}>
                                <Image source={images.vadaFood} style={{ height: '100%', width: '100%', borderRadius: 10 }} />
                                <View style={styles.bestSellerIcon}>
                                    <View style={styles.bestSellerView}>
                                        <Image source={images.medal} style={{ height: 30, width: 30 }} />
                                        <Text style={styles.txtBestSeller}>Bestseller</Text>
                                    </View>
                                    <MaterialCommunityIcons name="share-circle" size={30} color='#ffffff' />
                                </View>

                                <View style={styles.countDownBtn}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={styles.buttonIncrement} onPress={increment}>
                                            <Text style={styles.minus}>+</Text>
                                        </TouchableOpacity>
                                        <View style={styles.numberContainer}>
                                            <Text style={styles.number}>{count}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.buttonDecrement} onPress={decrement}>
                                            <Text style={styles.minus}>-</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>



                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <MaterialCommunityIcons name="square-circle" size={18} color={Colors.green} />
                            <Text style={styles.itemsName}>Rava Masala Dosa</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FlatList
                                data={newData}
                                horizontal={true}
                                renderItem={starRenderItem}
                            />
                            <Text style={{ fontSize: FONT_SIZES.tweleve, fontFamily: Font_Family.medium, color: Colors.black, textAlign: 'center', marginRight: '55%' }} >8 ratings</Text>
                        </View>


                        <Text style={{ marginTop: '3%', fontFamily: Font_Family.regular, fontSize: FONT_SIZES.tweleve }}>Currently rava masala dosa made of rava batter filled with mash potatoes and spices served with tangy sambar and chutney.</Text>
                    </View>

                    <Button
                        onPress={() => console.log('true')}
                        buttonColor={Colors.secondary}
                        theme={{ roundness: 0 }}
                        style={{
                            width: '100%',
                            alignSelf: 'center',
                            marginTop: 20,
                            marginBottom: 10,
                            borderRadius: 8,
                        }}
                        contentStyle={{ height: 50 }}
                        labelStyle={{
                            fontFamily: Font_Family.regular,
                            fontSize: FONT_SIZES.fifteen,
                        }}
                        mode={'contained'}>
                        Add Item ₹ 100
                    </Button>
                </View>
            </View>
        </Modal>

    );
};
