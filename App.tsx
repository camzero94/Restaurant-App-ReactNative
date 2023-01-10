import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Home from './screens/Home';
import QRCodeScreen from './screens/QRCodeScreen';
import RestaurantsScreen from './screens/Restaurants';
import OrderMenuScreen from './screens/OrderMenuScreen';
import NavigationLayout from './components/Layouts/NavigationLayout';
import DrawerNavigator from './components/Drawer';
import React from 'react';
import AppContextProvider from './store/context/app-context';

export type RootStackParams = {
  Login: any;
  SignUp: any;
  Home: any;
  QRCodeScreen: any;
  RestaurantsScreen: any;
  DrawerNavigator: any;
  OrderMenuScreen: any;
};
export const RootStack = createStackNavigator<RootStackParams>();

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContextProvider>
        <NavigationContainer theme={navTheme}>
          <RootStack.Navigator
            initialRouteName='Login'
            screenOptions={{ headerShown: false }}
          >
            <RootStack.Screen
              name='Login'
              component={Login}
              options={{ headerShown: false }}
            />
            <RootStack.Screen name='SignUp' component={SignUp} />
            <RootStack.Screen name='Home' component={Home} />
            <RootStack.Screen name='QRCodeScreen' component={QRCodeScreen} />
            <RootStack.Screen
              name='OrderMenuScreen'
              component={OrderMenuScreen}
            />

            <RootStack.Screen
              name='DrawerNavigator'
              component={DrawerNavigator}
            />

            <RootStack.Screen
              name='RestaurantsScreen'
              component={RestaurantsScreen}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </AppContextProvider>
    </SafeAreaProvider>
  );
}

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};
