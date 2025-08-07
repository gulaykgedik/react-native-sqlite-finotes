import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { defaultScreenStyle } from '../../styles/screenStyle'
import { Colors } from '../../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotesFromDb } from '../../utils/db';
import NoteItem from '../../components/ui/NoteItem';
import ListEmptyComponent from '../../components/notes/ListEmptyComponent';
import { createNote, getAllNotes } from '../../redux/actions/noteActions';

const NoteList = () => {

  const pending = false; // TODO, bu kısım note state'ine aktarılacak

  const dispatch = useDispatch();

  // global hafızada tutulan notlarımı getir
  const { notes } = useSelector(state => state.note)
  // global hafızada tutulan(giriş yapmış) kullanıcımı getir
  const { user } = useSelector(state => state.auth)
//const user = useSelector(state => state.auth.user) ÜSTTEKİYLE AYNI ŞEY





  // Dispatch => Redux'a "bir aksiyon çalıştır" emri gönderir ve gönderilen aksiyona göre global hafızada veriler güncellenir. Yani Dispatch bir nevi state'e gönderilen POST isteği gibidir.

  // useSelector => Redux'a "bana bir veri getir" emri gönderen ve seçilen Reducer'a göre hangi veriyi getireceğini anlayan fonksiyondur. Yani useSelector bir nevi state'e gönderilen GET(okuma) isteği gibidir.


  useEffect(() => {


    // IIFE
    // Immediately Invoking Function Expression
    // Anında Çağrılan Fonksiyon İfadesi

    // (async()=>{
    //   await dispatch(createNote({userid:1, title: "ilknot", description: "çok uzun bir not olmayacak kısa bir not yazısı"}))
    // })()

    const fonksiyon = async () => {
      try {

        // Bu fonksiyona spesifik bir numara vermek yerine giriş yapmış kullanıcının IDsini vererek, sadece o kullanıcıya ait notları getir demiş olduk. Bu sayede aynı telefonda birden fazla kullanıcı uygulamayı kullanıyorsa hepsi sadece kendi notlarına erişim sağlayabilir.
        await dispatch(getAllNotes({ userid: user.id }))
      }
      catch (err) {
        console.error(err);
      }
    }

    fonksiyon();

  }, [])

  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.container}>
        {
          pending ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size={'large'} color={Colors.GRAY} />
            </View>
          ) : (
            <FlatList
              numColumns={2}
              data={notes}
              renderItem={({ item, index }) => <NoteItem note={item} 
              />
              }
              ListEmptyComponent={<ListEmptyComponent/>}
            />
          )

        }

      </View>
    </SafeAreaView>


  )
}

export default NoteList

const styles = StyleSheet.create({})