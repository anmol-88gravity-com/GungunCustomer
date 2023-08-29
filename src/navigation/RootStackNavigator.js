import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Header from '../components/header/Header';

import {HomeScreen} from '../screens/Dashboard/HomeScreen';
import {SearchScreen} from '../screens/Dashboard/Search/SearchScreen';

import {AddressScreen} from '../screens/Address/AddressScreen';
import {MapScreen} from '../screens/Address/Map';

import {MyOrdersScreen} from '../screens/Orders/MyOrders';
import {OrderDetailScreen} from '../screens/Orders/OrderDetail';

import {AccountManagement} from '../screens/Settings/AccountManagement';
import {ChangePasswordScreen} from '../screens/Settings/ChangePassword';
import {SendFeedbackScreen} from '../screens/Settings/SendFeedback';
import {CustomerSupportScreen} from '../screens/Settings/CustomerSupport';

const Stack = createStackNavigator();

export function DashboardNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search for dishes and restaurants',
          headerBackTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}

const AddressStack = createStackNavigator();

export function AddressNavigator() {
  return (
    <AddressStack.Navigator>
      <AddressStack.Screen
        name="Address"
        component={AddressScreen}
        options={{
          header: ({navigation}) => (
            <Header headerTitle={'My Addresses'} navigation={navigation} />
          ),
        }}
      />
      <AddressStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{headerBackTitle: ''}}
      />
    </AddressStack.Navigator>
  );
}

const OrderStack = createStackNavigator();

export function OrdersNavigator() {
  return (
    <OrderStack.Navigator screenOptions={{}}>
      <OrderStack.Screen
        name="MyOrders"
        component={MyOrdersScreen}
        options={{
          header: ({navigation}) => (
            <Header headerTitle={'My Orders'} navigation={navigation} />
          ),
        }}
      />
      <OrderStack.Screen
        name="OrderDetails"
        component={OrderDetailScreen}
        options={{title: 'Order Details', headerBackTitle: ''}}
      />
    </OrderStack.Navigator>
  );
}

const SettingStack = createStackNavigator();

export function SettingsNavigator() {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen
        name="AccountManagement"
        component={AccountManagement}
        options={{
          header: ({navigation}) => (
            <Header headerTitle={'Settings'} navigation={navigation} />
          ),
        }}
      />
      <SettingStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{title: 'Change Password', headerBackTitle: ''}}
      />
      <SettingStack.Screen
        name="SendFeedback"
        component={SendFeedbackScreen}
        options={{title: 'Send Feedback', headerBackTitle: ''}}
      />
      <SettingStack.Screen
        name="CustomerSupport"
        component={CustomerSupportScreen}
        options={{title: 'Customer Support', headerBackTitle: ''}}
      />
    </SettingStack.Navigator>
  );
}
