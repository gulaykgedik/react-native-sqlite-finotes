import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { defaultScreenStyle } from '../../styles/screenStyle'
import { screenHeight, screenWidth } from '../../utils/constants'
import Button from '../../components/ui/Button'
import { useDispatch } from 'react-redux'
import { deleteNote, updateNote } from '../../redux/actions/noteActions'


const NoteDetail = ({ route, navigation }) => {

    const { note } = route.params

    const [title, setTitle] = useState(note.title);
    const [desc, setDesc] = useState(note.description);


    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            await dispatch(deleteNote({ id: note.id }));

            navigation.goBack();
        }
        catch (err) {
            console.log(err)
            Alert.alert('ERROR', err.message)
        }

    }


    const handleUpdate = async () => {

        try{
            await dispatch(updateNote({noteId: note.id, title, description: desc}))

            navigation.goBack();
        }
        catch(err){
            console.error(err)
        }
    }


    return (
        <SafeAreaView style={defaultScreenStyle.safeContainer}>
            <View style={defaultScreenStyle.container}>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={[styles.input, styles.inputTitle]}
                />
                <TextInput
                    value={desc}
                    onChangeText={setDesc}
                    multiline
                    style={[styles.input, styles.inputDescription]}
                />
                <Button title="Save Note"
                    onPress={handleUpdate}
                />
                <Button title='Delete Note'
                    onPress={handleDelete}
                />
            </View>
        </SafeAreaView>
    )
}

export default NoteDetail

const styles = StyleSheet.create({

    input: {
        minHeight: screenHeight * 0.07,
        paddingHorizontal: screenWidth * 0.01,
        paddingVertical: screenHeight * 0.01
    },

    inputTitle: {
        fontWeight: "700",
        fontSize: 24
    },
    inputDescription: {
        fontSize: 16,
        height: screenHeight * 0.6
    }

})