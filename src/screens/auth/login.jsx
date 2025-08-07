import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native'
import React from 'react'
import { defaultScreenStyle } from '../../styles/screenStyle'
import TextTitle from '../../components/ui/TextTitle'
import TextDescription from '../../components/ui/TextDescription'
import { Formik } from 'formik'
import * as Yup from 'yup';
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import TextButton from '../../components/ui/TextButton'
import { REGISTER } from '../../utils/routes'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/actions/authActions'


const Login = ({ navigation }) => {

  // giriş şeması
  const LoginSchema = Yup.object().shape({
    password: Yup.string().required('This field is required.'),
    email: Yup.string().email('Invalid e-mail.').required('This field is required.')
  });


  const dispatch = useDispatch();



  const user = useSelector(state => state.auth)

  console.log("authstate: ", user)

  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.container}>
        {/* modal */}


        <ScrollView contentContainerStyle={{ flex: 1 }}>

          <View style={{ flex: 1, justifyContent: "center" }}>
            <TextTitle title='Login to your account' />
            <TextDescription description='Join Notely for free. Create and share unlimited notes with your friends.' />
          </View>

          <Formik
            initialValues={{
              email: "Gulaykgedik@gmail.com",
              password: "12345678"
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => await dispatch(loginUser(values))}
          >
            {

              ({ values, errors, handleSubmit, handleChange, handleBlur }) => (

                <>
                  <View style={{ flex: 3 }}>
                    <View style={{ flex: 1 }}>
                      <Input
                        placeholder='Email Address'
                        label="Email Address"
                        error={errors.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                      />
                      <Input
                        placeholder='Password'
                        label="Password"
                        error={errors.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                      />
                    </View>

                    <View style={{ flex: 1, justifyContent: "center" }}>
                      <Button
                        // pending={}
                        title='Login'
                        disabled={Object.keys(errors).length > 0}
                        onPress={handleSubmit}
                      />
                      <TextButton
                        title='No account yet? Create one!'
                        onPress={() => navigation.navigate(REGISTER)}
                      />
                    </View>

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

export default Login