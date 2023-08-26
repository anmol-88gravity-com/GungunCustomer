import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import CustomerSupport from '../screens/Customer/CustomerSupport/CustomerSupportScreen';
import CustomerFeedback from '../screens/Customer/CustomerFeedback/CustomerFeedbackScreen';
import FeedbackForm from '../screens/Customer/CustomerFeedback/FeedbackForm';
import TabNavigator from './BottomTabNavigator';
import { SearchScreen } from '../screens/Home/Search/SearchScreen';

const Stack = createStackNavigator();

function RootStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="CustomerSupport" component={CustomerSupport} />
      <Stack.Screen name="FeedbackForm" component={FeedbackForm} />
      <Stack.Screen name="Customer Feedback" component={CustomerFeedback} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}
export default RootStackNavigator;
