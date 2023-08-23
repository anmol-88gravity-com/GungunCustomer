import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator } from 'react-native';
import Navigation from './src/navigation';
import SplashScreen from 'react-native-splash-screen';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Navigation />

    </View>
  )
}
export default App;