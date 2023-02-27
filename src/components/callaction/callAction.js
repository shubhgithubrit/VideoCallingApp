import { View, Text ,StyleSheet,Pressable} from 'react-native'
import React ,{useState} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CallAction = ({onHangupPress,onMute,onReverseCamera}) => {
    const [isCameraOn,setIsCameraOn]=useState(true);
    
    const [isMicOn,setIsMicOn]=useState(true);
    const ReverseCamera =()=>{

    }
    const ToggleCamera =()=>{
      setIsCameraOn(!isCameraOn)  
    }
    const ToggleMicrophone =()=>{
        setIsMicOn(!isMicOn)   
    }
   
  return (
    <View style={styles.buttonContainer}>
    <Pressable onPress={onReverseCamera} style={styles.iconButton}>
    <Ionicons name="ios-camera-reverse" size={20} color={"white"}/>
    </Pressable>
    <Pressable onPress={ToggleCamera} style={styles.iconButton}>
    <MaterialIcons name={isCameraOn? "camera-off":'camera'} size={20} color={"white"}/>
    </Pressable>
    <Pressable onPress={onMute}  style={styles.iconButton}>
    <MaterialIcons name={ onMute?"microphone-off":'microphone'} size={20} color={"white"}/>
    </Pressable>
    <Pressable onPress={onHangupPress}  style={[styles.iconButton,{backgroundColor:'red'}]}>
    <MaterialIcons name="phone-hangup" size={20} color={"white"}/>
    </Pressable>

</View>
  )
}
const styles = StyleSheet.create({
  
  
    buttonContainer:{
        backgroundColor:'#333333',
        padding:20,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        width:'100%',
        marginTop:'auto',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingBottom:40,
        marginTop:'auto'
    },
    iconButton:{
        backgroundColor:'#4a4a4a',
        padding:15,
        borderRadius:50
    }

})
export default CallAction