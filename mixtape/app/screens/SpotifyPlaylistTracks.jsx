import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SpotifyPlaylistTracks = ({route}) => {
  const { params } = route;
  const { id } = params;
  return (
    <View>
      <Text>SpotifyPlaylistTracks</Text>
    </View>
  )
}

export default SpotifyPlaylistTracks

const styles = StyleSheet.create({})