import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getArtist, getArtistsAlbums, getArtistsTopTracks } from '../../api_calls/Artists';
import BrowseHeader from '../../components/BrowseHeader';
import { useNavigation, Link } from '@react-navigation/native';
import SpotifySong from '../../components/SpotifySong';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpotifyAlbum from '../../components/SpotifyAlbum';


const Artist = ({route}) => {
  const { params } = route;
  const { id } = params;
  const navigation = useNavigation();
  const [artist, setArtist] = useState([]);
  const [artistsTopTracks, setArtistsTopTracks] = useState([]);
  const [artistsTopAlbums, setArtistsTopAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const previousScreen = () => {
    navigation.goBack();
  }

  const artistData = async () => {
    try {
      const artist = await getArtist(id);
      const topTracks = await getArtistsTopTracks(id);
      const albumLimit = 5;
      const albumOffset = 0;
      const topAlbums = await getArtistsAlbums(id, albumLimit, albumOffset)
      console.log(topTracks);
      setArtist(artist);
      setArtistsTopTracks(topTracks);
      setArtistsTopAlbums(topAlbums);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }



  // const addSong = async (song) => {
  //   console.log("addSong", song.name)
  //   await AsyncStorage.setItem('SpotifySongName', song.name)
  // }

  useEffect(() => {
    artistData();
  }, [])

  const getAlbum = (id) => {
    navigation.navigate("Album", {
      id
    });
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <BrowseHeader headerName="" />
      ) : (
        <ScrollView style={styles.scrollView}>
          <BrowseHeader headerName={artist.name} closeScreen={previousScreen} />
          <ImageBackground source={{uri: artist.images[0]?.url}} style={styles.coverArt}>
            <View style={styles.artistNameContainer}>
              <Text style={styles.artistHeader}>{artist.name}</Text>
            </View>
          </ImageBackground>
          <View style={styles.songList}>
            <Text style={styles.songListHeader}>Popular Songs</Text>
            <FlatList 
              data={artistsTopTracks.tracks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {
                  //navigation.setParams({selectedSong: item})
                  navigation.navigate("Create", { selectedSong: item });
                     
                  }
                }>
                    <SpotifySong song={item} />  
                </TouchableOpacity>
              )}
            />
            <Text style={styles.songListHeader}>Latest Releases</Text>
              <FlatList 
                data={artistsTopAlbums.items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => {getAlbum(item.id)}
                  }>
                      <SpotifyAlbum song={item} />  
                  </TouchableOpacity>
                )}
              />
          </View>

          
        </ScrollView>
      )}
    </View>
  )
}

export default Artist

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#111'  
  },
  scrollView: {
    flex: 1,
  },
  artistHeader: {
    fontSize: 36,
    color: "#fff",
    margin: 10
  }, 
  coverArt: {
    height: 240,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  artistNameContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  songList: {
    padding: 10
  },
  songListHeader: {
    fontSize: 26,
    color: "#fff",
    marginBottom: 5
  }
})