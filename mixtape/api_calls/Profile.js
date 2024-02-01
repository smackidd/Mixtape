import AsyncStorage from '@react-native-async-storage/async-storage';


const getProfile = async () => {
    const accessToken = await AsyncStorage.getItem('token');
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer  ${accessToken}`
        }
      })
      const data = await response.json();
      console.log("me", data);
      return data;
    } catch (err) {
      console.log(err.message);
    }
}

export {getProfile};