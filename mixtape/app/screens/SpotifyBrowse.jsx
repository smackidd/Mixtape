import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import BrowseHeader from '../../components/BrowseHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile } from '../../api_calls/Profile';
import { getUserFollowedArtists } from '../../api_calls/Artists';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const SpotifyBrowse = () => {
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState([]);
  const [userFollowedArtists, setUserFollowedArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const getBrowserData = async () => {
    try {
      const profile = await getProfile();   
      const followedArtists = await getUserFollowedArtists();
      await AsyncStorage.setItem('country', profile.country);
      setUserProfile(profile);
      setUserFollowedArtists(followedArtists);
    } catch(err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBrowserData();
  }, [])

  const closeScreen = () => {
    navigation.goBack();
  } 

  const getArtists = () => {
    console.log("getting artists")
    navigation.navigate("Artists");
  }

  const getArtist = (id) => {
    navigation.navigate("Artist", {
      id
    });
  }

  return (
    <View style={styles.container} closeScreen={closeScreen}>
      <BrowseHeader headerName="Explore" closeScreen={closeScreen} />
      <View style={styles.headersContainer} >
          <Text style={styles.headers}>Artists</Text>
          <TouchableOpacity style={styles.chevron} onPress={getArtists}>
            <Text style={{ color: '#aaa', fontSize: 20 }}>More</Text>
            <MaterialCommunityIcons name="chevron-right" color="#aaa" size={26} />
          </TouchableOpacity>
      </View>
      {loading ? (
        <Text style={{ color: "#fff" }}>Loading...</Text>
      ) : (
        // <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>

          <FlatList
            horizontal
            data={userFollowedArtists.artists.items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View >
                <TouchableOpacity style={{width: 120, alignItems: 'center'}} onPress={() => getArtist(item.id)}>
                  {item.images && item.images.length > 2 && item.images[2].url ? (
                    <>
                      <Image source={{ uri: item.images[item.images.length - 1].url }} style={styles.artistImage} />
                      <Text style={{color: "#fff"
                    }}>{item.name}</Text>
                    </>
                  ) : (
                    <Text style={{ color: '#fff' }}>{item.name}</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        // </ScrollView>
      )}
      <Text style={styles.headers}>Albums</Text>
      <Text style={styles.headers}>Playlists</Text>
      <Text style={styles.headers}>Genres</Text>
      <Text style={styles.headers}>Mood</Text>
      
      
    </View>
  )
}

export default SpotifyBrowse

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#111'
  },
  
  
  headers: {
    color: "#fff",
    fontSize: 26,
    margin: 10
  },
  headersContainer: {
   
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  chevron: {
    flexDirection: 'row',
  },
  artistImage: {
    width: 100, // Adjust the width and height as needed
    height: 100,
    margin: 5, // Adjust the margin as needed
    borderRadius: 50,
  },

})