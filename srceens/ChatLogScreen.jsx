import { Alert, FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { UserChat, AssistantChat } from "../components"
import Constants from "expo-constants"
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import MyText from '../MyText';
import * as Speech from 'expo-speech';

let messages = [{
  "role": "assistant",
  "content": "How may I help you ?",
}];

const ChatLogScreen = ({ navigation }) => {
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const tempAssistantMessage = { "role": "assistant", "content": "loading" };
  //greet user Once after opening app;
  useEffect(() => {
    Speech.speak("Hello, How may I help you.")
    return () => {
      Speech.stop();
    }
  }, []);

  const readText = async (text) => {
    Speech.speak(text);
  }
  const handleMicPress = () => {
    setIsStopped(!isStopped);
    Speech.stop();
  }
  const sendMessage = async () => {
    setIsLoading(true);
    setIsStopped(false);
    const newUserMessage = { "role": "user", "content": userMessage }
    messages.push(newUserMessage);
    messages.push(tempAssistantMessage); // I will remove once assistant message comes
    setUserMessage("");
    try {
      const res = await fetch("https://code-hustel.onrender.com/api/v1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "messages": messages
        })
      })
      const data = await res.json();
      const assistantMessage = data.completion.content;
      const newAssistantMessage = { "role": "assistant", "content": assistantMessage }
      messages.pop();//remove tempAssistantMessage
      messages.push(newAssistantMessage);
      readText(assistantMessage);
    } catch (error) {
      messages.push({"role":"assistant","content":"Oops,Something went wrong..."})
      Alert.alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  const renderChat = ({ item }) => item.role === "user" ?
    (<UserChat message={item.content} isLoading={isLoading} />) :
    (<AssistantChat message={item.content} isLoading={isLoading} />)

  return (
    <ImageBackground source={require("../assets/chatBg.png")} style={StyleSheet.absoluteFillObject} resizeMode='cover'>
      <SafeAreaView >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Ionicons name="arrow-back-outline" size={28} color="white" />
            </TouchableOpacity>
            <View style={styles.logoAndNameContainer}>
              <Image source={require("../assets/logo.jpg")} style={styles.logo} resizeMode='contain' />
              <MyText text={'Codey'} style={styles.subHeadingText} />
            </View>
          </View>


          {
            messages?.length !== 0 && <FlatList
              data={messages}
              renderItem={renderChat}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.chatLogContainer}
              scrollEnabled={true}
            />
          }


          <View style={styles.inputContainer}>
            <TextInput placeholder='Type a message ' value={userMessage} onChangeText={(value) => setUserMessage(value)} style={styles.input} />
            <TouchableOpacity onPress={handleMicPress} style={[styles.sendBtn, styles.micBtn]} >
              <Feather name={`${isStopped ? "mic-off" : "mic"}`} size={18} color="#7438F8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
              <MaterialCommunityIcons name="send" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}



export default ChatLogScreen

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 7,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#7438F8",
    position:"relative"
  },
  backBtn: {
    position:"absolute",
    left:3,
    bottom:"30%",
  },
  chatLogContainer: {
    minHeight: "90%",
    paddingBottom: "30%",
    padding: 10
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginRight: 5,
  }
  ,
  subHeadingText: {
    fontSize: 20,
    color: "white",
    textAlign: "center"
  },
  logoAndNameContainer: {
    flexDirection: "row",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 10,
    justifyContent: "space-between"
  },
  input: {
    padding: 10,
    width: "70%",
    backgroundColor: "white",
    fontFamily: "Poppins-Regular"
  },
  sendBtn: {
    backgroundColor: "#7438F8",
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  micBtn: {
    padding: 5,
    backgroundColor: "transparent",
    borderRadius: 0,
  }
})
