import { StyleSheet } from "react-native";
import { Font_Family } from "../../../utils/Fontfamily";
import { FONT_SIZES } from "../../../utils/FontSize";
import { Colors } from "../../../utils/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 10
    },
    textTitle: {
        fontFamily: Font_Family.semiBold,
        fontSize: FONT_SIZES.eighteen,
        color: Colors.black,
    },
    itemTitle: {
        fontFamily: Font_Family.medium,
        fontSize: FONT_SIZES.eighteen,
        color: Colors.black,
    },
    customerText: {
        fontFamily: Font_Family.medium,
        fontSize: FONT_SIZES.fifteen,
        color: Colors.secondary,
        alignSelf: 'center',
        marginTop: '5%'
    },

    itemSubTitle: {
        fontFamily: Font_Family.regular,
        fontSize: FONT_SIZES.thirteen,
        color: Colors.black
    },
    btnTotalSaving: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '5%',
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#cfe2e8'
    },
    invoiceButton: {
        flexDirection: 'row',
        padding: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        width: '45%',
        borderRadius: 10
    },
    favouriteText: {
        fontFamily: Font_Family.regular,
        fontSize: FONT_SIZES.tweleve,
        color: Colors.white
    },
    grandFavouriteText: {
        fontFamily: Font_Family.regular,
        fontSize: FONT_SIZES.fifteen,

    },
    itemTotalTitle: {
        fontFamily: Font_Family.bold,
        fontSize: FONT_SIZES.fifteen,
        color: Colors.black,
        alignSelf: 'center'
    },
    buttonStyles: {
        width: '100%',
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 5,
    },
    buttonlabel: {
        fontFamily: Font_Family.medium,
        fontSize: FONT_SIZES.fifteen
    },
})