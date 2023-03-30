import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import { UserChat, AssistantChat } from "../components"
import Constants from "expo-constants"

const ChatLogScreen = () => {
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let messages = [];
  const date = new Date();
  const timeStamp = date;//I will do something with it letter
  const sendMessage = async () => {
    setIsLoading(true);
    const newUserMessage = { "role": "user", "content": userMessage, "timestamp": timeStamp }
    messages.push(newUserMessage);
    try {
      const res = await fetch("https://code-hustel.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages
        })
      })
      const data = await res.json();
      const assistantMessage = data.completion.content;
      const newAssistantMessage = { "role": "assistant", "content": assistantMessage, "timestamp": timeStamp }
      messages.push(newAssistantMessage);
      console.log(data.completion.content);
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT)
    } finally {
      setIsLoading(false);
      setUserMessage("");
    }
  }

  const renderItem = ({ item }) => {
    if (item.role === "user") {
      return <UserChat text={item.content} timestamp={timeStamp} isLoading={isLoading}/>
    }
    return <AssistantChat text={item.content} timestamp={timeStamp} isLoading={isLoading}/>
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View><Text>9270</Text></View>
          <View><Text>9270</Text></View>
        </View>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={({ item, i }) => i}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.inputContainer}>
          <TextInput placeholder='Type a message' />
          <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
            <Text>Icon</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  )
}

export default ChatLogScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    height: "100%",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "purple",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
  },
  input: {
    padding: 10,
    backgroundColor: "white",
    flex: 1,
    fontFamily: "Prompt-Regular"
  },
  sendBtn: {
    backgroundColor: "purple",
    borderRadius: 30,
    margin: 5,
  }
})