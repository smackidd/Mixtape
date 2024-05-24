import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SpotifyAlbum = (props) => {
  const {album, artist} = props;
  console.log("artist", artist);


  return (
    <View style={styles.container}>
      <Image source={album.images[0]} style={styles.albumImage}/>
      <View style={styles.songArtistNameContainer}>
        <View style={styles.albumNameContainer}>
          <Text style={styles.albumName}>{album.name}</Text>
        </View>
        <View>
          {artist ? (
            <Text style={styles.albumRelease}>{artist}</Text>
          ) : (
            <Text style={styles.albumRelease}>{album.release_date}</Text>
          )}
        </View>
      </View>
    </View>

  )
}

export default SpotifyAlbum

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  albumNameContainer: {
    justifyContent: 'center',
    
    width: '100%'
  },
  albumName: {
    fontSize: 18,
    color: '#fff'
  },
  albumRelease: {
    fontSize: 15,
    color: '#aaa'
  },
  albumImage: {
    marginRight: 5,
    height: 100,
    width: 100
  }
})