import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppCtx, AppContextInterface } from '../store/context/app-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { getToken } from '../utility/Token';
import React, { useContext, useEffect } from 'react';

export default function OrderMenuScreen() {
  const { url, setUrl } = useContext(AppCtx) as AppContextInterface;

  useEffect(() => {}, []);

  return (
    <View>
      <Text>{url}</Text>
    </View>
  );
}
