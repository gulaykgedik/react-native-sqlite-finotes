import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../theme/colors';
import { screenWidth } from '../../utils/constants';

const CustomModal = (props) => {

    const {
        modalVisible = true,
        title,
        description,
        icon,
        closeButton = null,
        successButton = null
    } = props;


    return (
        <Modal
            style={styles.container}
            transparent
            animationType='fade'
            visible={modalVisible}
        >
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={styles.iconContainer}>
                        {icon}
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        {successButton}
                        {closeButton}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default CustomModal

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    body: {
        backgroundColor: Colors.WHITE,
        width: screenWidth * 0.85,
        minHeight: screenWidth,
        borderRadius: 8,
        padding: 10,
        paddingBottom: 20
    },

    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },

    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        

    },

    btnContainer:{
        flex:1,
        justifyContent:"space-around",
        marginBottom: 10
    },

    title:{
        fontWeight: "700",
        fontSize: 24,
    },

    description: {
        fontSize: 20,
        marginVertical: 10,
        textAlign:"center"
    }

})