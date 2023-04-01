import { ToastAndroid } from "react-native"

export const showToast=({content})=>{
    ToastAndroid.showWithGravity(content,ToastAndroid.SHORT);
}