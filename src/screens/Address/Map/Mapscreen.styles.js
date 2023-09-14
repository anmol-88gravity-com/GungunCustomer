import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';
import {Font_Family} from '../../../utils/Fontfamily';
import {FONT_SIZES} from '../../../utils/FontSize';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.36)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  myLocation: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    backgroundColor: 'rgba(248,225,163,0.7)',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  locationText: {
    fontFamily: Font_Family.medium,
    fontSize: FONT_SIZES.thirteen,
    color: Colors.black,
  },
  bottomCard: {margin: 15},
  areaText: {
    fontFamily: Font_Family.bold,
    fontSize: FONT_SIZES.eighteen,
    color: Colors.black,
  },
  addressText: {
    marginTop: 5,
    fontFamily: Font_Family.regular,
    fontSize: FONT_SIZES.thirteen,
    color: Colors.black,
  },
  buttonStyles: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 15,
    borderRadius: 5,
  },
  buttonLabel: {
    fontFamily: Font_Family.regular,
    fontSize: FONT_SIZES.fifteen,
  },
  modalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 15,
  },
  exactAddress: {
    fontSize: FONT_SIZES.eighteen,
    fontFamily: Font_Family.semiBold,
    color: Colors.primary,
  },
  saveAs: {
    fontSize: FONT_SIZES.fifteen,
    fontFamily: Font_Family.regular,
    marginTop: 20,
    color: Colors.black,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  flatStyles: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: Colors.white,
  },
  inputStyles: {
    fontSize: FONT_SIZES.thirteen,
    fontFamily: Font_Family.regular,
  },
  outlineStyles: {borderRadius: 8},
  modalButton: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonLabelStyles: {
    fontSize: FONT_SIZES.fifteen,
    fontFamily: Font_Family.regular,
  },
  errors: {
    color: 'red',
    fontSize: FONT_SIZES.tweleve,
    fontFamily: Font_Family.regular,
    marginBottom: 5,
  },
});
