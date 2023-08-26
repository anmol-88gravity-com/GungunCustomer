import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/HomeScreen';
import Profile from '../screens/Profile/ProfileScreen';
import 'react-native-gesture-handler';
import CustomerSupport from '../screens/Customer/CustomerSupport/CustomerSupportScreen';
import CustomerFeedback from '../screens/Customer/CustomerFeedback/CustomerFeedbackScreen';
import FeedbackForm from '../screens/Customer/CustomerFeedback/FeedbackForm';
import AccountManagement from '../screens/Customer/AccountManagement/AccountManagementScreen';
import ChangePassword from '../screens/ChangePassword/ChangePasswordScreen';
import { SearchScreen } from '../screens/Home/Search/SearchScreen';


const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Home" component={Home} />
             <Stack.Screen name="Profile" component={Profile} /> 
             <Stack.Screen name="AccountManagement" component={AccountManagement} /> 
             <Stack.Screen name="CustomerSupport" component={CustomerSupport} />
             <Stack.Screen name="FeedbackForm" component={FeedbackForm}/>
             <Stack.Screen name="ChangePass" component={ChangePassword}/>
             <Stack.Screen name="Customer Feedback" component={CustomerFeedback} />
             <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>

    );
}
export default HomeStack;