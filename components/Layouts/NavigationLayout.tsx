import { View, Text } from '../Themed';
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { Header as HeaderRNE, HeaderProps } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import react from 'react';
import React, { Component } from 'react';

//Icons Fonts
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

interface IProps {
  children?: React.ReactNode;
  title?: string;
  navigation?: any;
}

const NavigationLayout: React.FC<IProps> = ({
  navigation,
  children,
  title,
}) => {
  return (
    <>
      <HeaderRNE
        leftComponent={
          <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
            <Pressable onPress={() => navigation.openDrawer()}>
              <MaterialIcons
                name='menu'
                size={24}
                color='white'
                style={{ backgroundColor: '#2089DC' }}
              />
            </Pressable>
          </View>
        }
        rightComponent={
          <View style={styles.headerRight}>
            <View style={styles.headerRightFav}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Restaurants')}
              >
                <FontAwesome5
                  name='hand-holding-heart'
                  size={22}
                  color='white'
                />
              </TouchableOpacity>
            </View>
            <View style={styles.headerLeftFav}>
              <TouchableOpacity
                onPress={() => navigation.navigate('HistoryOrders')}
              >
                <FontAwesome5 name='receipt' size={22} color='white' />
              </TouchableOpacity>
            </View>
          </View>
        }
        centerComponent={{ text: `${title}`, style: styles.heading }}
      />
      <View style={styles.container}>{children}</View>
    </>
  );
};

export default NavigationLayout;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  headerRight: {
    margin: 5,
    backgroundColor: '#2089DC',
    display: 'flex',
    flexDirection: 'row',
  },
  headerRightFav: {
    backgroundColor: '#2089DC',
    marginRight: 10,
  },
  headerLeftFav: {
    backgroundColor: '#2089DC',
  },
  heading: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
