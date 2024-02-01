import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ResponseType, exchangeCodeAsync, makeRedirectUri, useAuthRequest } from 'expo-auth-session';

const SpotifyLogin = () => {
  const navigation = useNavigation();

  
  
  const config = {
    responseType: ResponseType.Code,
    clientId: "5385ce9a6ac34ef7b724d22ec1dd1cb2",
    clientSecret: "6de93e01fa33470fb630b8f9b176902e",
    scopes: [
      "user-read-email",
      "user-read-private",
      "user-library-read",
      "user-read-recently-played",
      "user-top-read",
      "user-follow-read",
      "user-modify-playback-state",
      "playlist-read-private",
      "playlist-read-collaborative",
      "playlist-modify-public",
    ],
    usePKCE: false,
    redirectUri: "exp://10.0.0.45:8081/auth",   
  }
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token"  
  }
  const [request, response, promptAsync] = useAuthRequest(
    {
      ...config,
      extraParams: {
        show_dialog: true,
      },
    }, 
    discovery
  );

  useEffect( () => {
    if(response?.type === "success"){
      const {code} = response.params; 
      console.log('code: ', code);
      exchangeCodeAsync(
        {
          code,
          clientId: '5385ce9a6ac34ef7b724d22ec1dd1cb2',
          clientSecret: '6de93e01fa33470fb630b8f9b176902e',
          redirectUri: 'exp://10.0.0.45:8081/auth'
        },
        discovery
      )
        .then(result => {
          console.log("token", result);
          storeData(result)
        })
        .catch(error => {
          console.error(error);
        })
      //storeData(access_token);
      navigation.navigate("Mixtape");
    }  
  }, [response])
  
  const storeData = async (result) => {
    try {
      await AsyncStorage.setItem('token', result.accessToken)
      await AsyncStorage.setItem('refresh', result.refreshToken)
      await AsyncStorage.setItem('issuedAt', JSON.stringify(result.issuedAt))
      await AsyncStorage.setItem('expiresIn', JSON.stringify(result.expiresIn))
    } catch (e) {
      console.log(e.message);
    }
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
        <Text>Sign in with Spotify</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SpotifyLogin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111'
  },
  button: {
    width: '75%',
    height: 35,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  } 
})