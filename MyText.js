import { View, Text } from 'react-native'
import React from 'react'

const MyText = ({style,text}) => {
  
  return (
    <Text style={[{ fontFamily: "Prompt-Regular",fontSize:18,color:"#343539" },style, ]}>{text}</Text>
  )
}

export default MyText