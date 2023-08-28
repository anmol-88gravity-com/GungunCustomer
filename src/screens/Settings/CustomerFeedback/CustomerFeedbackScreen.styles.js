import {StyleSheet} from 'react-native';
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
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  labelStyle: {
    color: '#000',
  },
  subtitle: {
    fontSize: FONT_SIZES.fifteen,
    fontFamily: Font_Family.medium,
    color: '#000000',
    marginTop: '5%',
  },
  imgView: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  mainView: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    marginTop: 10,
  },
  btnView: {
    backgroundColor: '#F0F0F0',
    borderColor: '#005C79',
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 15,
    // marginVertical:'20%',
    marginTop: '10%',
  },
  textSignIn: {
    textAlign: 'center',
    color: '#005C79',
    fontSize: FONT_SIZES.sixteen,
    fontFamily: Font_Family.medium,
  },
  // feedback
  mainfeedbackForm: {
    marginHorizontal: 20,
    paddingBottom: 20,
  },

  feedbackForm: {
    backgroundColor: Colors.white,
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginTop: '10%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  txtForm: {
    height: 150,
    width: '100%',
    borderColor: '#e6e6e6',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: '8%',
  },
  btnfeedback: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 15,
    marginTop: '10%',
  },
  textfeedback: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: FONT_SIZES.sixteen,
    fontFamily: Font_Family.medium,
  },

  searchView: {
    marginHorizontal: 10,
    // marginTop: Platform.OS === 'android' ? '10%' : '',
    backgroundColor: '#eeeeee',
    borderRadius: 10,
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
    fontFamily: Font_Family.medium,
  },
  icon: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  sideIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});
