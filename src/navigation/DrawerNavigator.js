import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Font_Family} from '../utils/Fontfamily';
import {CustomDrawerContent} from './components/CustomDrawerContent';
import {Colors} from '../utils/Colors';

import {
  AddressNavigator,
  DashboardNavigator,
  OrdersNavigator,
  SettingsNavigator,
} from './RootStackNavigator';
import {ProfileScreen} from '../screens/Profile';
import {MyWalletScreen} from '../screens/Wallet';
import {LikesScreen} from '../screens/Likes';
import Header from '../components/header/Header';

const Drawer = createDrawerNavigator();
function DrawerNavigation() {
  const drawerContent = props => {
    return <CustomDrawerContent {...props} />;
  };
  return (
    <Drawer.Navigator
      drawerContent={drawerContent}
      screenOptions={{
        drawerLabelStyle: {
          fontFamily: Font_Family.medium,
        },
        drawerType: 'front',

        swipeEnabled: false,
        drawerActiveTintColor: Colors.primary,
        swipeEdgeWidth: 0,
        drawerPosition: 'right',
      }}>
      <Drawer.Screen
        name="DashboardNavigator"
        component={DashboardNavigator}
        options={{
          drawerLabel: 'Home',
          headerShown: false,
          drawerIcon: ({color}) => (
            <Ionicons name="home" color={color} size={20} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: ({navigation}) => (
            <Header headerTitle={'Profile'} navigation={navigation} />
          ),
          drawerIcon: ({color}) => (
            <Ionicons name="person" color={color} size={20} />
          ),
        }}
      />
      <Drawer.Screen
        name="AddressNavigator"
        component={AddressNavigator}
        options={{
          drawerLabel: 'Addresses',
          headerShown: false,
          drawerIcon: ({color}) => (
            <Ionicons name="location" color={color} size={20} />
          ),
        }}
      />

      <Drawer.Screen
        name="OrdersNavigator"
        component={OrdersNavigator}
        options={{
          drawerLabel: 'Your Orders',
          headerShown: false,
          drawerIcon: ({color}) => (
            <Ionicons name="document-text" color={color} size={20} />
          ),
        }}
      />
      <Drawer.Screen
        name="MyWallet"
        component={MyWalletScreen}
        options={{
          drawerLabel: 'Wallet',
          header: ({navigation}) => (
            <Header headerTitle={'My Wallet'} navigation={navigation} />
          ),
          drawerIcon: ({color}) => (
            <Ionicons name="wallet-sharp" color={color} size={20} />
          ),
        }}
      />

      <Drawer.Screen
        name="Likes"
        component={LikesScreen}
        options={{
          drawerLabel: 'Likes',
          header: ({navigation}) => (
            <Header headerTitle={'Likes'} navigation={navigation} />
          ),
          drawerIcon: ({color}) => (
            <Ionicons name="heart" color={color} size={20} />
          ),
        }}
      />
      <Drawer.Screen
        name="SettingsNavigator"
        component={SettingsNavigator}
        options={{
          drawerLabel: 'Settings',
          headerShown: false,
          drawerIcon: ({color}) => (
            <Ionicons name="settings" color={color} size={20} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
export default DrawerNavigation;
