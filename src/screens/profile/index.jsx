import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { defaultScreenStyle } from '../../styles/screenStyle'
import { screenHeight, screenWidth } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowRight2, Award, Key, Logout, LogoutCurve, Magicpen, NotificationBing, VideoPlay } from 'iconsax-react-nativejs'
import { Colors } from '../../theme/colors'
import { PREMIUM, PROFILEEDIT } from '../../utils/routes'
import MenuItem from '../../components/ui/MenuItem'
import { logOut } from '../../redux/slices/authSlice'
import CustomModal from '../../components/ui/CustomModal'
import Button from '../../components/ui/Button'

const Profile = ({ navigation }) => {

  const { user } = useSelector(state => state.auth)
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();


  const profileMenu = [
    {
      id: 1,
      icon: <Award size={24} color={Colors.SECOND} />,
      title: "Buy Premium",
      onPress: () => navigation.navigate(PREMIUM)
    },
    {
      id: 2,
      icon: <Magicpen size={24} color={Colors.SECOND} />,
      title: "Edit Profile",
      onPress: () => navigation.navigate(PROFILEEDIT)
    },
    {
      id: 3,
      icon: <NotificationBing size={24} color={Colors.SECOND} />,
      title: "Notifications"
    },
    {
      id: 4,
      icon: <Key size={24} color={Colors.SECOND} />,
      title: "Security"
    },
    {
      id: 5,
      icon: <Logout size={24} color={Colors.SECOND} />,
      title: "Log Out",
      onPress: () => { // çıkış yapma modalını göster
        setModalVisible(true)
      }
    }
  ]


  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.container}>


        {/* custom modal */}
        <CustomModal
          icon={
            <LogoutCurve size={80} color={Colors.SECOND} />
          }
          title='Sign Out'
          description='Are you sure you really want to log out?'
          modalVisible={modalVisible}
          closeButton={
            <Button
              title='Cancel'
              onPress={() => setModalVisible(false)}
              style={styles.closeBtn}
              textStyle={styles.closeText}
            />
          }
          successButton={
            <Button
              title='Sign Out'
              onPress={() => dispatch(logOut())}
              style={styles.successBtn}
            />
          }
        />


        <ScrollView>
          <View style={styles.infoContainer}>
            <Image
              source={require('../../assets/images/image3.png')}
              style={styles.image}
            />
            <Text style={styles.name}>{user?.username || 'New User'}</Text>
            <Text style={styles.location}>{user?.location || "World"}</Text>
          </View>
          <View>
            {
              profileMenu.map((item, index) => (
                <MenuItem onPress={item.onPress} item={item} key={index} />
              ))
            }
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: screenHeight / 3
  },

  image: {
    width: screenWidth / 3 + 10,
    height: screenWidth / 3 + 10,
    borderRadius: 1000
  },

  name: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 15
  },

  location: {
    fontSize: 16,
    marginTop: 5
  },

  closeBtn: {
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: Colors.SECOND,
  },

  closeText: {
    color: Colors.SECOND
  }

})