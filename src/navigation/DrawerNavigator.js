import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import Profile from '../screens/Profile/ProfileScreen';
import React from 'react';
import TabNavigator from './BottomTabNavigator';


const Drawer = createDrawerNavigator();
function DrawerNavigation() {
  return (

    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        
      }}
    >
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>

  );
}
export default DrawerNavigation;