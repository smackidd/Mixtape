import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import theme from '../../styles/theme.style';
import Tape from '../../components/Tape';
import { useNavigation } from '@react-navigation/native';

const Tapes = () => {
  const navigation = useNavigation();
  const [spotifyUser, setSpotifyUser] = useState(false);

  const [tapes, setTapes] = useState([
    {
      id: 1,
      name: "Tape 1",
      sideOneTime: "44:30",
      sideOneSongs: "9",
      sideTwoTime: "43:22",
      sideTwoSongs: "9",
      creator: "smackidd",
    },
    {
      id: 2,
      name: "Tape 2",
      sideOneTime: "44:30",
      sideOneSongs: "9",
      sideTwoTime: "43:22",
      sideTwoSongs: "9",
      creator: "smackidd",
    },
    {
      id: 3,
      name: "Tape 3",
      sideOneTime: "44:30",
      sideOneSongs: "9",
      sideTwoTime: "43:22",
      sideTwoSongs: "9",
      creator: "smackidd"
    },
    {
      id: 4,
      name: "Tape 4",
      sideOneTime: "44:30",
      sideOneSongs: "9",
      sideTwoTime: "43:22",
      sideTwoSongs: "9",
      creator: "smackidd"
    },
  ]);

  useLayoutEffect(() => {
    if (!spotifyUser) navigation.navigate("SpotifyLogin");
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={require("../../assets/hand_drawn_cassette.png")}
        style={styles.image}
        resizeMode='cover'
      />
      <FlatList
        contentContainerStyle={styles.list}
        data={tapes}
        scrollEnabled={true}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <>
            <Tape tape={item} />
          </>
        )}
      />
    </SafeAreaView>
  )
}

export default Tapes

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.TAPES_BACKGROUND,
        height: "100%"
    },
    image: {
        width: 400,
        height: 350
    },
    list: {
      width: '96%',
      marginLeft: '7%'
    } 
})