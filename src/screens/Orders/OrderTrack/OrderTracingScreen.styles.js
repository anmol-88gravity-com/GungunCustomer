import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../../utils/Colors';
import { Font_Family } from '../../../utils/Fontfamily';
import { FONT_SIZES } from '../../../utils/FontSize';

const HEIGHT = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.36)',
  },

  myLocation: {
    position: 'absolute',
    // bottom: HEIGHT - (HEIGHT - HEIGHT / 3.5),
    bottom: HEIGHT - (HEIGHT - HEIGHT / 3),
    width: '50%',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  locationText: {
    fontFamily: Font_Family.medium,
    fontSize: FONT_SIZES.thirteen,
    color: Colors.black,
  },
  locationSubText: {
    fontFamily: Font_Family.regular,
    fontSize: FONT_SIZES.thirteen,
    color: Colors.black,
  },
  phoneIcon: {
    height: 40,
    width: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
  },
  bottomView: {
    flex: 2,
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
     shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  bottomCard: {
    //  margin: 15,
    padding: 20,
    // flex: 1,
    // backgroundColor:'white',
    // borderTopStartRadius: 20,
    // borderTopEndRadius: 20,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  areaText: {
    fontFamily: Font_Family.bold,
    fontSize: FONT_SIZES.eighteen,
    color: Colors.black,
  },
  iconBackground: {
    backgroundColor: '#eee',
    borderRadius: 10,
    height: 40,
    width: 50,
    justifyContent: 'center',
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
    borderRadius: 5,
    marginTop: 15,
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
  outlineStyles: { borderRadius: 8 },
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
  deliveryTime: {
    fontFamily: Font_Family.medium,
    fontSize: FONT_SIZES.fifteen,
    color: '#b7b7b7',
  },
  //
  container1: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
