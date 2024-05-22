import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getBrowseCategories, getBrowseCategoryWithId, getCategoryPlaylists } from '../../api_calls/Playlists';
import BrowseHeader from '../../components/BrowseHeader';
import { useNavigation } from '@react-navigation/native';

const Category = ({route}) => {
  const { params } = route;
  const { id, categoryName, categoryImage } = params;
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const previousScreen = () => {
    navigation.goBack();
  }

  const playlistData = async () => {
    try {
      let newPlaylists;
      let offset = 0;
      // do{
        const limit = 50;
        console.log("id", id);
        newPlaylists = await getBrowseCategoryWithId(id, limit, offset);
        console.log("newPlaylists.items", newPlaylists.playlists.items);
        if (newPlaylists.playlists.items.length > 0) {
          const newPlaylistsItems = newPlaylists.playlists.items;
          setPlaylists(playlists => [...playlists, ...newPlaylistsItems]);
        }
        offset = offset + limit;
      //} while (newPlaylists.items.length >= 50);
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    playlistData();
  }, []);

  const getPlaylist = (id, name, image) => {
    navigation.navigate("SpotifyPlaylistTracks", {
      id,
      playlistName: name,
      playlistImage: image
    });
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <BrowseHeader headerName={categoryName} closeScreen={previousScreen} />
          <ScrollView>
            <ImageBackground source={{uri: categoryImage.url}} style={styles.coverArt}></ImageBackground> 
            
            <View style={styles.playlistsContainer}>
              {playlists.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity style={{width: 120, margin: 10}} onPress={() => getPlaylist(item.id, item.name, item.images[0])}>
                    {item.images  ? (
                      <>
                        <Image source={{ uri: item.images[0].url }} style={styles.albumImage} />
                        <Text numberOfLines={2} ellipsizeMode="tail" style={{color: "#fff"}}>{item.name}</Text>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={{color: "#aaa"}}>{item.description}</Text>
                      </>
                    ) : (
                      <Text style={{ color: '#fff' }}>{item.name}</Text>
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  )
}

export default Category

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#111',
    //padding: 8,    
  },
  coverArt: {
    alignSelf: 'center',
    height: 300,
    width: 300,
    marginBottom: 20,
  },  
  header: {
    marginBottom: 20
  },
  playlistName: {
    color: '#fff',
    fontSize: 25,
    width: '85%',
  },
  albumImage: {
    width: 120,
    height: 120,
    marginBottom: 5
  },
  playlistsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 15,  
  }
})