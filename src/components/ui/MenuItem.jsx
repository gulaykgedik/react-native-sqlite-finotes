
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ArrowRight2 } from 'iconsax-react-nativejs'
import { Colors } from '../../theme/colors'
import { screenWidth } from '../../utils/constants'

const MenuItem = (props) => {

    const { item, onPress } = props

    return (
        <Pressable

            style={styles.btn}
            onPress={onPress}
            {...props}
        >
            <View>
                <View
                    style={{ backgroundColor: Colors.WHITE, padding: 5, borderRadius: 8 }}
                >
                    {item.icon}
                </View>
            </View>
            <View style={{ flex: 1, padding: 5 }}>
                <Text>{item.title}</Text>
            </View>
            <View>
                <ArrowRight2 />
            </View>
        </Pressable>
    )
}

export default MenuItem

const styles = StyleSheet.create({
    btn: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        gap: 10,
        marginVertical: 5,
        paddingVertical: 10,
        width: screenWidth * 0.8,
        marginHorizontal: "auto"
    }
})
