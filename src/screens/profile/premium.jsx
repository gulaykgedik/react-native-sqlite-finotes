
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { defaultScreenStyle } from '../../styles/screenStyle'
import { screenHeight, screenWidth } from '../../utils/constants'
import TextTitle from '../../components/ui/TextTitle'
import TextDescription from '../../components/ui/TextDescription'
import Button from '../../components/ui/Button'
import TextButton from '../../components/ui/TextButton'

const Premium = () => {
  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
        <View style={defaultScreenStyle.container}>
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <Image
                    source={require('../../assets/images/image4.png')}
                    style={{
                        width: screenWidth / 2,
                        height: screenHeight / 2,
                        resizeMode: "contain"
                    }}
                />
            </View>
            <View style={{flex:2}}>
                <View style={{flex:2}}>
                    <TextTitle title='Start Using Notely with Premium Benefits' />
                    <TextDescription description='Save unlimited notes to a single project.' />
                    <TextDescription description='Create unlimited projects and teams.' />
                    <TextDescription description='Daily backups to keep your data safe.' />
                </View>
                <View style={{flex:1}}>
                    <Button title='SUBSCRIBE' />
                    <TextButton title='Restore Purchase' />

                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Premium

const styles = StyleSheet.create({})
