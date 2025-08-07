import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { screenHeight } from '../../utils/constants';
import { Colors } from '../../theme/colors';

const Button = (props) => {
    // pending => işlem yapılmaya devam ediyor anlamına gelir
    const {title, pending, disabled} = props;
  return (
    // ...props, kullanmadığım ama ek olarak verilen propları buraya koy anlamına gelir.
    <TouchableOpacity 
    disabled={disabled}
    {...props} 
    style={[styles.container, {backgroundColor: disabled ? Colors.SOFTGRAY : Colors.SECOND}, props.style ]}
    
    >
        <Text style={[styles.title, props.textStyle]}>
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
        paddingVertical:15,
        borderRadius: 8,
        minHeight: screenHeight/15,
        marginVertical:5
    },
    title:{
        color: Colors.WHITE,
        fontSize:20,
        fontWeight:"600"
    }
})