import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import MyText from '../MyText'
import Loading from './Loading'

const AssistantChat = ({ text, timestamp,isLoading }) => {
    return (
        <>
        {
                isLoading ? (<View style={styles.container}>
                    <Image
                        source={require("../assets/icon.png")}
                        style={styles.assistantImage}
                        resizeMode='contain'
                    />
                    <View>
                        <MyText text={text} style={styles.text} />
                        <MyText text={timestamp} style={styles.timestamp} />
                    </View>
                </View>)  : <Loading/>
        }
        </>
    )
}

export default AssistantChat

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    assistantImage: {
        position: "absolute",
        bottom: 10,
        right: 5,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 30,
    },
    text: {
        backgroundColor: "purple",
        color: "white",
        padding: 10,
        borderRadius: 15,
    },
    timestamp: {
        fontSize: 12,
    },
})