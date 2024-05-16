import { FlatList, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { getPlaylistItems } from '../../api_calls/Playlists';
import BrowseHeader from '../../components/BrowseHeader';
import SpotifySong from '../../components/SpotifySong';

const SpotifyPlaylistTracks = ({route}) => {
  const { params } = route;
  const { id, playlistName, playlistImage } = params;
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const previousScreen = () => {
    navigation.goBack();
  }

  const playlistData = async () => {
    try {
      let newTracks;
      let offset = 0;
      do{
        const limit = 50;
        newTracks = await getPlaylistItems(id, limit, offset);
        console.log("newTracks.items", newTracks.items);
        if (newTracks.items.length > 0) {
          const newTracksItems = newTracks.items;
          setPlaylist(tracks => [...tracks, ...newTracksItems]);
        }
        offset = offset + limit;
      } while (newTracks.items.length >= 50);
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    playlistData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <BrowseHeader headerName={playlistName} closeScreen={previousScreen} />
          <ScrollView >
            <ImageBackground source={{uri: playlistImage.url}} style={styles.coverArt}></ImageBackground>
            <View style={styles.header}>
              <Text style={styles.playlistName}>{playlistName}</Text>
            </View>
            <View>
              {/* <SpotifySong song={playlist[0].track} />  */}
              {playlist.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => {
                    navigation.navigate("Create", { selectedSong: item.track });
                  }
                }>
                  <SpotifySong song={item.track} />  
                </TouchableOpacity>  
              ))}
              
            </View>
          </ScrollView>
        </>
      )}
    </View>
  )
}

export default SpotifyPlaylistTracks

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#111',
    //padding: 8,    
  },
  header: {
    marginBottom: 20
  },
  body: {
    paddingLeft: 15,
    paddingRight: 15,
    height: '100%',
    paddingBottom: 100
  },
  coverArt: {
    alignSelf: 'center',
    height: 300,
    width: 300,
    marginBottom: 20,
  },
  playlistName: {
    color: '#fff',
    fontSize: 25,
    width: '85%',
  },
})