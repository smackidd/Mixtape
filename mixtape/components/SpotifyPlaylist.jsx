import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SpotifyPlaylist = (props) => {
  const {playlist} = props;
  console.log("Playlist", playlist);

  return (
    <View style={styles.container}>
      <Image source={playlist.images[0]} style={styles.playlistImage} />
      <Text style={styles.playlistName}>{playlist.name}</Text>
      <Text style={styles.playlistDescription} numberOfLines={2} ellipsizeMode="tail">{playlist.description}</Text>
    </View>
  )
}

export default SpotifyPlaylist

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 125,
    flexDirection: 'column',
    alignItems: 'left',
    marginRight: 15
  },   
  playlistImage: {
    height: 125,
    width: 125,
  },
  playlistName: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4
  },
  playlistDescription: {
    color: '#aaa',
    fontSize: 9,
  }
})