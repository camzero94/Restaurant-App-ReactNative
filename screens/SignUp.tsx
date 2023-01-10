import { StyleSheet, TextInput, Image, Alert } from 'react-native';
import { View, Text } from '../components/Themed';
import { useEffect, useState } from 'react';
import { Button } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import JWT from 'expo-jwt';
import { getToken, setToken, deleteToken } from '../utility/Token';
import { isAuth } from '../utility/Auth';
import React from 'react';

function SignUp() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmationPwd, setconfirmationPwd] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const submitSignUp = async () => {
    console.log('Submited');
    if (password !== confirmationPwd) {
      setError('Password Do Not Match');
      return;
    }
    try {
      setLoading(true);
      let valid = true;

      if (email === '' || password === '' || confirmationPwd === '') {
        valid = false;
      }
      console.log(valid);
      console.log(
        `Email ==>${email}\nPassword==>${password}\nConfirmation==>${confirmationPwd}`
      );

      if (!valid) {
        setError('Error, must fill correctly form');
        setLoading(false);
        return;
      }

      const form_data = new FormData();
      form_data.append('username', email);
      form_data.append('password', password);

      if (form_data) {
        console.log('enter here');
        console.log(form_data);
        const response: Response = await fetch(
          // 'http://10.0.2.2:8000/api/signup',
          'https://0ce9-36-237-104-33.ngrok.io/api/signup',
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
            setUserId(decodeToken.id);
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
    (async () => {
      if ((await isAuth()) && (await getToken('id')) !== '') {
        console.log('Go to navigation');
        navigation.navigate('DrawerNavigator');
      }
    })();
  }, []);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <SafeAreaView style={styles.outtercontainer}>
      {error && showAlert()}

      <View style={styles.headerContainer}>
        <Text style={styles.titleHeader}>Welcome</Text>
        <Text style={styles.subHeader}>Signup into your account</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <Image
          style={styles.imageTerser}
          source={require('../assets/images/terserLogo.png')}
        />
        <TextInput
          style={styles.inputField}
          placeholder={'Enter Email'}
          onChangeText={(newEmail) => {
            setEmail(newEmail);
          }}
        />
        <View
          style={styles.separatorInput}
          lightColor='#eee'
          darkColor='rgba(255,255,255,0.1)'
        />
        <TextInput
          style={styles.inputField}
          placeholder={'Enter Password'}
          onChangeText={(newPassword) => {
            setPassword(newPassword);
          }}
        />
        <View
          style={styles.separatorInput}
          lightColor='#eee'
          darkColor='rgba(255,255,255,0.1)'
        />
        <TextInput
          style={styles.inputField}
          placeholder={'Confirm Password'}
          onChangeText={(newConfirmationPwd) => {
            setconfirmationPwd(newConfirmationPwd);
          }}
        />
        <View
          style={styles.separatorInput}
          lightColor='#eee'
          darkColor='rgba(255,255,255,0.1)'
        />
        <View style={styles.button}>
          <Button
            title={'Sign Up'}
            onPress={() => {
              // (async () => {
              //   const token = await deleteToken('permissions');
              //   const token2 = await deleteToken('token');
              //   const token3 = await deleteToken('id');
              //   console.log(token);
              // })();
              submitSignUp();
            }}
          />
        </View>
      </View>

      <View style={styles.alreadyJoin}>
        <Text>Have already an account?</Text>
        <Text
          style={{ color: 'blue', marginLeft: 2 }}
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          Login{' '}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outtercontainer: {
    flexDirection: 'column',
  },
  headerContainer: {
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
    marginTop: 10,
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

export default SignUp;
