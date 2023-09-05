import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider as StoreProvider} from 'react-redux';
import {MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Provider} from 'react-redux';

import Navigation from './src/navigation';
import store from './src/redux/store';
import WithAxios from './src/lib/WithAxios';
import {ErrorContextProvider} from './src/context/ErrorProvider';
import {MsgContextProvider} from './src/context/MessageProvider';

const App = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const theme = {
    ...DefaultTheme,
    dark: false,
    roundness: 4,
    colors: {
      primary: 'rgb(0,92,121)',
      onPrimary: 'rgb(255, 255, 255)',
      primaryContainer: 'rgb(0,92,121)',
      onPrimaryContainer: 'rgb(255,255,255)', // for textColor/iconColor
      secondary: 'rgb(222,168,18)',
      onSecondary: 'rgb(255, 255, 255)',
      secondaryContainer: 'rgb(222,168,18)',
      onSecondaryContainer: 'rgb(150,114,12)', // for textColor/iconColor
      tertiary: 'rgb(56, 102, 101)',
      onTertiary: 'rgb(255, 255, 255)',
      tertiaryContainer: 'rgb(187, 236, 234)',
      onTertiaryContainer: 'rgb(0, 32, 31)',
      error: 'rgb(186, 26, 26)',
      onError: 'rgb(255, 255, 255)',
      errorContainer: 'rgb(255, 218, 214)',
      onErrorContainer: 'rgb(65, 0, 2)',
      background: 'rgb(253, 253, 245)',
      onBackground: 'rgb(26, 28, 24)',
      surface: 'rgb(253, 253, 245)',
      onSurface: 'rgb(26, 28, 24)',
      surfaceVariant: 'rgb(224, 228, 214)',
      onSurfaceVariant: 'rgb(68, 72, 62)',
      outline: 'rgb(116, 121, 109)',
      outlineVariant: 'rgb(196, 200, 186)',
      shadow: 'rgb(0, 0, 0)',
      scrim: 'rgb(0, 0, 0)',
      inverseSurface: 'rgb(47, 49, 44)',
      inverseOnSurface: 'rgb(241, 241, 234)',
      inversePrimary: 'rgb(129, 221, 54)',
      elevation: {
        level0: 'transparent',
        level1: 'rgba(0,92,121,0.05)',
        level2: 'rgba(0,92,121,0.08)',
        level3: 'rgba(0,92,121,0.11)',
        level4: 'rgba(0,92,121,0.12)',
        level5: 'rgba(0,92,121,0.14)',
      },
      surfaceDisabled: 'rgba(26, 28, 24, 0.12)',
      onSurfaceDisabled: 'rgba(26, 28, 24, 0.38)',
      backdrop: 'rgba(45, 50, 40, 0.4)',
      custom0: 'rgb(135, 82, 0)',
      onCustom0: 'rgb(255, 255, 255)',
      custom0Container: 'rgb(255, 221, 186)',
      onCustom0Container: 'rgb(43, 23, 0)',
    },
  };

  return (
    <SafeAreaProvider>
      <Provider
        store={store}
        theme={theme}
        settings={{
          icon: props => <AntDesign {...props} />,
        }}>
        <WithAxios />
        <StoreProvider store={store}>
          <ErrorContextProvider>
            <MsgContextProvider>
              <Navigation />
            </MsgContextProvider>
          </ErrorContextProvider>
        </StoreProvider>
      </Provider>
    </SafeAreaProvider>
  );
};
export default App;
