import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';
import {FONT_SIZES} from '../../../utils/FontSize';
import {Font_Family} from '../../../utils/Fontfamily';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
    marginTop: 10,
  },
  subTitlee: {
    fontSize: FONT_SIZES.fifteen,
    color: Colors.white,
    fontFamily: Font_Family.medium,
    marginTop: 5,
  },
  loginView: {
    flex: 2,
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    bottom: 20,
  },
  headingText: {
    fontSize: FONT_SIZES.twentyFive,
    fontFamily: Font_Family.semiBold,
    color: '#000000',
  },
  headingTextt:{
    fontSize: FONT_SIZES.twenty,
    fontFamily: Font_Family.semiBold,
    color: '#000000',
    textAlign:'center'
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
    padding: Platform.OS == 'ios' ? 8 : 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: FONT_SIZES.thirteen,
    fontFamily: Font_Family.medium,
    
  },
  forgotText: {alignSelf: 'flex-end', color: '#000000'},
  errors: {
    color: 'red',
    fontSize: FONT_SIZES.tweleve,
    fontFamily: Font_Family.regular,
  },
  bottomtmtitledText: {color: '#000000', textAlign: 'center'},
  imageIcon: {
    left: Platform.OS === 'android' ? '10%' : 0,
  },
  eyeImageIcon: {
    right: Platform.OS === 'android' ? '10%' : 0,
  },
  buttonStyles: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 15,
    borderRadius: 5,
  },
  buttonlabel:{
    fontFamily:Font_Family.medium
  },
  btnGetOTP: {
    color: Colors.primary,
    textDecorationLine: 'underline',
    right: Platform.OS === 'android' ? '10%' : 0,
    fontFamily: Font_Family.medium,
    fontSize: FONT_SIZES.tweleve

  },
  //modal

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    // marginBottom: 15,
    textAlign: 'center',
    fontFamily:Font_Family.medium,
    color:Colors.black,
    fontSize:FONT_SIZES.eighteen
  },

  //OTP

 
  // forgotText: {
  //   alignSelf: 'flex-end',
  //   color: '#000000',
  //   fontFamily: Font_Family.medium,
  //   fontSize: FONT_SIZES.thirteen,
  // },
  btnView: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 15,
    marginTop: '15%',
  },
  textSignIn: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: FONT_SIZES.sixteen,
    fontFamily: Font_Family.medium,
  },
  // bottomtmtitledText: {
  //   color: '#000000',
  //   textAlign: 'center',
  //   fontFamily: Font_Family.regular,
  //   fontSize: FONT_SIZES.tweleve,
  // },
  inputTextField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: '10%',
  },
  inputText: {
    padding: 0,
    fontSize: FONT_SIZES.eighteen,
    width: 40,
    textAlign: 'center',
  },
  verifyOTPText: {
    fontFamily: Font_Family.regular,
    fontSize: FONT_SIZES.fifteen,
  },
  btnResend: {
    color: Colors.primary,
    fontFamily: Font_Family.regular,
    fontSize: FONT_SIZES.fifteen,
  },
  buttonStyless: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  buttonLabel: {
    fontFamily: Font_Family.medium,
    fontSize: FONT_SIZES.fifteen,
  },






});
