import { View, Text, StyleSheet, Pressable ,PermissionsAndroid,Alert,Platform} from 'react-native'
import React, { useEffect, useState ,useRef} from 'react';
import { useRoute } from '@react-navigation/native';
import CallAction from '../../../components/callaction/callAction';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Voximplant} from 'react-native-voximplant';
import {useNavigation} from '@react-navigation/core';
const permissions=[
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    PermissionsAndroid.PERMISSIONS.CAMERA,

];
export default function CallingScreen() {
    const Client = Voximplant.getInstance();
//const currentCall = useRef().current; // audio will be muted
    const navigation=useNavigation();
    const[permissionGranted,setPermissionGranted]=useState(false);
    const[localVideoStreamId,setLocalVideoStreamId]=useState('');
    const[remoteVideoStreamId,setRemoteVideoStreamId]=useState('');
    const[callstatus,setCallstatus]=useState('Initializing..........');
    const route=useRoute();
    const {user, call: incomingCall, isIncomingCall}=route?.params;
    const voximplant=Voximplant.getInstance();
    const call=useRef(incomingCall);
    const endpoint=useRef(null);
    const goBack =()=>{
        navigation.pop();
    }

    useEffect(()=>{
        const getPermissions= async()=>{
        const granted = await PermissionsAndroid.requestMultiple(permissions);
        const recordAudioGranted =
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] = 'granted';
        const cameraGranted =
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] = 'granted';
        if (!cameraGranted | !recordAudioGranted) {
        Alert.alert('Permissions not granted');
        } else {
        setPermissionGranted(true);
        }  
        }
        if(Platform.OS==='android'){
        getPermissions();
        }
        else{
            setPermissionGranted(true);
        }
    },[]);
    
    useEffect(()=>{
if(!permissionGranted){
    return;
}
const callSetting={
    video:{
        sendVideo:true,
        receiveVideo:true,
    },
};

const makecall=async ()=>{
     call.current=await voximplant.call(user.user_name,callSetting);
    suscribeToCallEvents();
}
const answerCall=async()=>{
    suscribeToCallEvents();
    endpoint.current=call.current.getEndpoints()[0];
    subscribeToEndpointEvents();
    call.current.answer(callSetting);
}
const suscribeToCallEvents=()=>{
    call.current.on(Voximplant.CallEvents.Failed, (callEvent)=>{
        showError(callEvent.reason);
    });
    call.current.on(Voximplant.CallEvents.ProgressToneStart, (callEvent)=>{
        setCallstatus("Calling")
        
    });
    call.current.on(Voximplant.CallEvents.Connected,callEvent=>{
        setCallstatus('Connected');
    });
    call.current.on(Voximplant.CallEvents.Disconnected,callEvent=>{
        navigation.navigate('contact')
    });
    call.current.on(Voximplant.CallEvents.LocalVideoStreamAdded, callEvent => {
        setLocalVideoStreamId(callEvent.videoStream.id);
        },);
        call.current.on(Voximplant.CallEvents.EndpointAdded, callEvent => {
            endpoint.current = callEvent.endpoint;
            subscribeToEndpointEvents();
            });
   
};
const  subscribeToEndpointEvents=async()=>{
    endpoint.current.on(Voximplant.EndpointEvents.RemoteVideoStreamAdded,endpointEvent=>{
        setRemoteVideoStreamId(endpointEvent.videoStream.id)
    })
}
const showError=(reason)=>{
    Alert.alert("Call Failed",`Reason :${reason}`,[
        {
            text:'OK',
            onPress:navigation.navigate('contact')
        },
    ]);
}
if(isIncomingCall){
    answerCall();

}
else{
    makecall();
}

return ()=>{
    call.current.off(Voximplant.CallEvents.Failed);
    call.current.off(Voximplant.CallEvents.ProgressToneStart);
    call.current.off(Voximplant.CallEvents.Connected);
    call.current.off(Voximplant.CallEvents.Disconnected);

}
    },[permissionGranted]);
   
   
    const onHangupPress=()=>{
        call.current.hangup();

    }
    const onMute=()=>{
       call.current.sendAudio(false);
    }
    const onReverseCamera = ()=>{
        console.warn("check log");
        Voximplant.CameraType.BACK
        }
    return (
        <View style={styles.s1}>  
            <View style={styles.cameraPreview}>
            <Pressable onPress={goBack} style={styles.backbutton}>

            <Ionicons name="chevron-back" color="white" size={20}/>
            <Voximplant.VideoView
            videoStreamId={localVideoStreamId}
            style={styles.localVideo}
            />
             <Voximplant.VideoView
            videoStreamId={remoteVideoStreamId}
            style={styles.remoteVideo}
            />
            </Pressable>
                <Text style={styles.name}>{user?.user_display_name}</Text>
                <Text style={styles.phoneNumber}>{callstatus}</Text> 
            </View>
           <CallAction onHangupPress={onHangupPress} onMute={onMute} onReverseCamera={onReverseCamera}/>
        </View>
    )
}
const styles = StyleSheet.create({
    s1: {
        backgroundColor:'red',
        height:'100%'
    },
    cameraPreview: {
        backgroundColor: '#7b4e80',
        flex: 1,
        alignItems:'center',
        paddingTop:10,
        paddingHorizontal:10
    },
    name:{
        fontSize:30,
        fontWeight:'bold',
        color:'white',
        marginTop:50,
        marginBottom:10,
    },
    phoneNumber:{
        fontSize:25,
        color:'white'
    },
    buttonContainer:{
        backgroundColor:'#333333',
        padding:20,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        width:'100%',
        marginTop:'auto',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingBottom:40
    },
    iconButton:{
        backgroundColor:'#4a4a4a',
        padding:15,
        borderRadius:50
    },
    backbutton:{
        position:'absolute',
        top:30,
        left:10,
        zIndex:10,
    },
    localVideo:{
         width:100,
    height:100,
    backgroundColor:'green',
    position:'absolute',
    right:10,
    left:10,
    top:30,
    borderRadius:10
    },
    remoteVideo:{
        width:300,
        height:400,
        backgroundColor:'green',
        position:'absolute',
        left:10,
    
        top:200,
        borderRadius:10 
    }

})