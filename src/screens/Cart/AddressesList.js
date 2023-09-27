import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Pressable,
    Text,
    View,
    Alert,
    ActivityIndicator
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { styles } from './cart.styles';
import { Colors } from '../../utils/Colors';
import { useGetAddressList } from '../../hooks';
import { Loader } from '../../components/common/Loader';
import { useDispatch } from 'react-redux';
import { useError } from '../../context/ErrorProvider';
import { deleteAddress, setDefaultAddress } from '../../store/address/addressSlice';
import { showMessage } from 'react-native-flash-message';
import { FONT_SIZES } from '../../utils/FontSize';
import { Font_Family } from '../../utils/Fontfamily';


export const AddressesScreen = ({ navigation }) => {
    const [addressUpdatedList, setAddressUpdatedList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { addressList, loading } = useGetAddressList();

    const dispatch = useDispatch();
    const setError = useError();

    useEffect(() => {
        if (addressList.length > 0) {
            setAddressUpdatedList(addressList);
        }
    }, [addressList]);

    const onPressHandler = async addressId =>
        Alert.alert('Wait!', 'Are you sure you want to delete this address ?', [
            { text: 'YES', onPress: () => deleteHandler(addressId) },
            { text: 'NO' },
        ]);

    const deleteHandler = async addressId => {
        const a = addressUpdatedList.find(d => d.id === addressId);
        if (a) {
            if (a.is_default === true) {
                showMessage({
                    message:
                        'Please set another address as PRIMARY before deleting this address.',
                    type: 'danger',
                    color: Colors.white,
                    textStyle: {
                        fontSize: FONT_SIZES.fifteen,
                        fontFamily: Font_Family.medium,
                    },
                });
                return;
            }
        }
        try {
            const res = await dispatch(deleteAddress({ addressId }));
            if (res) {
                setAddressUpdatedList(prevState => {
                    const a = [...prevState];
                    const x = a.findIndex(m => m.id === addressId);
                    if (x > -1) {
                        a.splice(x, 1);
                    }
                    return a;
                });
                showMessage({
                    message: 'Deleted Successfully.',
                    type: 'default',
                    backgroundColor: Colors.secondary,
                    color: Colors.white,
                    textStyle: {
                        fontSize: FONT_SIZES.fifteen,
                        fontFamily: Font_Family.medium,
                    },
                });
            }
        } catch (e) {
            setError(e.message);
        }
    };

    const handleDefaultAddress = async addressId => {
        setIsLoading(true);
        try {
            await dispatch(setDefaultAddress({ addressId })).unwrap();
            showMessage({
                message: 'Primary Address Updated.',
                type: 'default',
                backgroundColor: Colors.secondary,
                color: Colors.white,
                textStyle: {
                    fontSize: FONT_SIZES.fifteen,
                    fontFamily: Font_Family.medium,
                },
            });
            navigation.navigate('CartScreen')
        } catch (e) {
            setError(e.message);
        }
        setIsLoading(false);
    };
    const renderItem = ({ item, index }) => (
        <Pressable
            key={item.id}
            style={[styles.addressCard, { marginTop: index === 0 ? 20 : 0 }]}>
            <View style={styles.titleStyles}>
                <Text style={styles.addressTitle}>📍 {item.address_type}</Text>
                <AntDesign
                    name="arrowright"
                    size={18}
                    color={Colors.primary}
                    style={{ paddingHorizontal: 10 }}
                />
            </View>
            <View style={styles.titleStyles}>
                <Text style={[styles.addressText, { width: '90%' }]}>
                    {item.address1 + ', ' + item.address2} , {item.state}, {item.state},
                    Pincode-{item.pincode}, {item.landmark}
                </Text>
                <Pressable
                    style={{ alignSelf: 'flex-end' }}
                    onPress={() => onPressHandler(item.id)}>
                    <MaterialCommunityIcons name="delete" size={24} color={'#bd0620'} />
                </Pressable>
            </View>
            {item.is_default ? (
                <Text
                    style={styles.addressBtn}
                    onPress={() =>
                        showMessage({
                            message: 'Already a primary address',
                            type: 'default',
                            backgroundColor: Colors.secondary,
                            color: Colors.white,
                            textStyle: {
                                fontSize: FONT_SIZES.fifteen,
                                fontFamily: Font_Family.medium,
                            },
                        })
                    }>
                    Primary Address
                </Text>
            ) : isLoading ? (
                <ActivityIndicator
                    style={{
                        marginTop: 5,
                        alignSelf: 'flex-end',
                    }}
                    size={'small'}
                    color={Colors.secondary}
                />
            ) : (
                <Text
                    style={styles.addressBtn}
                    onPress={() => handleDefaultAddress(item.id)}>
                    Set As Primary
                </Text>
            )}
        </Pressable>
    );

    return (
        <View style={styles.container}>
            {loading ? (<Loader />) : <FlatList
                data={addressUpdatedList}
                renderItem={renderItem}
                keyExtractor={item => String(item.id)}
                showsVerticalScrollIndicator={false}
            />}

        </View>
    );
};
