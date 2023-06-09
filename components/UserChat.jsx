import { StyleSheet } from 'react-native'
import React from 'react'
import MyText from '../MyText'

const UserChat = ({ message }) => {
    return (
        <MyText text={message} style={styles.text} />
    )
}

export default UserChat

const styles = StyleSheet.create({
    text: {
        backgroundColor: "#272c39",
        color:"white",
        borderRadius: 25,
        borderBottomRightRadius: 5,
        marginTop: 20,
        marginBottom:10,
        paddingVertical: 25,
        paddingHorizontal: 25,
        alignSelf:"flex-end"
    },
})