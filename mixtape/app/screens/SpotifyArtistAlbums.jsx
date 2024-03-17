import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getArtistsAlbums } from '../../api_calls/Artists';
import SpotifyAlbum from '../../components/SpotifyAlbum';
import BrowseHeader from '../../components/BrowseHeader';

const SpotifyArtistAlbums = () => {
  const route = useRoute();
  const artistId = route.params?.artistId;
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);
  const navigation = useNavigation();

  const previousScreen = () => {
    navigation.goBack();
  }

  const getAlbum = (id) => {
    navigation.navigate("Album", {
      id
    });
  }

  const albumData = async () => {
    try {
      let newAlbums;
      let offset = 0;
      do {
        const limit = 50;
        newAlbums = await getArtistsAlbums(artistId, limit, offset);
        if (newAlbums.items.length > 0) {
          const newAlbumsItems = newAlbums.items;
          setAlbums(albums => [...albums, ...newAlbumsItems]);
        }
        offset = offset + limit;
        //console.log("New Albums Size", newAlbums.items.length);
        console.log(newAlbums.items[0].artists[0].name);
      } while (newAlbums.items.length >= 50); 
    } catch (err) {
      console.log(err.message);
    } finally {
      console.log("All Albums", albums)
      setLoading(false);
    }
  }

  useEffect(() => {
    albumData();
  }, []);

  const albumsByType = (type) => albums.filter(album => album.album_type === type);


  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <BrowseHeader headerName={albums[0].artists[0].name} closeScreen={previousScreen} />
          <ScrollView>
            <View>
              <Text style={styles.sectionHeader}>Albums</Text>
              {albumsByType('album').map((album, index)=> (
                <TouchableOpacity key={index} onPress={() => {getAlbum(album.id)}}>
                  <SpotifyAlbum album={album} />  
                </TouchableOpacity>  
              ))}
            </View>
            <View>
              <Text style={styles.sectionHeader}>Singles</Text>
              {albumsByType('single').map((album, index) => (
                <TouchableOpacity key={index} onPress={() => {getAlbum(album.id)}}>
                  <SpotifyAlbum album={album} />  
                </TouchableOpacity> 
              ))}
            </View>
            <View>
              <Text style={styles.sectionHeader}>Compilation</Text>
              {albumsByType('compilation').map((album, index) => (
                <TouchableOpacity key={index} onPress={() => {getAlbum(album.id)}}>
                  <SpotifyAlbum album={album} />  
                </TouchableOpacity> 
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  )
}

export default SpotifyArtistAlbums

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#111', 
    padding: 5 
  },
  sectionHeader: {
    fontSize: 24,
    color: "#fff"
  }
})