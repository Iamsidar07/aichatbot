import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import MyText from '../MyText'
import Loading from './Loading'

const AssistantChat = ({ text, isLoading}) => {
    return (
        <>
            {
                isLoading && (text==="loading") ? <Loading /> : (<View style={styles.container}>
                    <View>
                        <Image
                            source={require("../assets/logo.jpg")}
                            style={styles.assistantImage}
                            resizeMode='contain'
                        />
                        <MyText text={text} style={styles.text} />
                    </View>
                </View>)
            }
        </>
    )
}

export default AssistantChat

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 30,
    },
    assistantImage: {
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 30,
        width: 40,
        height: 40,
        zIndex: 20,
        position: "absolute",
        top: -20,
        left: -8,
    },
    text: {
        backgroundColor: "#7438F8",
        color: "white",
        padding: 10,
        borderRadius: 15,
        marginTop: 10
    },
    timeStamp: {
        fontSize: 12,
    },
})