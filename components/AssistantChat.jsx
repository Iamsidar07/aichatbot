import { Image, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MyText from '../MyText'
import Loading from './Loading'
import * as Clipboard from "expo-clipboard";
import { Feather } from '@expo/vector-icons';
const AssistantChat = ({ message, isLoading }) => {
    const copyToClipboard = async (message) => {
        await Clipboard.setStringAsync(message);
        showToast("copied.")

    };
    function showToast(message) {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
    return (
        <View>
            {
                isLoading && (message === "loading") ? <Loading /> : (<View>
                    <View style={[styles.container]}>
                        <Image
                            source={require("../assets/logo.jpg")}
                            style={styles.assistantImage}
                            resizeMode='contain'
                        />
                        <View>
                            <MyText text={message} style={styles.message} />
                        </View>
                        
                    </View>
                    <TouchableOpacity style={[styles.copyBtn]} onPress={()=>copyToClipboard(message)}>
                        <Feather name="copy" size={18} color="white" />
                    </TouchableOpacity>
                </View>)
            }

        </View>
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
        borderColor: "#1d51d3",
        borderRadius: 30,
        width: 40,
        height: 40,
        zIndex: 20,
        position: "absolute",
        top: -35,
        left: 0,
    },
    message: {
        backgroundColor: "#7269E3",
        color: "white",
        borderRadius: 25,
        borderTopLeftRadius:5,
        marginTop: 10,
        paddingVertical:25,
        paddingHorizontal:20,
    },
    timeStamp: {
        fontSize: 12,
    },
    copyBtn: {
        backgroundColor:"#272c39",
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:5,
        alignSelf:"flex-start",
        flexDirection:"row",
        alignItems:"center",
    },

})