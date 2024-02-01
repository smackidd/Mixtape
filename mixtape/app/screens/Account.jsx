import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig'

const Account = () => {
  return (
    <SafeAreaView>
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
    </SafeAreaView>
  )
}

export default Account

const styles = StyleSheet.create({})