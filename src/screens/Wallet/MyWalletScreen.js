import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, Image} from 'react-native';
import {Divider, FAB} from 'react-native-paper';

import {styles} from './MyWallet.styles';

export const MyWalletScreen = () => {
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.balanceCard}>
        <View style={styles.rowStyles}>
          <Image
            source={require('../../assets/icons/wallet.png')}
            style={styles.walletIcon}
          />
          <View>
            <Text style={styles.availableBalance}>Available Balance</Text>
            <Text style={styles.amount}>₹ 0</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <Text style={styles.helperText}>
          Gungun Points can be used to pay for any order.
        </Text>
      </View>
      <View style={styles.transactionBox}>
        <Image
          source={require('../../assets/icons/transaction.png')}
          style={styles.transactionImg}
        />
        <Text style={styles.noTransactionMsg}>
          You haven't made any recent purchases.
        </Text>
      </View>
      <FAB
        style={styles.fab}
        theme={{colors: {primary: 'red'}}}
        icon="plus"
        label={'How it Works?'}
      />
      {/*<ScrollView>*/}
      {/*  <Text*/}
      {/*    style={{*/}
      {/*      fontSize: FONT_SIZES.fifteen,*/}
      {/*      fontFamily: Font_Family.medium,*/}
      {/*      marginBottom: 10,*/}
      {/*      color: 'black',*/}
      {/*    }}>*/}
      {/*    Enter the amount you want to add in the wallet.*/}
      {/*  </Text>*/}

      {/*  <TextInput*/}
      {/*    mode={'outlined'}*/}
      {/*    activeOutlineColor={Colors.primary}*/}
      {/*    label={'Amount'}*/}
      {/*    placeholder={'Enter Amount'}*/}
      {/*    keyboardType={'number-pad'}*/}
      {/*    style={{backgroundColor: 'white'}}*/}
      {/*  />*/}
      {/*  <Text*/}
      {/*    style={{*/}
      {/*      fontSize: FONT_SIZES.fifteen,*/}
      {/*      fontFamily: Font_Family.medium,*/}
      {/*      marginTop: 20,*/}
      {/*      color: 'black',*/}
      {/*    }}>*/}
      {/*    Recommended{' '}*/}
      {/*  </Text>*/}
      {/*  <View*/}
      {/*    style={{*/}
      {/*      flexDirection: 'row',*/}
      {/*      justifyContent: 'space-around',*/}
      {/*      alignItems: 'center',*/}
      {/*      borderRadius: 12,*/}
      {/*      borderColor: '#ccc',*/}
      {/*      borderWidth: 1,*/}
      {/*      marginTop: 20,*/}
      {/*    }}>*/}
      {/*    <Image*/}
      {/*      source={require('../../assets/icons/Gpay.png')}*/}
      {/*      style={{width: 50, height: 50, resizeMode: 'contain'}}*/}
      {/*    />*/}
      {/*    <Image*/}
      {/*      source={require('../../assets/icons/paytm.png')}*/}
      {/*      style={{width: 60, height: 60, resizeMode: 'contain'}}*/}
      {/*    />*/}
      {/*    <Image*/}
      {/*      source={require('../../assets/icons/phonePe.png')}*/}
      {/*      style={{width: 40, height: 40, resizeMode: 'contain'}}*/}
      {/*    />*/}
      {/*    <Image*/}
      {/*      source={require('../../assets/icons/upi.png')}*/}
      {/*      style={{width: 50, height: 50, resizeMode: 'contain'}}*/}
      {/*    />*/}
      {/*  </View>*/}
      {/*  <Text*/}
      {/*    style={{*/}
      {/*      fontSize: FONT_SIZES.fifteen,*/}
      {/*      fontFamily: Font_Family.medium,*/}
      {/*      marginTop: 20,*/}
      {/*      color: 'black',*/}
      {/*    }}>*/}
      {/*    Cards{' '}*/}
      {/*  </Text>*/}
      {/*  <View*/}
      {/*    style={{*/}
      {/*      flexDirection: 'row',*/}
      {/*      justifyContent: 'space-around',*/}
      {/*      alignItems: 'center',*/}
      {/*      borderRadius: 12,*/}
      {/*      borderColor: '#ccc',*/}
      {/*      borderWidth: 1,*/}
      {/*      marginTop: 20,*/}
      {/*    }}>*/}
      {/*    <Image*/}
      {/*      source={require('../../assets/icons/visa.png')}*/}
      {/*      style={{*/}
      {/*        width: 60,*/}
      {/*        height: 60,*/}
      {/*        resizeMode: 'contain',*/}
      {/*        marginLeft: 15,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*    <Image*/}
      {/*      source={require('../../assets/icons/masterCard.png')}*/}
      {/*      style={{*/}
      {/*        width: 60,*/}
      {/*        height: 60,*/}
      {/*        resizeMode: 'contain',*/}
      {/*        marginLeft: 15,*/}
      {/*      }}*/}
      {/*    />*/}

      {/*    <Pressable*/}
      {/*      style={{*/}
      {/*        width: 50,*/}
      {/*        height: 50,*/}
      {/*        borderWidth: 1,*/}
      {/*        borderColor: '#ccc',*/}
      {/*        borderRadius: 100,*/}
      {/*        justifyContent: 'center',*/}
      {/*        alignItems: 'center',*/}
      {/*        borderStyle: 'dashed',*/}
      {/*        marginLeft: 15,*/}
      {/*      }}>*/}
      {/*      <Ionicons name={'add'} size={24} color={'#ccc'} />*/}
      {/*    </Pressable>*/}
      {/*    <Pressable*/}
      {/*      style={{*/}
      {/*        width: 50,*/}
      {/*        height: 50,*/}
      {/*        marginLeft: 15,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </View>*/}
      {/*  <Text*/}
      {/*    style={{*/}
      {/*      fontSize: FONT_SIZES.twenty,*/}
      {/*      fontFamily: Font_Family.bold,*/}
      {/*      marginBottom: 10,*/}
      {/*      marginTop: 20,*/}
      {/*      color: Colors.primary,*/}
      {/*    }}>*/}
      {/*    Coupons{' '}*/}
      {/*  </Text>*/}
      {/*  <Pressable*/}
      {/*    style={{*/}
      {/*      paddingHorizontal: 20,*/}
      {/*      paddingVertical: 10,*/}
      {/*      borderColor: Colors.secondary,*/}
      {/*      borderWidth: 3,*/}
      {/*      borderStyle: 'dashed',*/}
      {/*      borderRadius: 12,*/}
      {/*      backgroundColor: Colors.white,*/}
      {/*      flexDirection: 'row',*/}
      {/*      alignItems: 'center',*/}
      {/*      marginBottom: 15,*/}
      {/*    }}>*/}
      {/*    <Text*/}
      {/*      style={{*/}
      {/*        fontSize: FONT_SIZES.fifteen,*/}
      {/*        fontFamily: Font_Family.bold,*/}
      {/*        color: Colors.black,*/}
      {/*        width: '30%',*/}
      {/*      }}>*/}
      {/*      EXTRA200*/}
      {/*    </Text>*/}
      {/*    <View*/}
      {/*      style={{*/}
      {/*        width: '70%',*/}
      {/*        marginLeft: 10,*/}
      {/*      }}>*/}
      {/*      <Text*/}
      {/*        style={{*/}
      {/*          fontSize: FONT_SIZES.thirteen,*/}
      {/*          fontFamily: Font_Family.regular,*/}
      {/*          color: Colors.black,*/}
      {/*        }}>*/}
      {/*        Recharge for 100 and get 200 Extra Cashback on wallet*/}
      {/*      </Text>*/}
      {/*      <Text*/}
      {/*        style={{*/}
      {/*          marginVertical: 10,*/}
      {/*          fontSize: FONT_SIZES.thirteen,*/}
      {/*          fontFamily: Font_Family.regular,*/}
      {/*          color: Colors.black,*/}
      {/*        }}>*/}
      {/*        Valid till 15 Sept 2023*/}
      {/*      </Text>*/}
      {/*      <Text*/}
      {/*        style={{*/}
      {/*          fontSize: FONT_SIZES.fifteen,*/}
      {/*          fontFamily: Font_Family.medium,*/}
      {/*          color: Colors.primary,*/}
      {/*          textAlign: 'right',*/}
      {/*        }}>*/}
      {/*        Apply*/}
      {/*      </Text>*/}
      {/*    </View>*/}
      {/*  </Pressable>*/}
      {/*  <Pressable*/}
      {/*    style={{*/}
      {/*      paddingHorizontal: 20,*/}
      {/*      paddingVertical: 10,*/}
      {/*      borderColor: Colors.secondary,*/}
      {/*      borderWidth: 3,*/}
      {/*      borderStyle: 'dashed',*/}
      {/*      borderRadius: 12,*/}
      {/*      backgroundColor: Colors.white,*/}
      {/*      flexDirection: 'row',*/}
      {/*      alignItems: 'center',*/}
      {/*      marginBottom: 15,*/}
      {/*    }}>*/}
      {/*    <Text*/}
      {/*      style={{*/}
      {/*        fontSize: FONT_SIZES.fifteen,*/}
      {/*        fontFamily: Font_Family.bold,*/}
      {/*        color: Colors.black,*/}
      {/*        width: '30%',*/}
      {/*      }}>*/}
      {/*      CODE2000*/}
      {/*    </Text>*/}
      {/*    <View*/}
      {/*      style={{*/}
      {/*        width: '70%',*/}
      {/*        marginLeft: 10,*/}
      {/*      }}>*/}
      {/*      <Text*/}
      {/*        style={{*/}
      {/*          fontSize: FONT_SIZES.thirteen,*/}
      {/*          fontFamily: Font_Family.regular,*/}
      {/*          color: Colors.black,*/}
      {/*        }}>*/}
      {/*        Get 10-50% Cashback on recharge of 2000*/}
      {/*      </Text>*/}
      {/*      <Text*/}
      {/*        style={{*/}
      {/*          marginVertical: 10,*/}
      {/*          fontSize: FONT_SIZES.thirteen,*/}
      {/*          fontFamily: Font_Family.regular,*/}
      {/*          color: Colors.black,*/}
      {/*        }}>*/}
      {/*        Valid till 15 Sept 2023*/}
      {/*      </Text>*/}
      {/*      <Text*/}
      {/*        style={{*/}
      {/*          fontSize: FONT_SIZES.fifteen,*/}
      {/*          fontFamily: Font_Family.medium,*/}
      {/*          color: Colors.primary,*/}
      {/*          textAlign: 'right',*/}
      {/*        }}>*/}
      {/*        Apply*/}
      {/*      </Text>*/}
      {/*    </View>*/}
      {/*  </Pressable>*/}
      {/*  <Pressable*/}
      {/*    style={{*/}
      {/*      paddingHorizontal: 20,*/}
      {/*      paddingVertical: 10,*/}
      {/*      borderColor: Colors.secondary,*/}
      {/*      borderWidth: 3,*/}
      {/*      borderStyle: 'dashed',*/}
      {/*      borderRadius: 12,*/}
      {/*      backgroundColor: Colors.white,*/}
      {/*      flexDirection: 'row',*/}
      {/*      alignItems: 'center',*/}
      {/*      marginBottom: 50,*/}
      {/*    }}>*/}
      {/*    <Text*/}
      {/*      style={{*/}
      {/*        fontSize: FONT_SIZES.fifteen,*/}
      {/*        fontFamily: Font_Family.bold,*/}
      {/*        color: Colors.black,*/}
      {/*        width: '30%',*/}
      {/*      }}>*/}
      {/*      FIRST100*/}
      {/*    </Text>*/}
      {/*    <View*/}
      {/*      style={{*/}
      {/*        width: '70%',*/}
      {/*        marginLeft: 10,*/}
      {/*      }}>*/}
      {/*      <Text*/}
      {/*        style={{*/}
      {/*          fontSize: FONT_SIZES.thirteen,*/}
      {/*          fontFamily: Font_Family.regular,*/}
      {/*          color: Colors.black,*/}
      {/*        }}>*/}
      {/*        Get extra Rs 100 off Coupon on First wallet Recharge{' '}*/}
      {/*      </Text>*/}
      {/*      <Text*/}
      {/*        style={{*/}
      {/*          marginVertical: 10,*/}
      {/*          fontSize: FONT_SIZES.thirteen,*/}
      {/*          fontFamily: Font_Family.regular,*/}
      {/*          color: Colors.black,*/}
      {/*        }}>*/}
      {/*        Valid till 15 Sept 2023*/}
      {/*      </Text>*/}
      {/*      <Text*/}
      {/*        style={{*/}
      {/*          fontSize: FONT_SIZES.fifteen,*/}
      {/*          fontFamily: Font_Family.medium,*/}
      {/*          color: Colors.primary,*/}
      {/*          textAlign: 'right',*/}
      {/*        }}>*/}
      {/*        Apply*/}
      {/*      </Text>*/}
      {/*    </View>*/}
      {/*  </Pressable>*/}
      {/*</ScrollView>*/}
      {/*<View>*/}
      {/*  <Button>Coupon</Button>*/}
      {/*  <Button>Add</Button>*/}
      {/*</View>*/}
    </SafeAreaView>
  );
};
