import { StyleSheet } from "react-native";
import { Font_Family } from "../../utils/Fontfamily";
import { FONT_SIZES } from "../../utils/FontSize";
import { Colors } from "../../utils/Colors";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    searchView: {
        marginHorizontal: 10,
        marginTop: Platform.OS === 'android' ? '10%' : '',
        backgroundColor: '#eeeeee',
        borderRadius: 10

    },
    input: {
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        // backgroundColor:'red',
        borderColor: '#cccccc',
        paddingLeft: 50,
        paddingRight: 50,
        fontSize: FONT_SIZES.thirteen,
        color: '#000000',
        fontFamily: Font_Family.medium
    },
    icon: {
        position: 'absolute',
        top: 15,
        left: 15,
    },
    sideIcon: {
        position: 'absolute',
        top: 15,
        right: 15
    },
    btnItems: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 20,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0, height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    selectedButton: {
        backgroundColor: '#005C79',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    text: {
        color: '#6D6D6D',
        fontFamily: Font_Family.medium,
        fontSize: FONT_SIZES.thirteen

    },
    selectedText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    title: {
        top: '5%',
        fontSize: FONT_SIZES.fifteen,
        fontFamily: Font_Family.semiBold,
        color: '#000000'
    },
    Itemtitle: {
        bottom: '20%',
        fontSize: FONT_SIZES.fifteen,
        fontFamily: Font_Family.semiBold,
        color: '#000000',
        textAlign: 'center'
    },
    subItemtitle: {
        bottom: '15%',
        fontSize: FONT_SIZES.thirteen,
        fontFamily: Font_Family.medium,
        color: '#005C79',
        textAlign: 'center'

    },
    popularitems: {
        backgroundColor: '#FFFFFF',
        //  padding: 10,
        // paddingHorizontal: '40%',
        // paddingVertical: '40%',
        width: '40%',
        marginTop: '20%',
        left: '5%',
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4
    },
    imgView: {
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignSelf: 'center',
        bottom: 50
    },
    pricetitle: {
        bottom: '10%',
        fontSize: FONT_SIZES.fifteen,
        fontFamily: Font_Family.semiBold,
        color: '#000000',
        textAlign: 'center'
    },
    // Modal Css
    modalView: {
        backgroundColor: '#f2f2f2', height: 500, marginTop: '100%', borderTopEndRadius: 20, borderTopStartRadius: 10,

    },
    modalInnerView: {
        backgroundColor: Colors.white,
        borderRadius:10,
         marginTop: 20, 
        //  opacity:0.5,
        marginHorizontal: 10,
         padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25, shadowRadius: 2,
        elevation: 4,
    }






})