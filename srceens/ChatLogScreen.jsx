import { Alert, FlatList, Image,  SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { UserChat, AssistantChat } from "../components"
import Constants from "expo-constants"
import { AntDesign,  Feather } from '@expo/vector-icons';
import MyText from '../MyText';
import * as Speech from 'expo-speech';
import { boxShadow } from '../contants';

let messages = [{
  "role": "assistant",
  "content": "Hello 👋, I am codey. How may I help you.",
},];

const ChatLogScreen = ({ navigation }) => {
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const tempAssistantMessage = { "role": "assistant", "content": "loading" };
  //greet user Once after opening app;
  useEffect(() => {
    Speech.speak("Hello , I am codey. How may I help you.")
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
      messages.push({ "role": "assistant", "content": "Oops,Something went wrong..." })
      Alert.alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  const renderChat = ({ item }) => item.role === "user" ?
    (<UserChat message={item.content} isLoading={isLoading} />) :
    (<AssistantChat message={item.content} isLoading={isLoading} />)

  return (

    <SafeAreaView >
      <View style={styles.container}>
        <View style={[styles.header]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <AntDesign name="left" size={16} color="white" />
          </TouchableOpacity>
          <View style={styles.botNameStatusContainer}>
            <MyText text={'Codey bot'} style={styles.subHeadingText} />
            <View style={styles.onlineStatusContainer}>
              <View style={styles.onlineStatusIcon}></View>
              <MyText text={'Online'} style={styles.onlineStatus} />
            </View>
          </View>
          <Image source={require("../assets/logo.jpg")} style={styles.logo} resizeMode='contain' />
        </View>
        <View style={styles.seperator} />


        {
          messages?.length !== 0 && <FlatList
            data={messages}
            renderItem={renderChat}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.chatLogContainer}
            scrollEnabled={true}
          />
        }


        <View style={[styles.inputContainer, boxShadow]}>
          <TextInput placeholder='Ask anything' value={userMessage} onChangeText={(value) => setUserMessage(value)} style={styles.input}  placeholderTextColor={"#636d83"} />
          <TouchableOpacity onPress={handleMicPress} style={[styles.sendBtn, styles.micBtn]} >
            <Feather name={`${isStopped ? "mic-off" : "mic"}`} size={18} color="#636d83" />
          </TouchableOpacity>
          <TouchableOpacity onPress={sendMessage} style={[styles.sendBtn, boxShadow]}>
            <AntDesign name="right" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView >

  )
}



export default ChatLogScreen

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "#1c202a"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 7,
    paddingTop: Constants.statusBarHeight + 15,
    paddingBottom: 10,
  },
  backBtn: {
    backgroundColor: "#272c39",
    width: 50,
    height: 50,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  botNameStatusContainer:{
   alignItems:"center",
  },
  onlineStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop:5,
  },
  onlineStatus: {
    fontSize: 14,
    marginLeft: 3,
    color:"white",
    opacity:0.5
  },
  onlineStatusIcon: {
    width: 10,
    height: 10,
    borderRadius: 40,
    backgroundColor: "green",
  },
  seperator: {
    height: 1,
    width: "100%",
    backgroundColor: "#272c39"

  },
  chatLogContainer: {
    minHeight: "90%",
    paddingBottom: "30%",
    padding: 10,
    marginTop: 25,
  },
  logo: {
    width: 45,
    height: 45,
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
    backgroundColor: "#272c39",
    padding: 10,
    justifyContent: "space-between"
  },
  input: {
    padding: 10,
    width: "70%",
    fontFamily: "Sen-Regular",
    color: "white",
    fontSize:18
  },
  sendBtn: {
    backgroundColor: "#564ec3",
    width:50,
    height:50,
    borderRadius:30,
    alignItems: "center",
    justifyContent: "center",
  },
  micBtn: {
    padding: 5,
    backgroundColor: "transparent",
    borderRadius: 0,
  }
})
