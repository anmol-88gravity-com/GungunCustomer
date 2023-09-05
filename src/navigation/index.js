import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {restoreSession} from '../store/auth/authSlice';
import DrawerNavigation from './DrawerNavigator';
import AuthStackNavigation from './AuthStackNavigator';
import {Loader} from '../components/common/Loader';

export default function Navigation() {
  const {token, userId, isLoading} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  const isLoggedIn = token && userId;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNavigation /> : <AuthStackNavigation />}
    </NavigationContainer>
  );
}
