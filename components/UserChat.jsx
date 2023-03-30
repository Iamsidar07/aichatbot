import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyText from '../MyText'

const UserChat = ({ text, timestamp }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/icon.png")}
                style={styles.userImage}
                resizeMode='contain'
            />
            <View>
                <MyText text={text} style={styles.text} />
                <MyText text={timestamp} style={styles.timestamp} />
            </View>
        </View>
    )
}

export default UserChat

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    userImage: {
        position: "absolute",
        bottom: 10,
        left: -5,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 30,
    },
    text: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 15,
    },
    timestamp: {
        fontSize: 12,
    },
})