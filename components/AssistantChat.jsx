import { Image, StyleSheet, ToastAndroid, View } from 'react-native'
import React from 'react'
import MyText from '../MyText'
import Loading from './Loading'
import * as Clipboard from "expo-clipboard";
import { Feather } from '@expo/vector-icons';

const AssistantChat = ({ text, isLoading}) => {

    const copyToClipboard = async (text) => {
        await Clipboard.setStringAsync(text);
        showToast("copied.")

    };
    function showToast(message) {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
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
                        <Feather name="copy" size={14} color="white" style={styles.copyBtn} onPress={()=>copyToClipboard(text)}/>
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
        padding:15,
        borderRadius: 15,
        marginTop: 10
    },
    timeStamp: {
        fontSize: 12,
    },
    copyBtn:{
        position:'absolute',
        bottom:4,
        right:8,

    }
})