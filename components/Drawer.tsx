import Home from '../screens/Home';
import RestaurantsScreen from '../screens/Restaurants';
import QRCodeScreen from '../screens/QRCodeScreen';
import OrdersHistory from '../screens/Orders';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useState } from 'react';
import NavigationLayout from './Layouts/NavigationLayout';
import { getHeaderTitle } from '@react-navigation/elements';
import DrawerComponent from '../components/DrawerContent';
import MyProfile from '../screens/Profile';

//Icons Fonts
import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import { Icon } from '@rneui/themed';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const [urlMenu, setUrlMenu] = useState('');

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerComponent {...props} />}
      screenOptions={{
        header: ({ navigation, route, options }) => {
          const title = getHeaderTitle(options, route.name);
          return <NavigationLayout title={title} navigation={navigation} />;
        },
      }}
    >
      <Drawer.Screen
        name='Home'
        component={Home}
        options={{
          title: 'Home',
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons name='home' size={24} color='black' />
          ),
        }}
      />
      <Drawer.Screen
        name='Restaurants'
        component={RestaurantsScreen}
        options={{
          title: 'My Restaurants',
          drawerIcon: ({ focused, size }) => (
            <Ionicons name='md-restaurant-outline' size={24} color='black' />
          ),
        }}
      />
      <Drawer.Screen
        name='QRCodeScreen'
        component={QRCodeScreen}
        options={{
          title: 'QR Code',
          drawerIcon: ({ focused, size }) => (
            <AntDesign name='qrcode' size={24} color='black' />
          ),
        }}
      />
      <Drawer.Screen
        name='HistoryOrders'
        component={OrdersHistory}
        options={{
          title: 'My Orders & History',
          drawerIcon: ({ focused, size }) => (
            <FontAwesome5 name='receipt' size={24} color='black' />
          ),
        }}
      />
      <Drawer.Screen
        name='MyProfile'
        component={MyProfile}
        options={{
          title: 'My Profile',
          drawerIcon: ({ focused, size }) => (
            <MaterialCommunityIcons name='account' size={24} color='black' />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
