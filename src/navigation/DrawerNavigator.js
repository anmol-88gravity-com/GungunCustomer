import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import Profile from '../screens/Profile/ProfileScreen';
import React from 'react';
import TabNavigator from './BottomTabNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { CustomDrawerContent } from './components/CustomDrawerContent';
import NoPageFound from '../screens/NoPageFound';
import { Font_Family } from '../utils/Fontfamily';
import AuthStackNavigation from './AuthStackNavigator';
import ChangePassword from '../screens/ChangePassword/ChangePasswordScreen';

const Drawer = createDrawerNavigator();
function DrawerNavigation() {

  return (

    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerLabelStyle: {
          fontFamily: Font_Family.medium
        }

      }}
    >
      <Drawer.Screen name="Home" component={TabNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={20} />
          ),
        }} />
      <Drawer.Screen name="Profile" component={Profile} options={{
        drawerIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-supervisor" color={color} size={20} />
        ),
      }} />

      <Drawer.Screen name="Change-Password" component={ChangePassword} options={{
        drawerIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="shield-check" color={color} size={20} />
        ),
      }} />

      <Drawer.Screen name="Your orders" component={NoPageFound} options={{
        drawerIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="note-check" color={color} size={20} />
        ),
      }} />

      <Drawer.Screen name="Favourite orders" component={NoPageFound} options={{
        drawerIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="cards-heart-outline" color={color} size={20} />
        ),
      }} />

      <Drawer.Screen name="Logout" component={AuthStackNavigation} options={{
        drawerIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="logout" color={color} size={20} />
        ),
      }}
      />

    </Drawer.Navigator>

  );
}
export default DrawerNavigation;