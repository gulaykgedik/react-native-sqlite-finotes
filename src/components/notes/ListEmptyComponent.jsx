import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { screenHeight, screenWidth } from '../../utils/constants'
import TextTitle from '../ui/TextTitle'
import TextDescription from '../ui/TextDescription'
import Button from '../ui/Button'
import { useNavigation } from '@react-navigation/native'
import { ADDNOTE } from '../../utils/routes'

const ListEmptyComponent = () => {

    // sayfalar arası geçiş için navigation objesini aldık
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <View style={{ flex: 5, justifyContent:"center", alignItems:"center"}}>
            <Image 
                source={require('../../assets/images/image2.png')}
                style={{
                    width: screenWidth - 80,
                    height: screenHeight / 4,
                    resizeMode: "contain"
                }}
            />
            <TextTitle title='Create Your First Note' />
            <TextDescription description='Add a note about anything (your thoughts on your last exam) and share it with the world.' />
        </View>

        <View style={{flex:1}}>
                <Button
                    onPress={()=>navigation.navigate(ADDNOTE)}
                    title='Create a Note'
                />
        </View>
    </View>
  )
}

export default ListEmptyComponent

const styles = StyleSheet.create({
    container:{
        height: screenHeight * 0.80
    }
})