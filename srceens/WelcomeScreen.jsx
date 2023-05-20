import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import MyText from '../MyText';
import Constants from "expo-constants";

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require("../assets/bot.png")} style={styles.logo} resizeMode='contain' />
          <MyText text={"Hey Codey🚀"} style={styles.botName} />
        </View>
        <View>
          <MyText text={"How Can I help you ?"} style={styles.subHeadingText} />
          <TouchableOpacity style={styles.btn} onPress={() => navigation.push("ChatLogScreen")}>
            <MyText text={"I want to know"} style={styles.btnText} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: "#1c202a",
    height: "100%",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: "100%",
    height: 400,
    position: "relative"
  },
  botName: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#272c39",
    color: "white",
    borderRadius: 25,
    borderBottomRightRadius: 5,
    marginTop: 20,
    paddingVertical: 25,
    paddingHorizontal: 25,
    opacity:0.9,


  },
  subHeadingText: {
    fontSize: 28,
    color: "white",
    marginTop: 5,
    textAlign: "center"
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  btnText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#272c39",
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginTop: 35,
    borderRadius: 40,
  }
})