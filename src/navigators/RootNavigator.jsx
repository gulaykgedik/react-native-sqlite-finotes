import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ADDNOTE, GETSTARTED, LOGIN, NOTEDETAIL, NOTELIST, PREMIUM, PROFILE, PROFILEEDIT, REGISTER } from '../utils/routes';
import GetStarted from '../screens/getStarted';
import Register from '../screens/auth/register';
import Login from '../screens/auth/login';
import { Colors } from '../theme/colors';
import { useSelector } from 'react-redux';
import NoteList from '../screens/note';
import NoteDetail from '../screens/note/detail';
import AddNote from '../screens/note/add';
import { Add, ProfileCircle, SearchNormal } from 'iconsax-react-nativejs';
import Profile from '../screens/profile';
import ProfileEdit from '../screens/profile/edit';
import Premium from '../screens/profile/premium';



const Stack = createNativeStackNavigator();

const RootNavigator = () => {

    const { isLogin } = useSelector(state => state.auth)

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.FIRST
                },
                headerShadowVisible: false
            }}
        >
            {
                isLogin ?
                    <Stack.Group>
                        <Stack.Screen
                            name={NOTELIST}
                            component={NoteList}
                            options={
                                ({ navigation }) => ({
                                    headerRight: () => (
                                        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                                            <Pressable
                                                style={{marginHorizontal: 5}}
                                                onPress={()=>navigation.navigate(ADDNOTE)}
                                            >
                                                <Add size={30} color='black' />
                                            </Pressable>
                                            <Pressable
                                                style={{marginHorizontal: 5}}
                                            >
                                                <SearchNormal size={20} color='black' />
                                            </Pressable>
                                        </View>
                                    ),
                                    headerLeft: () => (
                                        <View style={{flex:1}}>
                                            <Pressable
                                                onPress={()=>navigation.navigate(PROFILE)}
                                            >
                                                <ProfileCircle size='25' color='black' />
                                            </Pressable>
                                        </View>
                                    )
                                })
                            }
                        />

                        <Stack.Screen name={NOTEDETAIL} component={NoteDetail} />
                        <Stack.Screen name={ADDNOTE} component={AddNote} />
                        <Stack.Screen name={PROFILE} component={Profile} />
                        <Stack.Screen name={PROFILEEDIT} component={ProfileEdit} />
                        <Stack.Screen name={PREMIUM} component={Premium} />
                       
                    </Stack.Group>

                    :

                    <Stack.Group>
                        <Stack.Screen name={GETSTARTED} component={GetStarted} />
                        <Stack.Screen name={REGISTER} component={Register} />
                        <Stack.Screen name={LOGIN} component={Login} />
                    </Stack.Group>

            }



        </Stack.Navigator>
    )
}

export default RootNavigator