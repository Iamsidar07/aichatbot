import { StyleSheet, View} from 'react-native'
import React from 'react'
import  Lottie  from 'lottie-react-native'
const Loading = () => {
    return (
        <View style={styles.container}>
            <Lottie source={require("../assets/loading.json")} autoPlay loop style={styles.logo} />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#272c39",
        borderRadius: 15,
        borderTopLeftRadius: 5,
        marginTop: 30,
        width: 100,
        alignItems:"center",
        justifyContent:"center",
    },
    logo: {
        width: 100,
        height: 50,
    }
})