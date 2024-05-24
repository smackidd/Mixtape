import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserFollowedArtists = async (after, limit=20) => {
  const accessToken = await AsyncStorage.getItem('token');
  try {
    const baseUrl = `https://api.spotify.com/v1/me/following?type=artist`;
    let url = `${baseUrl}&limit=${limit}`;
    if (after != null && after !== ''){
      url += `&after=${after}`;
    }
    console.log("url", url);
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer  ${accessToken}`
      }
    })
    const data = await response.json();
    console.log("UserArtists", data.artists.items[0].images);
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

const getArtist = async (id) => {
  const accessToken = await AsyncStorage.getItem('token');
  try {
    const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const data = await response.json();
    return data;
  } catch (err) {
      console.log(err.message);
  }
}

const getArtistsTopTracks = async (id) => {
  const accessToken = await AsyncStorage.getItem('token');
  const country = await AsyncStorage.getItem('country');
  try {
    const response = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=${country}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

const getArtistsAlbums = async (id, limit, offset) => {
  const accessToken = await AsyncStorage.getItem('token');
  const country = await AsyncStorage.getItem('country');
  try {
    const response = await fetch(`https://api.spotify.com/v1/artists/${id}/albums?market=${country}&limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const data = await response.json();
    console.log(data);
    return data;
  } catch(err) {
    console.log(err)
  } 
}

export {getUserFollowedArtists, getArtist, getArtistsTopTracks, getArtistsAlbums}