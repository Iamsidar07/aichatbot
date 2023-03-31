import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import { UserChat, AssistantChat, Loading } from "../components"
import Constants from "expo-constants"
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import MyText from '../MyText';

let messages = [{
  "role":"assistant",
  "content":"How may I help you ?",
}];

const ChatLogScreen = ({ navigation }) => {
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [messages, setMessages] = useState([{ "role": "user", "content": "Hey" }]);


  const date = new Date();
  const timeStamp = date.getTime().toString();//I will do something with it letter
  const sendMessage = async () => {

    setIsLoading(true);

    const newUserMessage = { "role": "user", "content": userMessage}
    messages.push(newUserMessage);
    
    console.log({ messages })

    
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
      // console.log({ data })
      const assistantMessage = data.completion.content;
      const newAssistantMessage = { "role": "assistant", "content": assistantMessage}
      messages.push(newAssistantMessage);
      console.log({ messages })
      setUserMessage("");
    } catch (error) {
      console.log({ error })
    } finally {
      setIsLoading(false);

    }

  }


  const renderItem = ({ item,i }) => {
    // console.log({item})
    if (item.role === "user") {
      return <UserChat text={item.content} isLoading={isLoading} />
    }

      return <AssistantChat text={item.content} isLoading={isLoading} />
    
  }
  return (
    <SafeAreaView style={{ backgroundColor: "#7438F8" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back-outline" size={28} color="white" />
          </TouchableOpacity>
          <View style={styles.logoAndNameContainer}>
            <Image source={require("../assets/rocket.png")} style={styles.logo} resizeMode='contain' />
            <MyText text={'Codey'} style={styles.subHeadingText} />
          </View>
        </View>

          {
            messages?.length !== 0 && <FlatList
              data={messages}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.chatLogContainer}
              scrollEnabled={true}
            />
          }


        <View style={styles.inputContainer}>
          <TextInput placeholder='Type a message ' value={userMessage} onChangeText={(value) => setUserMessage(value)} style={styles.input} />
          <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
            <MaterialCommunityIcons name="send" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  )
}



export default ChatLogScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: "100%",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#7438F8",
    padding: 7,
  },
  chatLogContainer: {

    backgroundColor: "#F6F6F6",
    minHeight: "90%",
    paddingBottom:"30%",
    padding:10
  },

  backBtn: {
    position: 'absolute',
    left: 2,
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
    flexDirection: "row"
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
    width: "80%",
    backgroundColor: "white",
    fontFamily: "Poppins-Regular"
  },
  sendBtn: {
    backgroundColor: "#7438F8",
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    

  }
})