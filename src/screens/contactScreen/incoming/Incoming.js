import { View, Text, ImageBackground, StyleSheet, Pressable,Alert } from 'react-native'
import React, { useEffect,useState } from 'react';
import image from '../../../../assets/images/ios_bg.png'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { useRoute } from '@react-navigation/native';
import {Voximplant} from 'react-native-voximplant';

export default function Incoming({navigation}) {
    const route=useRoute();
    const {call}=route.params;
    const[caller,setCaller]=useState(null);
    const Decline =()=>{
     call.decline();
    }
    const Accept =()=>{
navigation.navigate("calling",{
    call,
    isIncomingCall:true,
})
       }
       useEffect(()=>{
           setCaller(call.getEndpoints()[0].displayName);
        call.on(Voximplant.CallEvents.Disconnected,callEvent=>{
            navigation.navigate('contact')
        });
        return ()=>{
            call.off(Voximplant.CallEvents.Disconnected);
        }
       },[]);
    return (

        <ImageBackground source={image} style={styles.backGround} resizeMode="cover">
            <Text style={styles.name}>{caller}</Text>
            <Text style={styles.phoneNumber}>+91 9691776519</Text>
            <View style={[styles.row, { marginTop: 'auto' }]}>
                <View style={styles.iconContainer}>
                    <Ionicons name="alarm" size={20} color={'white'} />
                    <Text style={styles.iconText}>Remind me</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Entypo name="message" size={20} color={'white'} />
                    <Text style={styles.iconText}>Message</Text>
                </View>
            </View>
            <View style={styles.row}>
                {/* Decline Button */}
                <Pressable onPress={Decline} style={styles.iconContainer}>
                    <View style={styles.iconButtonContainer}>
                        <Feather name="x" size={20} color={'white'} />
                    </View>
                    <Text style={styles.iconText}>Decline</Text>
                </Pressable>
                   {/* Accept Button */}
                <Pressable onPress={Accept} style={styles.iconContainer}>
                    <View style={[styles.iconButtonContainer, { backgroundColor: 'blue' }]}>
                        <Feather name="check" size={20} color={'white'} />
                    </View>
                    <Text style={styles.iconText}>Accept</Text>
                </Pressable>
            </View>

        </ImageBackground>

    )
}
const styles = StyleSheet.create({

    backGround: {
        backgroundColor: 'red',
        flex: 1,
        alignItems: 'center',
        padding: 10,
        paddingBottom:50
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 50,
        marginBottom: 10,
    },
    phoneNumber: {
        fontSize: 25,
        color: 'white'
    },
    row:
    {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',

    },
    iconContainer: {
        alignItems: 'center',
        marginVertical: 20
    },
    iconText: {
        color: 'white'
    },
    iconButtonContainer: {
        backgroundColor: 'red',
        padding: 20,
        borderRadius: 50
    },
})