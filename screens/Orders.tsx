import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { getToken } from '../utility/Token';
import NavigationLayout from '../components/Layouts/NavigationLayout';
import React from 'react';

export default function OrdersHistory() {
  return (
    <SafeAreaProvider>
      <View>
        <Text>Orders History</Text>
      </View>
    </SafeAreaProvider>
  );
}
