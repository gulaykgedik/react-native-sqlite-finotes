import { View, Text, SafeAreaView, ScrollView, TextInput, Alert } from 'react-native'
import React, { useEffect } from 'react'
import * as Yup from 'yup';
import { defaultScreenStyle } from '../../styles/screenStyle';
import TextTitle from '../../components/ui/TextTitle';
import TextDescription from '../../components/ui/TextDescription';
import { Formik } from 'formik';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { insertUserIfNotExists } from '../../utils/db';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../redux/actions/authActions';

const Register = () => {


  const user = useSelector(state => state.auth)

  console.log("authstate: ", user)

  // kullanıcı kaydolma şeması oluşturduk
  const RegisterSchema = Yup.object().shape({

    username: Yup.string().required('This field is required.'),
    password:
      Yup.string()
        .required('This field is required')
        .min(8, 'Password has to be minimum of 8 characters.'),

    location: Yup.string().required('This field is required.'),
    email: Yup.string().email('Invalid email.').required('This field is required.')

  })

  const dispatch = useDispatch();

  useEffect(()=>{

  },[])


  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.container}>
        {/* modal */}


        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TextTitle title={'Create a free account'} />
            <TextDescription description='Join Notely for free. Create and share unlimited notes with your friends.' />
          </View>

          <Formik
            // formikin inputlarının başlangıç değerleri
            initialValues={{
              username: 'Gülay Kızılgedik',
              email: "Gulaykgedik@gmail.com",
              password: "12345678",
              location: "İstanbul"
            }}
            // üstteki şemaya uygun olmayan veri uploadlanırsa (eksik vs.) hata döndermek için doğrulama şeması
            validationSchema={RegisterSchema}
            onSubmit={async (values) => {
              try {

                // içerde thunk(asenkron redux eylemi) kullandığımız için await zorunlu
                await dispatch(createUser(values))
                
              }catch(err){
                console.error(err)
              }
            }}
          >
            {
              ({ values, errors, handleSubmit, handleBlur, handleChange }) => (
                <>
                  {/* inputlar viewı */}
                  <View style={{ flex: 3 }}>
                    <Input
                      label='Full Name'
                      placeholder='Full Name'
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                      error={errors.username}
                    />

                    <Input
                      label='Email'
                      placeholder='Email'
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      error={errors.email}
                    />

                    <Input
                      label='Password'
                      placeholder='Password'
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      error={errors.password}
                    />


                    <Input
                      label='Location'
                      placeholder='Location'
                      onChangeText={handleChange('location')}
                      onBlur={handleBlur('location')}
                      value={values.location}
                      error={errors.location}
                    />

                  </View>

                  {/* submit buton viewı */}
                  <View style={{ flex: 1,justifyContent: "flex-end" }}>

                    <Button
                      title='Create Account'
                      onPress={() => {
                        handleSubmit();
                      }}
                      disabled={Object.keys(errors).length != 0}
                    />

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

export default Register