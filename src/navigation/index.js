import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigation from './AuthStackNavigator';
// import DrawerNavigation from './DrawerNavigator';

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <AuthStackNavigation />
      {/*{isLoggedIn ? <DrawerNavigation /> : <AuthStackNavigation />}*/}
    </NavigationContainer>
  );
}
