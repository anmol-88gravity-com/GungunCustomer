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
    marginTop: '5%'
  },
  searchView: {
    marginHorizontal: 10,
    marginTop: '2%',

    backgroundColor: '#eeeeee',
    borderRadius: 10,
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
    marginVertical:'5%',
    fontSize: FONT_SIZES.fifteen,
    fontFamily: Font_Family.semiBold,
    color: '#000000',
  },
  Itemtitle: {
    bottom: '20%',
    fontSize: FONT_SIZES.fifteen,
    fontFamily: Font_Family.semiBold,
    color: '#000000',
    textAlign: 'center',
  },
  subItemtitle: {
    bottom: '15%',
    fontSize: FONT_SIZES.thirteen,
    fontFamily: Font_Family.medium,
    color: '#005C79',
    textAlign: 'center',
  },

  popularitems: {
    backgroundColor: '#FFFFFF',
    width: '40%',
   marginVertical:'15%',
    // left: '5%',
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
    bottom: 50,
  },
  pricetitle: {
    bottom: '10%',
    fontSize: FONT_SIZES.fifteen,
    fontFamily: Font_Family.semiBold,
    color: '#000000',
    textAlign: 'center',
  },
  bannerImg: { height: '100%', width: '100%', borderRadius: 20 },
  textImg:
    { position: 'absolute', 
    textAlign: 'center', 
    alignSelf: 'center', 
    fontFamily: Font_Family.semiBold, 
    color: Colors.primary, 
    fontSize: FONT_SIZES.twenty, 
    textTransform:'capitalize'
  }


});
