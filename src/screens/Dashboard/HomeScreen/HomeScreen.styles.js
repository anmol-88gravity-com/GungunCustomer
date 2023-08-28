import { Platform, StyleSheet } from 'react-native';
import { Font_Family } from '../../../utils/Fontfamily';
import { FONT_SIZES } from '../../../utils/FontSize';
import { Colors } from '../../../utils/Colors';

export const styles = StyleSheet.create({
  maincontainer: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    // backgroundColor: 'pink'
  },
  container: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
    // backgroundColor: 'yellow',
    marginTop: '2%'
  },
  searchView: {
    marginHorizontal: 10,
    marginTop: Platform.OS === 'ios' ? 0 : '5%',
    backgroundColor: '#eeeeee',
    borderRadius: 10,
    marginBottom: '2%'
  },
  input: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
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

  title: {
    marginVertical: '5%',
    fontSize: FONT_SIZES.fifteen,
    fontFamily: Font_Family.semiBold,
    color: '#000000',
  },
  resturantPlaceTitle: {
    fontFamily: Font_Family.regular,
    marginVertical: '2%',
    color: Colors.black
  },
  restuIcon: {
    top: Platform.OS === 'ios' ? '1%' : '2%'
  },
  resturantPlacesView: {
    backgroundColor: Colors.white,
    // backgroundColor:'pink',
    width: '100%',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 4,
    left: '1%',
    right: '2%',
    bottom: 10,

    marginVertical: '2%'
  },
  resturentBackImg: {
    height: '100%', width: '100%', position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    // overlayColor:'black',
    opacity: 0.8
  },
  Itemtitle: {
    bottom: '20%',
    fontSize: FONT_SIZES.fifteen,
    fontFamily: Font_Family.semiBold,
    color: '#000000',
    textAlign: 'center',
  },
  subItemtitle: {
    bottom: '25%',
    fontSize: FONT_SIZES.thirteen,
    fontFamily: Font_Family.medium,
    color: '#005C79',
    textAlign: 'center',
  },

  popularitems: {
    backgroundColor: '#FFFFFF',
    // backgroundColor:'red',
    // width: '50%',
    // width: '40%',
    marginVertical: '25%',
    paddingHorizontal: 10,
    marginHorizontal: 8,
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,

  },
  imgView: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 40,
  },
  pricetitle: {
    bottom: '20%',
    fontSize: FONT_SIZES.fifteen,
    fontFamily: Font_Family.semiBold,
    color: '#000000',
    textAlign: 'center',
  },
  bannerImg: { height: '100%', width: '100%', borderRadius: 20 },
  textImg:
  {
    position: 'absolute',
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: Font_Family.semiBold,
    color: Colors.primary,
    fontSize: FONT_SIZES.twenty,
    textTransform: 'capitalize'
  },
  orderNowButton: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8, paddingVertical: 8,
    backgroundColor: Colors.primary,
    bottom: '20%',
    borderRadius: 20
  },

  orderText: { fontFamily: Font_Family.regular, fontSize: FONT_SIZES.tweleve, color: Colors.white, textAlign: 'center' },
  arrowIcon: {
    bottom: Platform.OS === 'ios' ? '1%' : 0
  },
  recomendImg: { height: '100%', width: '100%', borderRadius: 30, marginVertical: 10, }


});
