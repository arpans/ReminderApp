/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';
import ReminderListScreen from './screens/ReminderListScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Color} from './utils';
import {Image, Platform, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const RouterComponent = route => {
  console.log('route', route);
  const DrawerStack = props => {
    console.log('props ', props.extraData.route.params);
    return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="ReminderScreen"
          component={ReminderListScreen}
          initialParams={{data: props.extraData.route.params}}
          options={{
            title: 'Dashboard',
            headerTintColor: Color.whiteColor,
            headerStyle: {
              backgroundColor: Color.primaryColor,
            },
            headerRight: () => (
              <Icon
                name="search"
                size={20}
                color="white"
                style={{marginRight: 10}}
              />
            ),
          }}
        />
        {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer options={{gestureEnabled: false}}>
      <Stack.Navigator
        initialRouteName={'Splash'}
        screenOptions={{gestureEnabled: false, headerShown: false}}
        options={{gestureEnabled: false, headerShown: null}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen
          name="Home"
          options={{drawerLockMode: 'locked-closed', gestureEnabled: false}}>
          {props => <DrawerStack {...props} extraData={props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouterComponent;
