import { Platform, StyleSheet } from 'react-native';
import { Font_Family } from '../../utils/Fontfamily';
import { FONT_SIZES } from '../../utils/FontSize';
import { Colors } from '../../utils/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    marginTop: Platform.OS === 'android' ? '5%' : 0,
  },
  imageIcon: {
    left: Platform.OS === 'android' ? '10%' : 0,
  },
  imageSideIcon: {
    right: Platform.OS === 'android' ? '10%' : 0,
  },
  title: {
    marginVertical: '10%',
    fontSize: FONT_SIZES.fifteen,
    fontFamily: Font_Family.semiBold,
    color: '#000000',
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
    padding: Platform.OS === 'ios' ? 15 : 5,
  },
  inputContainerGender: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginVertical: '2%',
    borderColor: '#ccc',
    borderRadius: 10,
    padding: Platform.OS === 'ios' ? 15 : 19,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    fontFamily: Font_Family.regular,
  },
  profileView: {
    backgroundColor: Colors.secondary,
    bottom: 0,
    right: 0,
    padding: 10,
    borderRadius: 100,
    position: 'absolute',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileTitle: {
    marginTop: '5%',
    color: '#000000',
    fontFamily: Font_Family.medium,
    fontSize: FONT_SIZES.fifteen,
  },
  profileOptTitle: {
    marginTop: '5%',
    color: '#CCBDBD',
    fontFamily: Font_Family.medium,
    fontSize: FONT_SIZES.fifteen,
  },
  changeImgText: {
    color: '#005C79',
    bottom: 10,
    fontFamily: Font_Family.medium,
    fontSize: FONT_SIZES.tweleve,
  },
  errors: {
    color: 'red',
    fontSize: FONT_SIZES.tweleve,
    fontFamily: Font_Family.regular,
  },
  //dropdown


  dropdownContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#DEA812',
    padding: 10,
    borderRadius: 5,
  },
  dropdownText: {
    color: '#DEA812',
  },
  dropdownIcon: {
    marginLeft: 5,
  },
  dropdownOptions: {
    // marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  dropdownOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownOptionText: {
    color: '#ccc',
    fontFamily: Font_Family.medium,
    fontSize: FONT_SIZES.thirteen
  },
  //Modal 

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
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
  modalCameraBtn: {
    // padding: 12,
    height: 50, width: 50,
    borderRadius: 50,
    borderColor: Colors.primary, borderWidth: 2,
    justifyContent:'center'
  },
  cameraModalText:{
    fontFamily:Font_Family.medium,
    fontSize:FONT_SIZES.fifteen
  },
  buttonClose: {
    marginTop: 10,
    backgroundColor: Colors.primary

  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily:Font_Family.bold,
    fontSize:FONT_SIZES.eighteen
  },
  buttonStyless: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 5,
    marginTop:Platform.OS === 'ios' ? '5%' : '8%',
    // position:'absolute'
  },
  buttonLabel: {
    fontFamily: Font_Family.medium,
    fontSize: FONT_SIZES.fifteen,
  },
});

