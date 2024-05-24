import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BrowseHeader from '../../components/BrowseHeader'
import { useNavigation } from '@react-navigation/native'
import { getUserFollowedArtists } from '../../api_calls/Artists'

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const previousScreen = () => {
    navigation.goBack();
  }

  const artistsData = async () => {
    try {
      let newArtists;
      let after = null;
      let continueLoop = true;
      do {
        const limit = 50;
        console.log("after", after, typeof after);
        newArtists = await getUserFollowedArtists(after, limit);
        console.log("newArtists", newArtists.artists.items.length);
        if (newArtists.artists.items.length > 0){
          const newArtistsItems = newArtists.artists.items;
          setArtists(artists => [...artists, ...newArtistsItems])
        }
        after=newArtists.artists.cursors.after;
        if(after == null) continueLoop = false;
      } while (continueLoop == true);
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    artistsData();
  }, []);

  const getArtist = (id) => {
    navigation.navigate("Artist", {
      id
    });
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <BrowseHeader headerName="Artists" closeScreen={previousScreen} />
          <ScrollView>
            <View style={styles.playlistsContainer}>
              {artists
                .slice() // Create a shallow copy of the array to avoid mutating the original array
                .sort((a, b) => a.name.localeCompare(b.name)) // Sort the array by artist name
                .map((item, index) => (
                  <View key={index}>
                    <TouchableOpacity style={{width: 120, margin: 10}} onPress={() => getArtist(item.id)}>
                      {item.images[0]  ? (
                        <>
                          <Image source={{ uri: item.images[0].url }} style={styles.albumImage} /> 
                          <Text numberOfLines={2} ellipsizeMode="tail" style={{color: "#fff"}}>{item.name}</Text>
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

export default Artists

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#111',
    //padding: 8,    
  },
  playlistsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 15,  
  },
  albumImage: {
    width: 120,
    height: 120,
    marginBottom: 5,
    borderRadius: 90,
  },
})