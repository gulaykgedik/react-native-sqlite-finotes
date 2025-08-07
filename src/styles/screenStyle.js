import { StyleSheet } from "react-native";
import { Colors } from "../theme/colors";



const defaultScreenStyle = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: Colors.FIRST,
       
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 5,
    },
});

export {defaultScreenStyle};