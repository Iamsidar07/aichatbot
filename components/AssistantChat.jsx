import { Image, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MyText from '../MyText'
import Loading from './Loading'
import * as Clipboard from "expo-clipboard";
import { Feather } from '@expo/vector-icons';
import { boxshadow } from "../contants"
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
                    <View style={[styles.container,boxshadow]}>
                        <Image
                            source={require("../assets/logo.jpg")}
                            style={styles.assistantImage}
                            resizeMode='contain'
                        />
                        <View>
                            <MyText text={message} style={styles.message} />
                        </View>
                        
                    </View>
                    <TouchableOpacity style={[styles.copyBtn,boxshadow]} onPress={()=>copyToClipboard(message)}>
                        <Feather name="copy" size={18} color="#7438F8" />
                        <MyText text={"Copy Text"} style={styles.copyBtnText} />
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
        borderColor: "white",
        borderRadius: 30,
        width: 40,
        height: 40,
        zIndex: 20,
        position: "absolute",
        top: -25,
        left: -5,
    },
    message: {
        backgroundColor: "#7438F8",
        color: "white",
        padding: 15,
        borderRadius: 10,
        borderBottomRightRadius:0,
        marginTop: 10
    },
    timeStamp: {
        fontSize: 12,
    },
    copyBtn: {
        backgroundColor:"white",
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:5,
        marginTop:5,
        alignSelf:"flex-start",
        flexDirection:"row",
        alignItems:"center",
    },
    copyBtnText:{
        color:"#7438F8",
        textAlign:"center",
        marginLeft:5,
        padding:5
    }
})