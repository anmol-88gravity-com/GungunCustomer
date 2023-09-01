import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';
import {FONT_SIZES} from '../../utils/FontSize';
import {Font_Family} from '../../utils/Fontfamily';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  balanceCard: {
    backgroundColor: Colors.secondary,
    margin: 10,
    borderRadius: 15,
    padding: 15,
  },
  rowStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availableBalance: {
    fontSize: FONT_SIZES.fifteen,
    fontFamily: Font_Family.medium,
    color: 'white',
    textAlign: 'right',
  },
  walletIcon: {
    width: 80,
    height: 80,
  },
  amount: {
    fontSize: FONT_SIZES.thirtyFive,
    fontFamily: Font_Family.bold,
    color: 'white',
    textAlign: 'right',
  },
  divider: {
    backgroundColor: 'white',
    marginVertical: 20,
  },
  helperText: {
    fontSize: 12,
    fontFamily: Font_Family.regular,
    color: 'white',
    textAlign: 'right',
  },
  transactionBox: {
    alignItems: 'center',
    marginTop: 150,
  },
  transactionImg: {
    width: 80,
    height: 80,
  },
  noTransactionMsg: {
    fontSize: 14,
    fontFamily: Font_Family.regular,
    color: '#808080',
    marginVertical: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
