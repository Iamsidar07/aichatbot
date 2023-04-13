import { Text } from 'react-native'
import React from 'react'

const MyText = ({style,text}) => {
  
  return (
    <Text style={[{ fontFamily: "Sen-Regular",fontSize:16,color:"#343539" },style, ]}>{text}</Text>
  )
}

export default MyText