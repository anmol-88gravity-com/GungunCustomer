import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from '../screens/Profile/ProfileScreen';
import AccountManagement from '../screens/Customer/AccountManagement/AccountManagementScreen';
import HomeStack from './HomeStack';
import CustomerFeedback from '../screens/Customer/CustomerFeedback/CustomerFeedbackScreen';
import { Font_Family } from '../utils/Fontfamily';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { Colors } from '../utils/Colors';
import { FONT_SIZES } from '../utils/FontSize';

const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: '#7E7E7E',
                headerShown: false,
                tabBarShadowOpacity: true,
                tabBarStyle: {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 80,
                    elevation: 4,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                },
                tabBarLabelStyle: {
                    fontSize: FONT_SIZES.tweleve,
                    fontFamily: Font_Family.medium,
                    bottom: Platform.OS === 'android' ? 10 : 0
                },

            }}

        >
            <Tab.Screen name="Home" component={HomeStack} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color === Colors.primary ? Colors.primary : '#B3B3B3'} size={26} />
                ),

            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarLabel: 'Favourites',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="cards-heart-outline" color={color === Colors.primary ? Colors.primary : '#B3B3B3'} size={26} />
                ),

            }} />

            <Tab.Screen name="Account" component={AccountManagement} options={{
                tabBarLabel: 'Search',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="file-search-outline" color={color === Colors.primary ? Colors.primary : '#B3B3B3'} size={26} />
                ),
            }} />

            <Tab.Screen name="Notification" component={AccountManagement} options={{
                tabBarLabel: 'Notification',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="bell-outline" color={color === Colors.primary ? Colors.primary : '#B3B3B3'} size={26} />
                ),
            }} />

            <Tab.Screen name="Cart" component={CustomerFeedback} options={{
                tabBarLabel: 'Cart',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="cart-outline" color={color === Colors.primary ? Colors.primary : '#B3B3B3'} size={26} />
                ),
            }} />

        </Tab.Navigator>
    );
}
export default TabNavigator;