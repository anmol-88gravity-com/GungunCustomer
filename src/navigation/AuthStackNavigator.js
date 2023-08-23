import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/HomeScreen';
import Profile from '../screens/Profile/ProfileScreen';
import 'react-native-gesture-handler';
import LoginScreen from '../screens/Auth/Login/LoginScreen';
import RegisterScreen from '../screens/Auth/Register/RegisterScreen';
import ResetPassword from '../screens/Auth/ResetPassword/ResetPasswordScreen';
import OTPScreen from '../screens/Auth/Get OTP/OTPScreen';
import ConfirmPass from '../screens/Auth/ResetPassword/ConfirmPassword';
import DrawerNavigation from './DrawerNavigator';



const Stack = createStackNavigator();

function AuthStackNavigation() {
  return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="ConfirmPassword" component={ConfirmPass} />
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

  );
}
export default AuthStackNavigation;