import { getToken, deleteToken } from '../utility/Token';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { Avatar } from '@rneui/themed';
import { Divider } from '@rneui/themed';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';

const DrawerComponent = (props: DrawerContentComponentProps) => {
  return (
    <View style={style.constainer}>
      <DrawerContentScrollView
        contentContainerStyle={{ flex: 1, backgroundColor: '#F1F7F9' }}
      >
        <View style={style.profileContainer}>
          <ImageBackground
            source={require('../assets/images/background.png')}
            style={{ flex: 1, paddingTop: 102, paddingLeft: 20 }}
          >
            <Avatar
              overlayContainerStyle={{
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
              size={80}
              rounded
              title='CQ'
              containerStyle={{
                backgroundColor: '#F4A261',
                marginBottom: 5,
              }}
            ></Avatar>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#1F1F1F',
                marginLeft: 12,
              }}
            >
              Camilo Quinones Pardo{' '}
            </Text>
          </ImageBackground>
        </View>
        <DrawerItemList {...props} />
        <Divider />
        <DrawerItem label='Settings' onPress={() => {}} />
        <DrawerItem
          label='Log Out'
          onPress={() => {
            (async () => {
              const token = await deleteToken('permissions');
              const token2 = await deleteToken('token');
              const token3 = await deleteToken('id');

              console.log(
                `Permissions=>${token}\nToken==>${token2}\nId==>${token3}`
              );
              props.navigation.navigate('Login');
            })();
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  profileContainer: {
    maxHeight: 225,
    height: 225,
  },
});

export default DrawerComponent;
