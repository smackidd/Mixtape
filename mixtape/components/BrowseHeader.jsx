import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const BrowseHeader = (props) => {
  const {headerName, closeScreen} = props;
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        
          <TouchableOpacity onPress={() => closeScreen()}>
          {headerName === "Explore" ? (
            <Text style={styles.closeText} >Close</Text>
          ) : (
            <MaterialCommunityIcons name="chevron-left" color="#fff" size={30} />
          )}
          </TouchableOpacity>
        
        <Text style={styles.headerText} numberOfLines={1} ellipsizeMode='tail'>{headerName}</Text>
        <Text style={styles.endText}>     </Text>

      </View>
    </View>
    
  )
}

export default BrowseHeader

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomColor: "#000",
    borderBottomWidth: 2,
    backgroundColor: '#222'
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },  
  headerText: {
    color: '#fff',
   
    fontSize: 26,
    textAlign: 'center',
    width: '70%'

  },
  
  closeText: {
    color: '#fff',
    fontSize: 22,
  },
  endText: {
    marginRight: 50
  }
})