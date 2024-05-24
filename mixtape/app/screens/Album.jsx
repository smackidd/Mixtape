import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAlbum } from '../../api_calls/Album';
import BrowseHeader from '../../components/BrowseHeader';
import { useNavigation } from '@react-navigation/native';
import SpotifySong from '../../components/SpotifySong';

const Album = ({route}) => {
  const { params } = route;
  const { id } = params;
  const [album, setAlbum] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); 

  const previousScreen = () => {
    navigation.goBack();
  }

  //console.log("album.tracks.items", album.tracks.items);

  const albumData = async () => {
    try {
      const album = await getAlbum(id);
      //console.log("album name", album.name);
      setAlbum(album);
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  } 

  useEffect(() => {
    albumData();
  }, [])

  return (
    <View style={styles.container}>
      {loading ? (
        <BrowseHeader headerName="" />
      ) : (
        <>
          <View >
            <BrowseHeader headerName={album.name} closeScreen={previousScreen} />
            <ScrollView>

              <ImageBackground source={{uri: album.images[0]?.url}} style={styles.coverArt}></ImageBackground>
              <View style={styles.body}>
                <Text style={styles.albumName}>{album.name}</Text>
                <View style={styles.artistNameContainer}>
                  <Text style={styles.artistName}>{album.artists[0].name}</Text>
                </View>
                <View>
                  {album.tracks.items.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => {
                        navigation.navigate("Create", { selectedSong: item });
                      }
                    }>
                        <SpotifySong song={item} />  
                    </TouchableOpacity>  
                  ))}
                </View>
                
              </View>
            </ScrollView>
          </View>
        </>
      )}
      
    </View>
  )
}

export default Album

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#111',
    //padding: 8,    
  },
  body: {
    paddingLeft: 15,
    paddingRight: 15,
    height: '100%',
    marginBottom: 100
  },
  coverArt: {
    alignSelf: 'center',
    height: 300,
    width: 300,
    marginBottom: 20,
  },
  artistNameContainer: {
    marginBottom: 20
  },
  albumName: {
    color: '#fff',
    fontSize: 25,
    width: '85%',
  },
  artistName: {
    color: "#aaa",
    fontSize: 15
  },
  flatList: {
    
    marginBottom: 50
  }
})