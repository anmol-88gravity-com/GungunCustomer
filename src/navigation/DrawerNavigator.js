import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Font_Family} from '../utils/Fontfamily';
import Profile from '../screens/Profile/ProfileScreen';
import {CustomDrawerContent} from './components/CustomDrawerContent';
import NoPageFound from '../screens/NoPageFound';
import ChangePassword from '../screens/ChangePassword/ChangePasswordScreen';
// import RootStackNavigator from './RootStackNavigator';
import Home from '../screens/Dashboard/HomeScreen/HomeScreen';

const Drawer = createDrawerNavigator();
function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerLabelStyle: {
          fontFamily: Font_Family.medium,
        },
        drawerActiveTintColor: 'rgba(0,92,121,0.5)',
      }}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-supervisor"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Change-Password"
        component={ChangePassword}
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="shield-check"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Your orders"
        component={NoPageFound}
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="note-check"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Favourite orders"
        component={NoPageFound}
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="cards-heart-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/*<Drawer.Screen*/}
      {/*  name="Logout"*/}
      {/*  component={AuthStackNavigation}*/}
      {/*  options={{*/}
      {/*    drawerIcon: ({color, size}) => (*/}
      {/*      <MaterialCommunityIcons name="logout" color={color} size={size} />*/}
      {/*    ),*/}
      {/*  }}*/}
      {/*/>*/}
    </Drawer.Navigator>
  );
}
export default DrawerNavigation;
