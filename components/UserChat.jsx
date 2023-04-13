import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import MyText from '../MyText'
import { boxShadow } from '../contants'
const UserChat = ({ message }) => {
    return (
        <View style={[styles.container,boxShadow]}>
            <View style={[styles.userLogoContainer,boxShadow]}>
                <Image
                    source={require("../assets/boy.jpg")}
                    style={[styles.userLogo,boxShadow]}
                    resizeMode='cover'
                />
            </View>
            <View>
                <MyText text={message} style={styles.text} />
            </View>
        </View>
    )
}

export default UserChat

const styles = StyleSheet.create({
    container: {
        flexDirection: "row-reverse",
        marginTop: 10,
    },
    userLogoContainer: {
        borderWidth: 2,
        borderColor: "#7438F8",
        borderRadius: 70,
        backgroundColor: "white",
        padding: 2,
        width: 40,
        height: 40,
        zIndex: 50,
        position: "absolute",
        bottom: -35,
        left: 0,
    },
    userLogo: {
        width: "100%",
        height: "100%",
        borderRadius: 70
    },
    text: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        borderTopLeftRadius:0,
    },
})