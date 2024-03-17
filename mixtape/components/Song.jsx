import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { GetArtistSeparator } from '../helpers/ArtistSeparator';
import { formatDuration } from '../helpers/SongDurationFormat';

const Song = (props) => {
  const navigation = useNavigation();
  const { song } = props;
  const allArtists = GetArtistSeparator(song.artists);
  const duration = formatDuration(song.duration);
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
    <>
      <View style={styles.container}>
        <View style={styles.songInfo}>
        
            <Text style={[styles.songText, { fontFamily: "LoveYa" }]}> {song?.name} - {allArtists} </Text>
          
        </View>
        <View style={styles.songTime}>
            <Text style={[styles.songText, { fontFamily: "LoveYa" }]}>{duration}</Text>
        </View>
      </View>
    
    </>
  )
}

export default Song

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderRadius: 1,
    borderColor: 'rgba(0,0,0,0.25)'
  },
  songInfo: {
    flex: 4,
    paddingVertical: 10,
    paddingLeft: 5,
    borderRightWidth: 1,
    borderColor: 'rgba(0,0,0,0.25)'
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
    //color: 'rgba(2, 75, 191, 0.9 )'
    color: 'rgba(0,0,0,0.5)'
  },
})