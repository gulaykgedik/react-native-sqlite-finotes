import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../theme/colors'

const TextButton = (props) => {
    const {title} = props
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Text style={styles.title} >{title}</Text>
    </TouchableOpacity>
  )
}

export default TextButton

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        marginVertical: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.SECOND, // Default link color
    }
})