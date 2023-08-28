import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';


import { MyOrdersScreen } from '../screens/Orders/MyOrders';
import { OrderDetailScreen } from '../screens/Orders/OrderDetail';
import { AccountManagement } from '../screens/Settings/AccountManagement';
import { ChangePasswordScreen } from '../screens/Settings/ChangePassword';
import SendFeedbackScreen from '../screens/Settings/SendFeedback/SendFeedbackScreen';
import { CustomerSupportScreen } from '../screens/Settings/CustomerSupport';
import { AddressScreen } from '../screens/Address/AddressScreen';
import { UpdateAddressScreen } from '../screens/Address/UpdateAddress';
import { HomeScreen } from '../screens/Dashboard/HomeScreen';
import { SearchScreen } from '../screens/Dashboard/Search/SearchScreen';


const Stack = createStackNavigator();

export function DashboardNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}

const AddressStack = createStackNavigator();

export function AddressNavigator() {
  return (
    <AddressStack.Navigator screenOptions={{}}>
      <AddressStack.Screen name="Address" component={AddressScreen} />
      <AddressStack.Screen
        name="UpdateAddress"
        component={UpdateAddressScreen}
      />
    </AddressStack.Navigator>
  );
}

const OrderStack = createStackNavigator();

export function OrdersNavigator() {
  return (
    <OrderStack.Navigator screenOptions={{}}>
      <OrderStack.Screen name="MyOrders" component={MyOrdersScreen} />
      <OrderStack.Screen name="OrderDetails" component={OrderDetailScreen} />
    </OrderStack.Navigator>
  );
}

const SettingStack = createStackNavigator();

export function SettingsNavigator() {
  return (
    <SettingStack.Navigator screenOptions={{}}>
      <SettingStack.Screen
        name="AccountManagement"
        component={AccountManagement}
        options={{ headerShown: false }}
      />
      <SettingStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
      <SettingStack.Screen name="SendFeedback" component={SendFeedbackScreen} />
      <SettingStack.Screen
        name="CustomerSupport"
        component={CustomerSupportScreen}
      />
    </SettingStack.Navigator>
  );
}
