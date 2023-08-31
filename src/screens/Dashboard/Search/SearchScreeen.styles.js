import {StyleSheet} from 'react-native';
import {Font_Family} from '../../../utils/Fontfamily';
import {FONT_SIZES} from '../../../utils/FontSize';
import {Colors} from '../../../utils/Colors';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', paddingHorizontal: 10},
  inputStyles: {
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
    marginVertical: 15,
  },
  recentSearches: {
    marginTop: 20,
    fontFamily: Font_Family.semiBold,
    fontSize: FONT_SIZES.thirteen,
    color: Colors.grey,
  },
  chipStyles: {
    marginRight: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 100,
    borderColor: Colors.grey,
    marginBottom: 10,
  },
  recommended: {
    marginTop: 20,
    fontFamily: Font_Family.semiBold,
    fontSize: FONT_SIZES.thirteen,
    color: Colors.grey,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  foodName: {
    marginRight: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 100,
    borderColor: Colors.grey,
    marginBottom: 10,
  },
  popularItems: {
    marginVertical: 20,
    fontFamily: Font_Family.semiBold,
    fontSize: FONT_SIZES.thirteen,
    color: Colors.black,
  },
  dishesText: {
    marginVertical: 10,
    fontFamily: Font_Family.semiBold,
    fontSize: FONT_SIZES.fifteen,
    color: Colors.secondary,
  },
  seeMore: {
    marginVertical: 10,
    fontFamily: Font_Family.semiBold,
    fontSize: FONT_SIZES.fifteen,
    color: Colors.primary,
    textAlign: 'right',
  },
  restaurantText: {
    marginBottom: 20,
    fontFamily: Font_Family.semiBold,
    fontSize: FONT_SIZES.fifteen,
    color: Colors.secondary,
  },
});
