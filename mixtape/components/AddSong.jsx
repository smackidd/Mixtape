import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import theme from '../styles/theme.style';


const AddSong = () => {
  const navigation = useNavigation(); 
  const [fontsLoaded] = useFonts({
    'LoveYa': require('../assets/fonts/LoveYaLikeASister-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const addSong = () => {
    navigation.navigate("SpotifyBrowse");
  }

  return (
    <View style={styles.container}>
      <View style={styles.songInfo}>
        <Text style={[styles.songText, { fontFamily: "LoveYa" }]}>Add New Song</Text>
      </View>
      <View style={styles.songTime}>
        <TouchableOpacity style={{flex: 1, justifyContent: "center"}} onPress={() => addSong()}>
          <MaterialCommunityIcons name="plus-box" color={theme.TAPE3_BACKGROUND} size={26} />
        </TouchableOpacity>
      </View>
  </View>
  )
}

export default AddSong

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderRadius: 1,
    borderColor: theme.CREATE_BORDER
  },
  songInfo: {
    flex: 4,
    paddingVertical: 10,
    paddingLeft: 5,
    borderRightWidth: 1,
    borderColor: theme.CREATE_BORDER
  },
  songTime: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingLeft: 5, 
  },
  songText: {
    fontSize: 20,
    color: theme.TAPE3_BACKGROUND
  },
})