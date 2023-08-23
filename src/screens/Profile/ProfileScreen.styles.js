import { Platform, StyleSheet } from "react-native";
import { Font_Family } from "../../utils/Fontfamily";
import { FONT_SIZES } from "../../utils/FontSize";
import { Colors } from "../../utils/Colors";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFFFFF'
    },
    icon:{
        marginTop:Platform.OS === 'android' ? '5%' : 0,
    
    },
    title: {
        marginVertical: '10%',
        fontSize: FONT_SIZES.fifteen,
        fontFamily: Font_Family.semiBold,
        color:'#000000'
    },
    btnView: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        padding: 15,
        // marginVertical:'20%',
        marginTop: '10%'
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        marginVertical: '2%',
        borderColor: '#ccc',
        borderRadius: 10,
        padding: Platform.OS == 'ios' ? 15 : 5
      },
      input: {
        flex: 1,
        paddingHorizontal: 15,
        fontFamily:Font_Family.regular
      },
      profileView:{
        backgroundColor:'#F56337',height:20,width:20,borderRadius:20,bottom:20,marginLeft:'15%'},
        profileTitle:{
            marginTop:'5%',
            color:'#000000',
            fontFamily:Font_Family.medium,
            fontSize:FONT_SIZES.fifteen
        },
        profileOptTitle:{
            marginTop:'5%',
            color:'#CCBDBD',
            fontFamily:Font_Family.medium,
            fontSize:FONT_SIZES.fifteen
        },
        changeImgText:{color:'#005C79',bottom:10,fontFamily:Font_Family.medium,fontSize:FONT_SIZES.tweleve}

})