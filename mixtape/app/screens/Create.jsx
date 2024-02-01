import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import theme from '../../styles/theme.style';
import { useTailwind } from 'tailwind-rn';
import Song from '../../components/Song';

const Create = () => {
  const tw = useTailwind();
  const [songs, setSongs] = useState([
    {
      id: 1,
      title: "Eye of the Tiger",
      artist: "Survivor",
      time: "4:04"
    },
    {
      id: 2,
      title: "Another Brick in the Wall, Part 2",
      artist: "Pink Floyd",
      time: "6:45"
    },
  ])

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
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <>
              <Song song={item} />
            </>
          )}
        />
        <Song song={null} />
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
    borderBottomColor: '#000',
    borderBottomWidth: 2,
  },
  loveYaLikeASister: {
    fontFamily: 'LoveYaLikeASister-Regular',
    fontSize: 30
  }
})