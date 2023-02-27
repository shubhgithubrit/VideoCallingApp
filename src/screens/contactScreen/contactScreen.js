import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, FlatList, TextInput, Pressable } from "react-native";
import dummyvalue from '../../../assets/data/value.json';
import {Voximplant} from 'react-native-voximplant';
const ContactScreen = ({navigation}) => {
    const voximplant=Voximplant.getInstance();
    const [searchName, setSearchName] = useState('');
    const [filterNumber, setFilterNumber] = useState(dummyvalue);
    useEffect(()=>{
         voximplant.on(Voximplant.ClientEvents.IncomingCall,incomingCallEvent=>{
            navigation.navigate('incoming',{call:incomingCallEvent.call});
         });
         return ()=>{
            voximplant.off(Voximplant.ClientEvents.IncomingCall);
         }
    },[])
    useEffect(() => {
        const newNumber = dummyvalue.filter(value => value.user_display_name.toLowerCase().includes(searchName.toLowerCase()));
        setFilterNumber(newNumber);
    }, [searchName])

    const callUser=user=>{
        navigation.navigate('calling',{user})
    }
    return (
        <View style={styles.s1}>
            <TextInput placeholder="Search....." style={styles.s4}
                value={searchName}
                onChangeText={setSearchName}
            />
            <FlatList data={filterNumber}
                renderItem={({ item }) =>
                <Pressable onPress={()=>callUser(item)}>
                    <Text style={styles.s2}>{item.user_display_name}</Text>
                    </Pressable>
                }
                ItemSeparatorComponent={() => <View style={styles.s3} />}
            />
        </View>

    )
}
const styles = StyleSheet.create(
    {
        s1: {
            padding: 20,
            backgroundColor:'white',
            flex:1
        },
        s2: {
            fontSize: 15,
            marginVertical: 5
        },
        s3: {
            width: '100%',
            height: 1,
            backgroundColor: '#f0f0f0'
        },
        s4: {
            backgroundColor: 'lightgrey',
            padding: 5,
            borderRadius: 5
        }
    }
)
export default ContactScreen;