import { Platform, StyleSheet } from "react-native";
import { FONT_SIZES } from "../../../utils/FontSize";
import { Font_Family } from "../../../utils/Fontfamily";
import { Colors } from "../../../utils/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    icon: {
        marginTop: Platform.OS === 'android' ? '5%' : 0,

    },
    title: {
        marginVertical: '10%',
        fontSize: FONT_SIZES.fifteen,
        fontFamily: Font_Family.semiBold,
        color: '#000000'
    },
    btnView: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        padding: 15,
        // marginVertical:'20%',
        marginTop: '15%'
    },
    textSignIn: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: FONT_SIZES.sixteen,
        fontFamily: Font_Family.medium
    },
    inputContainer: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    labelStyle: {
        color: '#000',
    },
    verifyOTPText: { textAlign: 'center', fontFamily: Font_Family.regular, fontSize: FONT_SIZES.tweleve },
    btnResend: { color: '#F56337', textAlign: 'center', marginTop: '5%', fontFamily: Font_Family.semiBold, fontSize: FONT_SIZES.fifteen },
    inputTextField: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
    inputText: {
        padding: 0,
        fontSize: FONT_SIZES.thirtyFive,
        width: '12%',
        // marginHorizontal: 5,
        textAlign: 'center',
    }
})