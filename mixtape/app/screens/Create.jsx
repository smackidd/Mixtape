import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import theme from '../../styles/theme.style';
import { useTailwind } from 'tailwind-rn';
import Song from '../../components/Song';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import AddSong from '../../components/AddSong';
import { GetArtistSeparator } from '../../helpers/ArtistSeparator';


const Create = () => {
  const tw = useTailwind();
  const route = useRoute();
  let selectedSong = route.params?.selectedSong;
  const [songs, setSongs] = useState([]
    //[
    // {
    //   id: 1,
    //   name: "Eye of the Tiger",
    //   artists: [{
    //     name: "Survivor",
    //   }],
    //   time: "4:04"
    // },
    // {
    //   id: 2,
    //   name: "Another Brick in the Wall, Part 2",
    //   artists: [{
    //     name: "Pink Floyd",
    //   }],
    //   time: "6:45"
    // },
  //]
  )

  // useEffect(() => {
  //   console.log("song updated: ", songs[2])

  // }, [songs])

  useFocusEffect(
    React.useCallback(() => {
      console.log("selectedSong", selectedSong)
      if (selectedSong != null) {
        const allArtists = GetArtistSeparator(selectedSong.artists);
        setSongs(prevSongs => [...prevSongs, {
          album: selectedSong.album,
          artists: selectedSong.artists,
          explicit: selectedSong.explicit,
          href: selectedSong.href,
          id: selectedSong.id,
          name: selectedSong.name,
          previewUrl: selectedSong.preview_url,
          url: selectedSong.url,
          duration: selectedSong.duration_ms,
        }]);
      }
      return () => {
        selectedSong = null;
        console.log("Song Added", songs)
      }
    }, [selectedSong])
  );

   
  
  
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tapeReel}>

      </View>
      <View style={styles.side}>
        <Text style={styles.loveYaLikeASister}>SIDE ONE</Text>
      </View>
      <View>
        <FlatList 
          contentContainerStyle={styles.song}
          data={songs}
          scrollEnabled={true}
          keyExtractor={item => item?.id}
          renderItem={({ item }) => (
            <>
              <Song song={item} />
              
            </>
          )}
        />
        <AddSong song={null} />
      </View>
    </SafeAreaView>
  )
}

export default Create

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.CREATE_BACKGROUND,
    height: "100%"
  },
  tapeReel: {
    width: '100%',
    height: 90,
  },
  side: {
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderBottomColor: theme.CREATE_BORDER,
    borderBottomWidth: 2,
  },
  loveYaLikeASister: {
    fontFamily: 'LoveYaLikeASister-Regular',
    fontSize: 30, 
    color: theme.CREATE_TEXT
  }
})