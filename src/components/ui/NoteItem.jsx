import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NOTEDETAIL } from '../../utils/routes';
import { Colors } from '../../theme/colors';
import { screenWidth } from '../../utils/constants';

const NoteItem = ({ note }) => {

    const navigation = useNavigation();

    return (
        <Pressable
            onPress={() => navigation.navigate(NOTEDETAIL, { note })}
            style={styles.container}
        >
            <View>
                <Text style={{ fontSize: 18, fontWeight: "800", marginVertical: 10 }}>
                    {note.title}
                </Text>
                <Text
                    numberOfLines={20}
                    style={{ fontSize: 16, color: Colors.BLACK }}>
                    {note.description}
                </Text>
                <Text
                    numberOfLines={20}
                    style={{ fontSize: 16, color: Colors.BLACK }}>
                    {note.id}
                </Text>
            </View>

        </Pressable>
    )
}

export default NoteItem

const styles = StyleSheet.create({
    container: {
        width: screenWidth / 2 - 20,
        backgroundColor: Colors.WHITE,
        padding: 15,
        margin: 3,
        borderRadius: 8
    }
})