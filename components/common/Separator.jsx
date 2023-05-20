import { StyleSheet,View } from 'react-native'
import React from 'react'

const Separator = () => {
  return (
    <View style={styles.separator}>
    </View>
  )
}

export default Separator

const styles = StyleSheet.create({
    separator: {
        height: 1,
        width: "100%",
        backgroundColor: "#515454b7"
    },
})