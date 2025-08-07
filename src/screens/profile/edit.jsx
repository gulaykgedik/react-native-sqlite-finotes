
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { defaultScreenStyle } from '../../styles/screenStyle'
import TextTitle from '../../components/ui/TextTitle'
import { Formik } from 'formik'
import { updateUserFromDb } from '../../utils/db'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/actions/authActions'
import Input from '../../components/ui/Input'
import * as Yup from 'yup'
import Button from '../../components/ui/Button'

const ProfileEdit = ({ navigation }) => {

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);

  const EditSchema = Yup.object().shape({

    username: Yup.string().trim().required('This field is required.'),
    password:
      Yup.string()
        .trim()
        .required('This field is required')
        .min(8, 'Password has to be minimum of 8 characters.'),

    location: Yup.string().trim().required('This field is required.')

  })


  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.container}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          {/* başlık */}
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TextTitle title='Update Your Account' />
          </View>
          {/* form kısmı */}
          <Formik
            initialValues={{
              id: user.id,
              email: user.email,
              username: user.username,
              password: user.password,
              location: user.location
            }}
            validationSchema={EditSchema}
            onSubmit={async ({ username, password, location, id }) => {
              await dispatch(updateUser({ username, password, location, id }))

              navigation.goBack();
            }}
          >
            {
              ({ values, errors, handleChange, handleSubmit, handleBlur }) => (
                <>
                  <View style={{ flex: 3 }}>
                    <Input
                      error={errors.username}
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                      placeholder='Full Name'
                      label='Full Name'
                    />
                    <Input
                      editable={false}
                      value={values.email}
                      label='Email'
                    />
                    <Input
                      error={errors.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      label='Password'
                      placeholder='Password'
                    />
                    <Input
                      error={errors.location}
                      onChangeText={handleChange('location')}
                      onBlur={handleBlur('location')}
                      value={values.location}
                      placeholder='Location'
                      label='Location'
                    />
                  </View>
                  <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <Button title='Update User' onPress={handleSubmit} disabled={Object.keys(errors).length != 0} />
                  </View>
                </>
              )
            }
          </Formik>

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default ProfileEdit

const styles = StyleSheet.create({})
