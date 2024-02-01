import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BrowseHeader from '../../components/BrowseHeader'
import { useNavigation } from '@react-navigation/native'

const Artists = () => {
  const navigation = useNavigation();
  const previousScreen = () => {
    navigation.goBack();
  }

  return (
    <View>
      <BrowseHeader headerName="Artists" closeScreen={previousScreen} />
      <Text>Artists</Text>
    </View>
  )
}

export default Artists

const styles = StyleSheet.create({})