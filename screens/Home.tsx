import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { getToken } from '../utility/Token';
import React, { useContext } from 'react';
import { AppContextInterface, AppCtx } from '../store/context/app-context';

export default function Home() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { name } = useContext(AppCtx) as AppContextInterface;
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text
          style={styles.text}
          onPress={() => {
            navigation.navigate('QRCodeScreen');
            getToken('id');
          }}
        >
          {`Are you hungry? ${name}`}
        </Text>
        <Text style={styles.text} onPress={() => {}}>
          {' '}
          Go to my account
        </Text>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    margin: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
