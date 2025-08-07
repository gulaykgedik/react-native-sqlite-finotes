import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Colors } from '../../theme/colors';

const Input = (props) => {

    const {label, error, editable = true} = props;

    return (
        <View style={styles.container}>
            <Text style={[styles.label, props.labelStyle]}>{label}</Text>
            <TextInput
            {...props}
            style={[
                styles.input,
                props?.style,
                {
                    borderColor: error ? Colors.SECOND : Colors.SOFTGRAY,
                    color: editable ? Colors.BLACK : Colors.SOFTGRAY
                }
            ]}
            />
            <Text style={styles.errorText}>{error}</Text>
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    container:{
        marginVertical: 5
    },
    input:{
        backgroundColor: Colors.WHITE,
        padding:15,
        fontSize:16,
        borderRadius:8,
        borderWidth:2
    },
    label:{
        fontSize:16,
        marginVertical:10
    },
    errorText: {
        fontSize:14,
        color: Colors.SECOND,
        marginTop:5
    }


})