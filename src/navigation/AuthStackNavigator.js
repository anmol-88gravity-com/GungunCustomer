import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import {LoginScreen} from '../screens/Auth/Login';
import {RegisterScreen} from '../screens/Auth/Register';
import {OTPScreen} from '../screens/Auth/GetOTP';
import {ForgotPasswordScreen} from '../screens/Auth/ForgotPassword';
import {ResetPassword} from '../screens/Auth/ResetPassword';

const Stack = createStackNavigator();

function AuthStackNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}
export default AuthStackNavigation;
