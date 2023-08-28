import {Platform, StyleSheet} from 'react-native';
import {FONT_SIZES} from '../../../utils/FontSize';
import {Font_Family} from '../../../utils/Fontfamily';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    marginTop: Platform.OS === 'android' ? 5 : 0,
  },
  title: {
    marginVertical: 20,
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
  horizontalLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
    marginTop: 10,
  },
  mainView: {
    backgroundColor: '#ffffff',
    width: '100%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  innerView: {flexDirection: 'row', marginTop: '5%', marginLeft: '5%'},
  customerText: {
    marginLeft: '5%',
    fontFamily: Font_Family.medium,
    color: '#000000',
  },
});
