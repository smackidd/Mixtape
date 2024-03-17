import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { formatDuration } from '../helpers/SongDurationFormat';

const SpotifySong = (props) => {
  const {song} = props;
  console.log("Song", song);
  const artistsNames = (artists) => {
    if (!artists || artists.length === 0) {
      return '';
    }
  
    // Map each artist to their name
    const artistNames = artists.map(artist => artist.name);
  
    // Concatenate the names with a delimiter
    return artistNames.join(' - ');
  }

  return (
    <View style={styles.container}>
      {song.album && (
        <Image source={song.album.images[song.album.images.length -1]} style={styles.albumImage}/>
      )}
      <View style={styles.songNameTimeContainer}>
        <View style={styles.songArtistNameContainer}>
          <View style={styles.songNameContainer}>
            <Text style={styles.songName}>{song.name}</Text>
          </View>
          <Text style={styles.artistName} numberOfLines={1} ellipsizeMode="tail">{artistsNames(song.artists)}</Text>
        </View>
        <View>
          <Text style={styles.timeText}>{formatDuration(song.duration_ms)}</Text>
        </View>
      </View>
    </View>
  )
}

export default SpotifySong

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
   
    marginBottom: 15
  },
  songNameTimeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //margin: 5,
  },
  songArtistNameContainer: {
    justifyContent: 'center',
    width: '85%'
  },
  songNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    
  }, 
  songName: {
    fontSize: 17,
    color: '#fff'
  },
  artistName: {
    fontSize: 12,
    color: "#aaa",
    width: '90%'
  },
  timeText: {
    color: '#fff',
    fontSize: 15
  },
  albumImage: {
    height: 50,
    width: 50
  }
})