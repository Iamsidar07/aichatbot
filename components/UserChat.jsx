import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import MyText from '../MyText'

const UserChat = ({ text }) => {
    return (
        <View style={styles.container}>
            <View style={styles.userImage}>
                <Image
                    source={require("../assets/boy.jpg")}
                    style={{width:"100%",height:"100%",borderRadius:70}}
                    resizeMode='cover'
                />
            </View>
            <View>
                <MyText text={text} style={styles.text} />
                {/* <MyText text={timeStamp} style={styles.timeStamp} /> */}
            </View>
        </View>
    )
}

export default UserChat

const styles = StyleSheet.create({
    container: {
        flexDirection: "row-reverse",
        marginTop:30,
    },
    userImage: {
        borderWidth: 2,
        borderColor: "#7438F8",
        borderRadius: 70,
        backgroundColor:"white",
        padding:2,
        width:40,
        height:40,
        zIndex: 50,
        position: "absolute",
        bottom: -30,
        left: 0,
    },
    text: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 15,
    },
    timeStamp: {
        fontSize: 12,
    },
})