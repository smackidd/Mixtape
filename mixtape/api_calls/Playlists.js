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

  const getPlaylistItems = async (playlist, limit=50, offset=0) => {
    const accessToken = await AsyncStorage.getItem('token');
    const country = await AsyncStorage.getItem('country');
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist}/tracks?limit=${limit}&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      const data = await response.json();
      //console.log("getPlaylistItems", data.items);
      return data;
    } catch(err) {
      console.log(err)
    } 
  }

  const getUsersPlaylists = async (limit=20, offset=0) => {
    const accessToken = await AsyncStorage.getItem('token');
    const country = await AsyncStorage.getItem('country');
    try {
      const response = await fetch(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      const data = await response.json();
      console.log("getUserPlaylists", data.items);
      return data;
    } catch(err) {
      console.log(err)
    } 
  }

  const getCategoryPlaylists = async (category, limit=20, offset=0) => {
    const accessToken = await AsyncStorage.getItem('token');
    const country = await AsyncStorage.getItem('country');
    try {
      const response = await fetch(`https://api.spotify.com/v1/browse/categories/${category}/playlists?limit=${limit}&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      const data = await response.json();
      console.log("getCategoryPlaylists", data.items);
      return data;
    } catch(err) {
      console.log(err)
    } 
  } 
  
  const getBrowseCategories = async (limit=20, offset=0) => {
    const accessToken = await AsyncStorage.getItem('token');
    const country = await AsyncStorage.getItem('country');
    try {
      const response = await fetch(`https://api.spotify.com/v1/browse/categories?limit=${limit}&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      const data = await response.json();
      console.log("getBrowseCategories", data.items);
      return data;
    } catch(err) {
      console.log(err)
    } 
  }

  const getBrowseCategoryWithId = async (id, limit=20, offset=0) => {
    const accessToken = await AsyncStorage.getItem('token');
    const country = await AsyncStorage.getItem('country');
    try {
      const response = await fetch(`https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=${limit}&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      const data = await response.json();
      console.log("getBrowseCategoryWithId", data.playlists.items);
      return data;
    } catch(err) {
      console.log(err)
    } 
  }

export {getArtistsPlaylists, getPlaylistItems, getUsersPlaylists, getCategoryPlaylists, getBrowseCategories, getBrowseCategoryWithId};