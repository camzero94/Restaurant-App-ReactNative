import { StyleSheet, TextInput, Image, Alert } from 'react-native';
import JWT from 'expo-jwt';
import { View, Text } from '../components/Themed';
import { useState, useEffect } from 'react';
import { Button } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { setToken, getToken, deleteToken } from '../utility/Token';
import { isAuth } from '../utility/Auth';
import React, { Component } from 'react';

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submitLogin = async () => {
    console.log('Submited Login');

    try {
      setLoading(true);
      let valid = true;

      if (email === '' || password === '') {
        valid = false;
      }
      console.log(valid);
      console.log(`Email ==>${email}\nPassword==>${password}\n`);

      if (!valid) {
        setError('Error, must fill correctly form');
        setLoading(false);
        return;
      }

      const form_data = new FormData();
      form_data.append('username', email);
      form_data.append('password', password);

      // const request = new Request('http://localhost:8000/api/signup', {
      //   method: 'POST',
      //   body: form_data,
      // });

      if (form_data) {
        console.log('enter here');

        const response: Response = await fetch(
          // 'http://10.0.2.2:8000/api/token',
          'https://0ce9-36-237-104-33.ngrok.io/api/token',
          {
            method: 'POST',
            body: form_data,
          }
        );

        if (response.status === 500) {
          throw new Error('Internal Server Error');
        }

        const data = await response.json();
        console.log(data);
        if (response.status > 400 && response.status < 500) {
          if (data.detail) {
            throw data.detail;
          }
        }
        if ('access_token' in data) {
          const decodeToken: any = JWT.decode(data['access_token'], 'SECRET');
          try {
            setToken('token', data['access_token']);
            setToken('permissions', decodeToken.permissions);
            setToken('id', decodeToken.id.toString());
            navigation.navigate('DrawerNavigator');
          } catch (e) {
            console.log('Error ' + e);
          }
          // const result = getToken('token');
        }
      }
    } catch (e) {
      console.log('Error' + e);
      setError('Error while Post');
      setLoading(false);
    }
  };

  const showAlert = () => {
    Alert.alert('Error', `${error}`);
    setError(null);
  };

  useEffect(() => {
    // (async () => {
    //   const token = await getToken('permissions');
    //   const token2 = await getToken('token');
    //   const token3 = await getToken('id');
    //   console.log(`Permissions=>${token}\nToken==>${token2}\nId==>${token3}`);
    // })();
    (async () => {
      if ((await isAuth()) && (await getToken('id')) !== '') {
        navigation.navigate('DrawerNavigator');
      }
    })();
  }, []);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <SafeAreaView style={styles.outtercontainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.titleHeader}>Welcome</Text>
        <Text style={styles.subHeader}>Login back into your account</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Image
          style={styles.imageTerser}
          source={require('../assets/images/terserLogo.png')}
        />
        <TextInput
          style={styles.inputField}
          placeholder={'Enter Email'}
          onChangeText={(newEmail) => setEmail(newEmail)}
        />
        <View
          style={styles.separatorInput}
          lightColor='#eee'
          darkColor='rgba(255,255,255,0.1)'
        />
        <TextInput
          style={styles.inputField}
          placeholder={'Enter Password'}
          onChangeText={(newPwd) => setPassword(newPwd)}
        />
        <View
          style={styles.separatorInput}
          lightColor='#eee'
          darkColor='rgba(255,255,255,0.1)'
        />
        <View style={styles.button}>
          <Button
            title={'Login'}
            onPress={() => {
              // (async () => {
              //   const token = await deleteToken('permissions');
              //   const token2 = await deleteToken('token');
              //   const token3 = await deleteToken('id');
              //   console.log(
              //     `Permissions=>${token}\nToken==>${token2}\nId==>${token3}`
              //   );
              // })();

              // console.log('enter here 1');
              // try {
              //   (async () => {
              //     console.log('enter here 2');
              //     const response = await fetch('http://localhost:8000/1');
              //     const data = await response.json();
              //     console.log(`the response is ${data}`);
              //   })();
              // } catch (e) {
              //   console.log(`the Error is ${e}`);
              // }

              // navigation.navigate('DrawerNavigator');
              submitLogin();
            }}
          />
        </View>
      </View>

      <View style={styles.alreadyJoin}>
        <Text>Don't you have an account yet?</Text>
        <Text
          style={{ color: 'blue', marginLeft: 2 }}
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        >
          Join Now{' '}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outtercontainer: {
    flexDirection: 'column',
  },
  headerContainer: {
    margin: 10,
    marginLeft: 35,
  },
  titleHeader: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  subHeader: {
    marginTop: 5,
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: '500',
    color: 'gray',
  },
  container: {
    elevation: 4,
    borderRadius: 20,
    height: 450,
    width: 300,
    marginTop: 20,
    marginLeft: 50,
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  imageTerser: {
    height: 150,
    width: 500,
    transform: [{ scale: 0.5 }],
  },
  separatorInput: {
    height: 1,
    width: '80%',
  },
  inputField: {
    marginTop: 3,
    height: 35,
    width: '80%',
    backgroundColor: '#fff',
  },

  button: {
    marginTop: 20,
    width: '80%',
  },
  alreadyJoin: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
  },
});

export default Login;
