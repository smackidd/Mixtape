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
import SpotifyLogin from './app/screens/SpotifyLogin';
import SpotifyBrowse from './app/screens/SpotifyBrowse';
import Artists from './app/screens/Artists';
import Artist from './app/screens/Artist';
import Album from './app/screens/Album';
import SpotifyArtistAlbums from './app/screens/SpotifyArtistAlbums';
import SpotifyPlaylistTracks from './app/screens/SpotifyPlaylistTracks';
import Albums from './app/screens/Albums';
import Playlists from './app/screens/Playlists';
import Moods from './app/screens/Moods';
import Categories from './app/screens/Categories';
import Category from './app/screens/Category';


const Stack = createNativeStackNavigator();

//const InsideStack = createNativeStackNavigator();




const SpotifyStack = createNativeStackNavigator();
function SpotifySearchLayout() {

  return (
    <SpotifyStack.Navigator screenOptions={{ headerShown: false }}>
      <SpotifyStack.Screen name="Explore" component={SpotifyBrowse} />
      <SpotifyStack.Screen name="Artists" component={Artists} />
      <SpotifyStack.Screen name="Artist" component={Artist} />
      <SpotifyStack.Screen name="Album" component={Album} />
      <SpotifyStack.Screen name="Albums" component={Albums} />
      <SpotifyStack.Screen name="Playlists" component={Playlists} />
      <SpotifyStack.Screen name="Categories" component={Categories} />
      <SpotifyStack.Screen name="Category" component={Category} />
      <SpotifyStack.Screen name="Moods" component={Moods} />
      <SpotifyStack.Screen name="SpotifyArtistAlbums" component={SpotifyArtistAlbums} />
      <SpotifyStack.Screen name="SpotifyPlaylistTracks" component={SpotifyPlaylistTracks} />
    </SpotifyStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState(null);
  
  
  

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user); 
      setUser(user); 
    });
  }, [])

  

  return ( 
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false}}>
        {user ? (
          <>
            <Stack.Group>
              <Stack.Screen name="Mixtape" component={BottomTabNavigator} options={{ headerShown: false }}  />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal'}}>
              <Stack.Screen name="SpotifyLogin" component={SpotifyLogin}  />
              <Stack.Screen name="SpotifyBrowse" component={SpotifySearchLayout} gestureEnabled={false} />
            </Stack.Group>
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const fonts = StyleSheet.create({
  
});

 
