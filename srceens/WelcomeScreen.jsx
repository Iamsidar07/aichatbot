import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MyText from '../MyText'
import Constants from "expo-constants"
import Lottie from "lottie-react-native"

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <MyText text={"Hello,"} style={styles.headingText} />
          <MyText text={"I'm Codey"} style={styles.subHeadingText} />
        </View>
        <Lottie source={require("../assets/chat.json")} autoPlay style={styles.logo} />
        <View>
          <MyText text={"How Can I help you ?"} style={styles.subHeadingText} />
          <TouchableOpacity style={styles.btn} onPress={()=>navigation.push("ChatLogScreen")}>
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
    backgroundColor: "#7438F8",
    height: "100%",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  headingText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center"
  },
  subHeadingText: {
    fontSize: 28,
    color: "white",
    marginTop: 5,
    textAlign: "center"
  },
  logo: {
    width: "100%",
    height:200,
  },
  btnText: {
    fontSize: 24,
    color: "#7438F8",
    textAlign: "center"
  },
  btn: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 15,
    borderRadius: 40,


  }
})