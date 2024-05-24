import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import BrowseHeader from '../../components/BrowseHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile } from '../../api_calls/Profile';
import { getUserFollowedArtists } from '../../api_calls/Artists';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getUsersSavedAlbums } from '../../api_calls/Album';
import { getBrowseCategories, getCategoryPlaylists, getUsersPlaylists } from '../../api_calls/Playlists';


const SpotifyBrowse = () => {
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState([]);
  const [userFollowedArtists, setUserFollowedArtists] = useState([]);
  const [userSavedAlbums, setUserSavedAlbums] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [browseCategories, setBrowseCategories] = useState([]);
  const [moodPlaylists, setMoodPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  
  const getBrowserData = async () => {
    try {
      const profile = await getProfile();   
      await AsyncStorage.setItem('country', profile.country);
      const followedArtists = await getUserFollowedArtists('', 20);
      const savedAlbums = await getUsersSavedAlbums();
      const userPlaylists = await getUsersPlaylists();
      const browseCategories = await getBrowseCategories();
      const moodPlaylists = await getCategoryPlaylists("mood");
      setUserProfile(profile);
      setUserFollowedArtists(followedArtists);
      setUserSavedAlbums(savedAlbums);
      setUserPlaylists(userPlaylists);
      setBrowseCategories(browseCategories);
      setMoodPlaylists(moodPlaylists);
    } catch(err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBrowserData();
  }, [])

  const artistsNames = (artists) => {
    if (!artists || artists.length === 0) {
      return '';
    }
  
    // Map each artist to their name
    const artistNames = artists.map(artist => artist.name);
  
    // Concatenate the names with a delimiter
    return artistNames.join(' - ');
  }

  const closeScreen = () => {
    navigation.goBack();
  } 

  handleHorizontalScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY !== 0) {
      setScrollEnabled(false);
    } else {
      setScrollEnabled(true);
    }  
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

  const getAlbums = () => {
    navigation.navigate("Albums");
  }

  const getAlbum = (id) => {
    navigation.navigate("Album", {
      id
    });
  }

  const getPlaylists = () => {
    console.log("getting playlists")
    navigation.navigate("Playlists");
  }

  const getPlaylist = (id, name, image) => {
    navigation.navigate("SpotifyPlaylistTracks", {
      id,
      playlistName: name,
      playlistImage: image
    });
  }

  const getMoods = () => {
    console.log("getting Moods")
    navigation.navigate("Moods");
  }

  const getCategories = () => {
    console.log("getting Categories")
    navigation.navigate("Categories");
  }

  const getCategory = (id, name, image) => {
    navigation.navigate("Category", {
      id, 
      categoryName: name,
      categoryImage: image
    })
  }

  return (
    <View style={styles.container} closeScreen={closeScreen}>
      <BrowseHeader headerName="Explore" closeScreen={closeScreen} />
      <ScrollView scrollEnabled={scrollEnabled} style={{marginBottom: 50 }}>
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
          <View>
            <ScrollView horizontal onScroll={handleHorizontalScroll}>
              {userFollowedArtists.artists.items.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity  style={{width: 120, alignItems: 'center'}} onPress={() => getArtist(item.id)}>
                    {item.images && item.images.length > 2 && item.images[2].url ? (
                      <>
                        <Image source={{ uri: item.images[item.images.length - 1].url }} style={styles.artistImage} />
                        <Text style={{color: "#fff"}}>{item.name}</Text>
                      </>
                    ) : (
                      <Text style={{ color: '#fff' }}>{item.name}</Text>
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
          // </ScrollView>
        )}

        {/* Albums */}

        <View style={styles.headersContainer} >
            <Text style={styles.headers}>Albums</Text>
            <TouchableOpacity style={styles.chevron} onPress={getAlbums}>
              <Text style={{ color: '#aaa', fontSize: 20 }}>More</Text>
              <MaterialCommunityIcons name="chevron-right" color="#aaa" size={26} />
            </TouchableOpacity>
        </View>
        {loading ? (
          <Text style={{ color: "#fff" }}>Loading...</Text>
        ) : (
          <View>
            <ScrollView horizontal onScroll={handleHorizontalScroll}>
              {userSavedAlbums.items.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity style={{width: 120, margin: 5}} onPress={() => getAlbum(item.album.id)}>
                    {item.album.images  ? (
                      <>
                        <Image source={{ uri: item.album.images[0].url }} style={styles.albumImage} />
                        <Text numberOfLines={2} ellipsizeMode="tail" style={{color: "#fff"}}>{item.album.name}</Text>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={{color: "#aaa"}}>{artistsNames(item.album.artists)}</Text>
                      </>
                    ) : (
                      <Text style={{ color: '#fff' }}>{item.album.name}</Text>
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Playlists */}

        <View style={styles.headersContainer} >
            <Text style={styles.headers}>Playlists</Text>
            <TouchableOpacity style={styles.chevron} onPress={getPlaylists}>
              <Text style={{ color: '#aaa', fontSize: 20 }}>More</Text>
              <MaterialCommunityIcons name="chevron-right" color="#aaa" size={26} />
            </TouchableOpacity>
        </View>
        {loading ? (
          <Text style={{ color: "#fff" }}>Loading...</Text>
        ) : (
          <View>
            <ScrollView horizontal onScroll={handleHorizontalScroll}>
              {userPlaylists.items.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity style={{width: 120, margin: 5}} onPress={() => getPlaylist(item.id, item.name, item.images[0])}>
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
            </ScrollView>  
          </View>
          // </ScrollView>
        )}

        {/*Categories*/}


        <View style={styles.headersContainer} >
            <Text style={styles.headers}>Categories</Text>
            <TouchableOpacity style={styles.chevron} onPress={getCategories}>
              <Text style={{ color: '#aaa', fontSize: 20 }}>More</Text>
              <MaterialCommunityIcons name="chevron-right" color="#aaa" size={26} />
            </TouchableOpacity>
        </View>
        {loading ? (
          <Text style={{ color: "#fff" }}>Loading...</Text>
        ) : (
          <View>
            <ScrollView horizontal onScroll={handleHorizontalScroll}>
              {browseCategories.categories.items.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity style={{width: 120, margin: 5}} onPress={() => getCategory(item.id, item.name, item.icons[0])}>
                    {item.icons  ? (
                      <>
                        <Image source={{ uri: item.icons[0].url }} style={styles.albumImage} />
                        <Text numberOfLines={2} ellipsizeMode="tail" style={{color: "#fff"}}>{item.name}</Text>
                      </>
                    ) : (
                      <Text style={{ color: '#fff' }}>{item.name}</Text>
                    )}
                  </TouchableOpacity>
                </View>  
              ))}  
            </ScrollView>  
          </View>
          // </ScrollView>
        )}

        {/*Mood Playlists*/}

        <View style={styles.headersContainer} >
            <Text style={styles.headers}>Mood</Text>
            <TouchableOpacity style={styles.chevron} onPress={getMoods}>
              <Text style={{ color: '#aaa', fontSize: 20 }}>More</Text>
              <MaterialCommunityIcons name="chevron-right" color="#aaa" size={26} />
            </TouchableOpacity>
        </View>
        {loading ? (
          <Text style={{ color: "#fff" }}>Loading...</Text>
        ) : (
          <View>
            <ScrollView horizontal onScroll={handleHorizontalScroll}>
              {moodPlaylists.playlists.items.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity style={{width: 120, margin: 5}} onPress={() => getPlaylist(item.id, item.name, item.images[0])}>
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
            </ScrollView>  
          </View>
          // </ScrollView>
        )}

      </ScrollView>
      
      
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
  albumImage: {
    width: 100,
    height: 100,
    marginBottom: 5
  }

})