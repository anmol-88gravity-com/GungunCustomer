import { Platform, StyleSheet } from 'react-native';
import { Font_Family } from '../../../utils/Fontfamily';
import { FONT_SIZES } from '../../../utils/FontSize';
import { Colors } from '../../../utils/Colors';

export const styles = StyleSheet.create({
  maincontainer: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  searchView: {
    marginHorizontal: 10,
    marginTop: Platform.OS === 'ios' ? 0 : '5%',
    bottom: '50%'
  },
  input: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    textTransform:'capitalize'
  },
  resturantPlaceTitle: {
    fontFamily: Font_Family.regular,
    marginLeft: 5,
    color: Colors.black,
  },
  textAddress: {
    bottom: Platform.OS === 'ios' ? 15 : 20,
    left: '7%', fontFamily: Font_Family.light, fontSize: FONT_SIZES.tweleve,
    textTransform:'capitalize'

  },

  resturantPlacesView: {
    backgroundColor: Colors.white,
    width: '100%',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 4,
    bottom: 10,
    marginVertical: '2%',
  },
  resturentBackImg: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
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
  textImg: {
    position: 'absolute',
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: Font_Family.semiBold,
    color: Colors.primary,
    fontSize: FONT_SIZES.twenty,
    textTransform: 'capitalize',
  },
  orderNowButton: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingTop: 9,
    paddingBottom: 8,
    backgroundColor: Colors.primary,
    bottom: '20%',
    borderRadius: 20,
  },

  orderText: {
    fontFamily: Font_Family.regular,
    fontSize: FONT_SIZES.tweleve,
    color: Colors.white,
    textAlign: 'center',
  },
  arrowIcon: {
    bottom: Platform.OS === 'ios' ? '1%' : 0,
    // justifyContent:'center',
  },
  recomendImg: {
    height: '100%',
    width: '100%',
    borderRadius: 30,
    marginVertical: 10,
  },

  //modal

  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.36)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
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

  modalInnerView: {
    backgroundColor: Colors.white,
    // marginTop: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    // padding: 10,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.25,
    // shadowRadius: 2,
    // elevation: 4,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  bestSellerIcon: {
    position: 'absolute',
    marginTop: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  bestSellerView: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginLeft: 5,
    alignSelf: 'center',
    paddingHorizontal: 3,
    paddingVertical: 2,
    flexDirection: 'row',
  },
  txtBestSeller: {
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: Font_Family.regular,
    fontSize: FONT_SIZES.tweleve,
    color: Colors.secondary,
  },
  countDownBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingBottom: 10,
    paddingRight: 10,
  },
  buttonIncrement: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    // borderRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonDecrement: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  minus: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
    color: 'white',
  },
  numberContainer: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  number: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemsName: {
    fontFamily: Font_Family.medium,
    fontSize: FONT_SIZES.fifteen,
    color: Colors.black,
    marginLeft: 10,
  },
});
