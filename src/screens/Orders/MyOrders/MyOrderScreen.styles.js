import { StyleSheet } from "react-native";
import { Font_Family } from "../../../utils/Fontfamily";
import { FONT_SIZES } from "../../../utils/FontSize";
import { Colors } from "../../../utils/Colors";


export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
         padding:10
    },
    searchView: {
        // marginHorizontal: 10,
        marginTop: Platform.OS === 'ios' ? 0 : '5%',
        marginBottom: '2%',
      },
      input: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      resturentDetails:{
        backgroundColor: Colors.white,
        borderWidth:1,
        borderColor:'#ccc',
        borderRadius:10,
        padding: 10,
        paddingBottom: 20
      },
      resturentTitle:{
        fontFamily:Font_Family.medium,
        fontSize:FONT_SIZES.thirteen,
        color:Colors.black,
      },
      address:{
        fontFamily:Font_Family.regular,
        fontSize:FONT_SIZES.tweleve,
        color:Colors.black,
        marginTop:'1%'
       
      },
      time:{
        fontFamily:Font_Family.regular,
        fontSize:FONT_SIZES.tweleve,
        color:Colors.black,
        marginTop:'1%'
      },
      statusView:{padding:'5%',backgroundColor:'#ccc',borderRadius:5},
      buttonColor:{
        backgroundColor:Colors.secondary,
        fontFamily:Font_Family.medium,

      },
      horizontalLine:{
        borderWidth: 1, width: '100%',
        borderColor:'#ccc',
        borderStyle: Platform.OS === 'ios' ? 'dotted' : 'dashed',
        marginTop: 10
      },
})