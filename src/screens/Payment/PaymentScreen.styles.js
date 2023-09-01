import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';
import {Font_Family} from '../../utils/Fontfamily';
import {FONT_SIZES} from '../../utils/FontSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 10,
  },
  successImg: {
    height: 250,
    width: 250,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '10%',
  },
  paymentText: {
    textAlign: 'center',
    fontFamily: Font_Family.medium,
    fontSize: FONT_SIZES.twenty,
    marginTop: '10%',
    color: Colors.secondary,
  },
  orderIdText: {
    textAlign: 'center',
    fontFamily: Font_Family.medium,
    fontSize: FONT_SIZES.thirteen,
    marginTop: '5%',
    color: Colors.black,
  },
  buttonStyles: {
    // width: '100%',
    alignSelf: 'center',
    // marginTop: 15,
    borderRadius: 5,
    // bottom: '-20%',
  },
});
