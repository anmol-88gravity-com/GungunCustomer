import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';
import {Font_Family} from '../../../utils/Fontfamily';
import {FONT_SIZES} from '../../../utils/FontSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  addressCard: {
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressText: {
    fontFamily: Font_Family.medium,
    fontSize: FONT_SIZES.fifteen,
    lineHeight: 28,
    color: Colors.black,
    textTransform: 'capitalize',
  },
  addAddressText: {
    fontFamily: Font_Family.medium,
    fontSize: FONT_SIZES.fifteen,
    lineHeight: 28,
    color: 'white',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.primary,
    borderRadius: 100,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressTitle: {
    color: Colors.black,
    fontFamily: Font_Family.regular,
    textTransform: 'capitalize',
  },
});
