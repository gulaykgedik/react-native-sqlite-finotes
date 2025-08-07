import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../theme/colors'

const TextTitle = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} >{title}</Text>
    </View>
  )
}

export default TextTitle

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
     
    },
    title: {
        fontSize: 24,
        fontWeight: 700,
        color: Colors.BLACK,
        textAlign: 'center',
    },
 
})