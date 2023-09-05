import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigation from './AuthStackNavigator';
import { useSelector } from 'react-redux';
// import DrawerNavigation from './DrawerNavigator';

export default function Navigation() {
  const userData = useSelector((state)=> state.auth.userData)
  console.log("user Data--", userData)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <AuthStackNavigation />
      {/*{isLoggedIn ? <DrawerNavigation /> : <AuthStackNavigation />}*/}
    </NavigationContainer>
  );
}
