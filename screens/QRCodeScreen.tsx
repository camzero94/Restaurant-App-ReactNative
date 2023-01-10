import { StyleSheet, View, Text, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import React, { useContext } from 'react';
import { AppCtx, AppContextInterface } from '../store/context/app-context';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
// interface ICameraType {
//   type: string;
//   data: string;
// }

export default function QRCodeScreen() {
  const isFocused = useIsFocused();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const { setUrl, url } = useContext(AppCtx) as AppContextInterface;
  let result;

  const askForCamaraPermission = () => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log(status);
      setHasPermission(status == 'granted'); //Return true if permission granted
    })(); // Return a promess
  };

  useEffect(() => {
    console.log('Enter');
    askForCamaraPermission();
  }, []);

  console.log(`The Data  Outside is ==================${url} `);

  //  Check Permissions and return screen
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission DENIED!!</Text>
        <Button
          title={'Allow Camera'}
          onPress={() => askForCamaraPermission()}
        />
      </View>
    );
  }

  return (
    isFocused && (
      <View style={styles.container}>
        <View style={styles.barcodebox}>
          <Camera
            onBarCodeScanned={(...args) => {
              const data = args[0].data;
              result = JSON.stringify(data);
              setUrl ? setUrl(result) : null;
              navigation.navigate('OrderMenuScreen');
            }}
            barCodeScannerSettings={{
              barCodeTypes: ['qr'],
            }}
            style={{ height: 400, width: 400 }}
          />
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
  },
  mainText: {
    fontSize: 16,
    margin: 20,
  },
});
