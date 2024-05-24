import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { getUsersSavedAlbums } from '../../api_calls/Album';
import BrowseHeader from '../../components/BrowseHeader';
import SpotifyAlbum from '../../components/SpotifyAlbum';
import { GetArtistSeparator } from '../../helpers/ArtistSeparator';

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const previousScreen = () => {
    navigation.goBack();
  }

  const albumsData = async () => {
    try{
      let newAlbums;
      let offset = 0;
      do {
        const limit = 50;
        newAlbums = await getUsersSavedAlbums(limit, offset);
        if (newAlbums.items.length > 0) {
          const newAlbumsItems = newAlbums.items;
          setAlbums(albums => [...albums, ...newAlbumsItems]);
        }
        console.log("newAlbums count", newAlbums.items.length)
        offset = offset + limit;
      } while(newAlbums.items.length >= 50); 
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    albumsData();
  }, []);

  const albumsByType = (type) => albums.filter(album => album.album.album_type === type);

  const getAlbum = (id) => {
    navigation.navigate("Album", {
      id,
      
    });
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <BrowseHeader headerName={"Albums"} closeScreen={previousScreen} />
          <ScrollView>
            <View>
              <Text style={styles.sectionHeader}>Albums</Text>
              {albums
                .slice()
                .sort((a, b) => GetArtistSeparator(a.album.artists).localeCompare(GetArtistSeparator(b.album.artists)))
                .map((album, index) => (
                  <TouchableOpacity key={index} onPress={() => {getAlbum(album.album.id)}}>
                    <SpotifyAlbum album={album.album} artist={GetArtistSeparator(album.album.artists)}/>  
                  </TouchableOpacity>  
              ))}
            </View>
            {/* <View>
              <Text style={styles.sectionHeader}>Singles</Text>
              {albumsByType('single').map((album, index) => (
                <TouchableOpacity key={index} onPress={() => {getAlbum(album.album.id)}}>
                  <SpotifyAlbum album={album.album} />  
                </TouchableOpacity> 
              ))}
            </View>
            <View>
              <Text style={styles.sectionHeader}>Compilation</Text>
              {albumsByType('compilation').map((album, index) => (
                <TouchableOpacity key={index} onPress={() => {getAlbum(album.album.id)}}>
                  <SpotifyAlbum album={album.album} />  
                </TouchableOpacity> 
              ))}
            </View> */}
          </ScrollView>
        </>
      )}
    </View>
  )
}

export default Albums

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