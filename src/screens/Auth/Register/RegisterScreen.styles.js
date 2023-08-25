import { StyleSheet } from "react-native";
import { Colors } from "../../../utils/Colors";
import { FONT_SIZES } from "../../../utils/FontSize";
import { Font_Family } from "../../../utils/Fontfamily";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 92, 121, 0.77)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: Font_Family.semiBold,
    fontSize: FONT_SIZES.thirtySix,
    color: Colors.white,
  },
  subTitle: {
    fontSize: FONT_SIZES.fifteen,
    color: Colors.white,
    fontFamily: Font_Family.medium,
    marginTop: 10
  },
  subTitlee: {
    fontSize: FONT_SIZES.fifteen,
    color: Colors.white,
    fontFamily: Font_Family.medium,
    marginTop: 5
  },
  loginView: { flex: 2, backgroundColor: 'white', borderTopEndRadius: 20, borderTopStartRadius: 20, bottom: 20 },
  headingText: {
    fontSize: FONT_SIZES.twentyFive,
    fontFamily: Font_Family.semiBold,
    color: '#000000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    // marginBottom: 20,
    marginVertical: '2%',
    // backgroundColor:'red',
    borderColor: '#ccc',
    borderRadius: 10,
    padding:Platform.OS == 'ios' ? 8 : 5
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: FONT_SIZES.thirteen,
    fontFamily: Font_Family.medium
  },
  forgotText: { alignSelf: 'flex-end', color: '#000000' },
  btnView: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 15,
    // marginVertical:'20%',
    marginTop: '8%'
  },
  errors:{ color: 'red',fontSize:FONT_SIZES.tweleve,fontFamily:Font_Family.regular },
  textSignIn: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: FONT_SIZES.sixteen,
    fontFamily: Font_Family.medium
  },
  bottomtmtitledText: { color: "#000000", textAlign: 'center', },
  imageIcon:{
    left: Platform.OS === 'android' ? '10%': 0,
  },
  
})