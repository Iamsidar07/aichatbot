import { Image, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MyText from '../MyText'
import Loading from './Loading'
import * as Clipboard from "expo-clipboard";
import { Feather } from '@expo/vector-icons';
import { reactions } from '../contants';

const AssistantChat = ({ message, isLoading }) => {
    const [reactionIcon, setReactionIcon] = useState(null);
    const [showReactionCard, setShowReactionCard] = useState(false);
    const copyToClipboard = async (message) => {
        await Clipboard.setStringAsync(message);
        showToast("copied.")
    };
    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
    const handleReactionIconPress = (icon) => {
        setReactionIcon(icon);
        setShowReactionCard(false);
    }
    const handleCopyBtnPress=()=>{
        copyToClipboard(message);
        setShowReactionCard(false);
    }
    const ReactionCard = () => {
        return <View style={styles.reactionCardContainer}>
            {
                reactions.map(({ icon, id }) => <TouchableOpacity key={id} onPress={() => handleReactionIconPress(icon)} style={styles.reactionIconContainer}>
                    <MyText text={icon} style={{fontSize:20,}} />
                </TouchableOpacity>)
            }
            <TouchableOpacity style={[styles.copyBtn]} onPress={handleCopyBtnPress}>
                <Feather name="copy" size={24} color="white" />
            </TouchableOpacity>
        </View>
    }

    console.log(reactionIcon)


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
                            <MyText text={message} style={styles.message} onLongPress={() => setShowReactionCard(true)} />
                            {
                                showReactionCard && <ReactionCard />
                            }
                            {
                                (reactionIcon && (!showReactionCard)) && <MyText text={reactionIcon} style={styles.reactionIcon} />
                            }

                        </View>

                    </View>
                    
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
        borderTopLeftRadius: 5,
        marginTop: 10,
        paddingVertical: 25,
        paddingHorizontal: 20,
    },
    copyBtn: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
    },
    reactionCardContainer: {
        backgroundColor: "#272c39",
        borderRadius:25,
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection:"row",
        alignItems:"center",
        alignSelf:"flex-start",
        justifyContent:"space-evenly",
        marginTop:5,
        zIndex:5,
    },
    reactionIcon: {
        position: "relative",
        left: 15,
        bottom: 15,
        backgroundColor: "#272c39",
        borderRadius: 25,
        padding: 10,
        alignSelf:"flex-start",
        fontSize:20,
        zIndex:2,
    },
    reactionIconContainer: {
        marginRight:15,
    }

})