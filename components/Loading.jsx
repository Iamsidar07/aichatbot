import { StyleSheet} from 'react-native'
import React from 'react'
import { Lottie } from 'lottie-react-native'
const Loading = () => {
    return (
        <Lottie source={"../assets/loading.json"} autoPlay loop style={styles.logo} />
    )
}

export default Loading

const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 50,
    }
})