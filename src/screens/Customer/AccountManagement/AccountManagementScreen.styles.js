import { Platform, StyleSheet } from "react-native";
import { FONT_SIZES } from "../../../utils/FontSize";
import { Font_Family } from "../../../utils/Fontfamily";
import { Colors } from "../../../utils/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },

    deliveryView: {
        backgroundColor: '#FFFFFF', borderRadius: 10, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25, shadowRadius: 2,
        elevation: 4,
    },
    title: {
        marginVertical: '5%',
        fontSize: FONT_SIZES.fifteen,
        fontFamily: Font_Family.semiBold,
        color: '#000000'
    },
    address: {
        fontSize: FONT_SIZES.fifteen,
        fontFamily: Font_Family.semiBold,
        color: '#000000'
    },
    mainDetailView: {
        backgroundColor: '#FFFFFF', borderRadius: 10, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25, shadowRadius: 2,
        elevation: 4,
    },
    horizontalLine: { backgroundColor: '#cccc', height: 1, width: '100%', marginTop: '5%' },
    imgView: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    subtitle: {
        fontSize: FONT_SIZES.fifteen,
        fontFamily: Font_Family.medium,
        color: '#000000',
        marginTop: '5%'
    },
    difftitleText: {
        fontSize: FONT_SIZES.thirteen,
        fontFamily: Font_Family.medium,
        color: '#000000',
        alignSelf: 'center',
        marginTop: '5%'

    },
    differentView: {
        backgroundColor: '#ffffff',
        width: '30%',
        padding: 20,
        bottom: '8%',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25, shadowRadius: 2,
        elevation: 4,

    },
    iconType: { alignSelf: 'center', color: '#000000' },
    cardTypes: {
        marginTop: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    //Account Setting


    mainView: {
        backgroundColor: '#ffffff', width: '100%',
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4
    },
    innerView: { flexDirection: 'row', marginTop: '5%', marginLeft: '5%' },
    customerText: { marginLeft: '5%', fontFamily: Font_Family.medium, color: '#000000' }








})