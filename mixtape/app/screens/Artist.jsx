import { Button, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getArtist, getArtistsAlbums, getArtistsTopTracks } from '../../api_calls/Artists';
import BrowseHeader from '../../components/BrowseHeader';
import { useNavigation, Link } from '@react-navigation/native';
import SpotifySong from '../../components/SpotifySong';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpotifyAlbum from '../../components/SpotifyAlbum';
import { getArtistsPlaylists } from '../../api_calls/Playlists';
import SpotifyPlaylist from '../../components/SpotifyPlaylist';


const Artist = ({route}) => {
  const { params } = route;
  const { id } = params;
  const navigation = useNavigation();
  const [artist, setArtist] = useState([]);
  const [artistsTopTracks, setArtistsTopTracks] = useState([]);
  const [artistsTopAlbums, setArtistsTopAlbums] = useState([]);
  const [artistsPlaylists, setArtistsPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  

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
      const artistsPlaylists = await getArtistsPlaylists(artist.name, 5, 0 );
      setArtist(artist);
      setArtistsTopTracks(topTracks);
      setArtistsTopAlbums(topAlbums);
      setArtistsPlaylists(artistsPlaylists);
      console.log("artistsPlaylists", artistsPlaylists.playlists.items)
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

  const getPlaylist = (id, name, image) => {
    navigation.navigate("SpotifyPlaylistTracks", {
      id,
      playlistName: name,
      playlistImage: image
    });
  }

  handleHorizontalScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY !== 0) {
      setScrollEnabled(false);
    } else {
      setScrollEnabled(true);
    }  
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <BrowseHeader headerName="" />
      ) : (
        <>
        
        <BrowseHeader headerName={artist.name} closeScreen={previousScreen} />
          <ImageBackground source={{uri: artist.images[0]?.url}} style={styles.coverArt}>
            <View style={styles.artistNameContainer}>
              <Text style={styles.artistHeader}>{artist.name}</Text>
            </View>
          </ImageBackground>
          <ScrollView scrollEnabled={scrollEnabled} style={styles.scrollView}>
            <View style={styles.songList}>
              <Text style={styles.songListHeader}>Popular Songs</Text>
              {artistsTopTracks.tracks.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => {
                  //navigation.setParams({selectedSong: item})
                  navigation.navigate("Create", { selectedSong: item });
                    
                  }
                }>
                    <SpotifySong song={item} />  
                </TouchableOpacity>  
              ))}
              <Text style={styles.songListHeader}>Latest Releases</Text>
              {artistsTopAlbums.items.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => {getAlbum(item.id)}}>
                    <SpotifyAlbum album={item} />  
                </TouchableOpacity>  
              ))}
              <View style={styles.discographyButton}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SpotifyArtistAlbums", {artistId: artist.id})}>
                  <Text style={styles.buttonText}>See discography</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.songListHeader}>Related Playlists</Text>
              <ScrollView horizontal onScroll={handleHorizontalScroll}>
                {artistsPlaylists.playlists.items.map((item, index) => (
                  <TouchableOpacity key={index} onPress={() => {getPlaylist(item.id, item.name, item.images[0])}}>
                      <SpotifyPlaylist playlist={item} />  
                  </TouchableOpacity>  
                ))}
              </ScrollView>
            </View>

            
          </ScrollView>
        </>
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
    fontSize: 20,
    color: "#fff",
    marginTop: 30,
    marginBottom: 10
  }, 
  discographyButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff'
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
})