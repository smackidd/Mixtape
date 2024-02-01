import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import theme from './styles/theme.style.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Tapes from './app/screens/Tapes.jsx';
import Account from './app/screens/Account.jsx';
import Create from './app/screens/Create.jsx';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator 
      initialRouteName="Tapes"
      barStyle={{ backgroundColor: theme.BOTTOM_BACKGROUND }}
    >
      <Tab.Screen 
        name="Tapes"
        component={Tapes}
        options={{
          tabBarLabel: "Tapes",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cassette" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="Create"
        component={Create}
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="label-multiple" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="Account"
        component={Account}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />

    </Tab.Navigator>
  )
}

export default BottomTabNavigator

const styles = StyleSheet.create({})