import { ActivityIndicator, Button, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Input } from 'react-native-elements';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true); 
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
    } catch (error) {
        console.log(error);
        alert('Sign In failed' + error.message);
    } finally {
        setLoading(false);
    }
  }

  const signUp = async () => {
    setLoading(true); 
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log(response);
        alert("Check your emails");
    } catch (error) {
        console.log(error);
        alert("Sing up failed" + error.message)
    } finally {
        setLoading(false);
    }
  }

  return (
        <ImageBackground style={styles.backgroundImage} source={require("../../assets/Login_splash2.png")}>
    <SafeAreaView style={styles.container} >
      <KeyboardAvoidingView behavior='padding'>
            <TextInput 
                style={styles.input} 
                placeholder="Email" 
                placeholderTextColor="#fccccd"
                autoCapitalize="none"
                onChangeText={(text) => {
                    setEmail(text);
                }}
                value={email}
            />
            <TextInput 
                style={styles.input} 
                placeholder="Password"
                placeholderTextColor="#fccccd"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(text) => {
                    setPassword(text);
                }}
                value={password}
            />
            {loading ? 
                <ActivityIndicator size="large" color="#0000ff" /> 
            :
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.loginButton} title="Login" onPress={signIn} >
                    <Text >Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signUpButton} title="Create Account" onPress={signUp} >
                    <Text >Create Account</Text>   
                </TouchableOpacity>
            </View>
            }
      </KeyboardAvoidingView>
    </SafeAreaView>
        </ImageBackground>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        // marginHorizontal: 10,
        flex: 1,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'   
    },
    input: {
        marginVertical: 5,
        height: 50,
        borderWidth: 1,
        //borderRadius: 2,
        // ...Platform.select({
        //     ios: {
        //       shadowColor: 'black',
        //       shadowOffset: { width: 5, height: 10 },
        //       shadowRadius: 5,
        //       shadowOpacity: 0.25,
        //     },
        //     android: {
        //       elevation: 4, // Elevation is equivalent to shadow for Android
        //     },
        // }),
        padding: 10,
        borderRadius: 10,
        color: "#fccccd",
        backgroundColor: '#515965'
    }, 
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' or 'contain'
        justifyContent: 'center', // Optional: Align content vertically
        alignItems: 'center', // Optional: Align content horizontally
    },
    buttonContainer: {
        marginTop: 20,
        flex: 1,
        flexDirection: "row"
    },
    loginButton: {
        width: 150,
        height: 75,
        marginRight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#99f0d1', // Set the background color
        // ...Platform.select({
        //     ios: {
        //       shadowColor: 'black',
        //       shadowOffset: { width: 5, height: 10 },
        //       shadowRadius: 5,
        //       shadowOpacity: 0.25,
        //     },
        //     android: {
        //       elevation: 4, // Elevation is equivalent to shadow for Android
        //     },
        // }),
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    signUpButton: {
        width: 150,
        height: 75,
        //marginRight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#84c2d4', // Set the background color
        // ...Platform.select({
        //     ios: {
        //       shadowColor: 'black',
        //       shadowOffset: { width: 5, height: 10 },
        //       shadowRadius: 5,
        //       shadowOpacity: 0.25,
        //     },
        //     android: {
        //       elevation: 4, // Elevation is equivalent to shadow for Android
        //     },
        // }),
        padding: 10,
        
        borderRadius: 10,
        marginTop: 10,
    }
})