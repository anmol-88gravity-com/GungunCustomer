import {StyleSheet} from 'react-native';
import {FONT_SIZES} from '../../../utils/FontSize';
import {Font_Family} from '../../../utils/Fontfamily';
import {Colors} from '../../../utils/Colors';

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
    fontSize: FONT_SIZES.thirtySix,
    color: Colors.white,
    fontFamily: Font_Family.semiBold,
  },
  subTitle: {
    fontSize: FONT_SIZES.twenty,
    color: Colors.white,
    marginTop: 10,
    fontFamily: Font_Family.regular,
    textAlign: 'center',
  },
  loginView: {
    flex: 1.1,
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    bottom: 20,
  },
  headingText: {
    fontSize: FONT_SIZES.twenty,
    color: '#000000',
    fontFamily: Font_Family.medium,
  },

  forgotText: {
    alignSelf: 'flex-end',
    color: '#000000',
    fontFamily: Font_Family.medium,
    fontSize: FONT_SIZES.thirteen,
  },
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
  errors: {
    color: 'red',
    fontSize: FONT_SIZES.tweleve,
    fontFamily: Font_Family.regular,
    bottom: '5%',
    left: '1%',
  },
  bottomtmtitledText: {
    color: '#000000',
    textAlign: 'center',
    fontFamily: Font_Family.regular,
    fontSize: FONT_SIZES.tweleve,
  },
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
  buttonStyles: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  buttonLabel: {
    fontFamily: Font_Family.medium,
    fontSize: FONT_SIZES.fifteen,
  },
});
