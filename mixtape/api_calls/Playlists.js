import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetQueryArtistSeparator } from '../helpers/ArtistSeparator';

const getArtistsPlaylists = async (artist, limit=10, offset=0) => {
    const artistName = GetQueryArtistSeparator(artist);
    console.log("artistName", artistName);
    const accessToken = await AsyncStorage.getItem('token');
    const country = await AsyncStorage.getItem('country');
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=playlist&limit=${limit}&offset=${offset}`, {
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

export {getArtistsPlaylists};