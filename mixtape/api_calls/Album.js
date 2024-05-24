import AsyncStorage from '@react-native-async-storage/async-storage';

const getAlbum = async (id) => {
    const accessToken = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      const data = await response.json();
      console.log("Album", data);
      return data;
    } catch (err) {
        console.log(err.message);
    }
  }

const getUsersSavedAlbums = async (limit=20, offset=0) => {
  const accessToken = await AsyncStorage.getItem('token');
  try {
    const response = await fetch(`https://api.spotify.com/v1/me/albums?limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const data = await response.json();
    //console.log("Saved Albums", data.items);
    return data;
  } catch (err) {
      console.log(err.message);
  }
}

  export {getAlbum, getUsersSavedAlbums}