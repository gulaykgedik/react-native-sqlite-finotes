import { Alert, Image, SafeAreaView, Text, View } from 'react-native'
import React from 'react'
import { defaultScreenStyle } from '../../styles/screenStyle'
import { screenHeight, screenWidth } from '../../utils/constants'
import TextTitle from '../../components/ui/TextTitle'
import TextDescription from '../../components/ui/TextDescription'
import Button from '../../components/ui/Button'
import { LOGIN, REGISTER } from '../../utils/routes'
import TextButton from '../../components/ui/TextButton'

const GetStarted = ({navigation}) => {
  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.container}>
        {/* Image area */}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image 
            source={require('../../assets/images/image1.png')}
            style={{
                width:screenWidth - 80,
                height: screenHeight / 4, 
                resizeMode: 'contain'
            }}
            />
        </View>
           {/* Text area */}
              <View style={{flex: 1, padding:5}}>
               <View style={{flex:2}}>
               <TextTitle title={" World's Safest And Largest Digital Notebook"} />
                <TextDescription description={" Notely is the world's safest,largest and most secure digital notebook. Join over 10M+ users who are already using Notely."}/>
               </View>

               <View style={{flex:1}}>
                <Button title="GET STARTED" pending={false}
                 onPress={()=> navigation.navigate(REGISTER)} />

                 <TextButton title="Already have an account?" 
                 onPress={() => navigation.navigate(LOGIN)}
                 />
               </View>
            </View>
  
      </View>
    </SafeAreaView>
  )
}

export default GetStarted

 