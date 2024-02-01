import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Login from './app/screens/Login';
import List from './app/screens/List';
import Details from './app/screens/Details';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { FIREBASE_AUTH } from './FirebaseConfig';
import BottomTabNavigator from './BottomTabNavigator';
import * as SplashScreen from 'expo-splash-screen';
import AppLoading from 'expo-app-loading';
import {useFonts} from 'expo-font'
import LoadFonts from './hooks/useFonts';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="My todos" component={List} />
      <InsideStack.Screen name="Details" component={Details} />
    </InsideStack.Navigator>
  )  
}

export default function App() {
  const [user, setUser] = useState(null);
  //LoadFonts();
  const [fontsLoaded] = useFonts({
    'LoveYa': require('./assets/fonts/LoveYaLikeASister-Regular.ttf'),
  });
  

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user); 
      setUser(user); 
    });
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  
  if(!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView onLayout={onLayoutRootView}>
      <Text style={{ fontFamily: 'LoveYa', fontSize: 26, color: 'rgba(0,0,0,0.4)'}}>LoveYa</Text>
    </SafeAreaView>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName='Login'>
    //     {user ? (
    //       <Stack.Group>
    //         <Stack.Screen name="Mixtape" component={BottomTabNavigator} options={{ headerShown: false }}  />
    //       </Stack.Group>
    //     ) : (
    //       <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    //     )}
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

const fonts = StyleSheet.create({
  LoveYa: {
    fontFamily: "LoveYa"
  },
});

 
