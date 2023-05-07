import { Text } from 'react-native'
import React from 'react'

const MyText = ({style,text,...otherProps}) => {
  
  return (
    <Text {...otherProps} style={[{ fontFamily: "Sen-Regular",fontSize:16,color:"#343539" },style]}>{text}</Text>
  )
}

export default MyText