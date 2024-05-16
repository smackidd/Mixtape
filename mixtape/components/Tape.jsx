import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import React from 'react'
import theme from '../styles/theme.style.js';
import tapeColor from '../helpers/TapeColor.js';


const Tape = (props) => {
  const { tape } = props; 
  
  const backgroundTheme = tapeColor(tape.id);

  return (
    <TouchableOpacity style={[styles.container, backgroundTheme.container]}>
      <View style={styles.content}>
        <View style={styles.column1}>
          <Text>{tape.name}</Text>
          <Text>{tape.creator}</Text>
        </View>
        <View>
          <Text>Side One: {tape.sideOneSongs} tracks, {tape.sideOneTime}</Text>
          <Text>Side Two: {tape.sideTwoSongs} tracks, {tape.sideTwoTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}


export default Tape

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    height: 75 ,
    borderRadius: 10,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.33)',
        shadowOffset: { width: 12, height: 2 },
        shadowRadius: 5,
        shadowOpacity: 1, // Opacity value between 0 and 1
      },
      android: {
        elevation: 8, // Elevation is equivalent to shadow for Android
      },
    }),
  },
  content: {
    flex: 1,
    flexDirection: "row",
    width: '90%',
    margin: 10,
  },
  column1: {
    flex: 1,
  },
  sides: {
    flex: 1,
    flexDirection: "row",
  }
})