import {Platform, StyleSheet} from 'react-native';
import {FONT_SIZES} from '../../../utils/FontSize';
import {Font_Family} from '../../../utils/Fontfamily';
import {Colors} from '../../../utils/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  title: {
    marginVertical: '10%',
    fontSize: FONT_SIZES.fifteen,
    fontFamily: Font_Family.semiBold,
    color: '#000000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginVertical: '5%',
    borderColor: '#ccc',
    borderRadius: 10,
    padding: Platform.OS === 'ios' ? 15 : 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  imageIcon: {
    left: Platform.OS === 'android' ? '10%' : 0,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: FONT_SIZES.thirteen,
    fontFamily: Font_Family.medium,
  },
  btnView: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 15,
    marginTop: '10%',
  },
  textSignIn: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: FONT_SIZES.sixteen,
    fontFamily: Font_Family.medium,
  },
  forgotText: {
    alignSelf: 'flex-end',
    color: '#000000',
    fontFamily: Font_Family.regular,
    fontSize: FONT_SIZES.thirteen,
  },
  errors: {
    color: 'red',
    fontSize: FONT_SIZES.tweleve,
    fontFamily: Font_Family.regular,
    bottom: '5%',
    left: '1%',
  },
});
