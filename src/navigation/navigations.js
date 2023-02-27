import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ContactScreen from '../screens/contactScreen/contactScreen';
import CallScreen from '../screens/contactScreen/callScreen/callScreen';
import Incoming from '../screens/contactScreen/incoming/Incoming';
import CallingScreen from '../screens/contactScreen/callingScreen/CallingScreen';
import LoginScreen from '../screens/contactScreen/Login/login';

const Stack=createNativeStackNavigator();
const Navigations = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator >     
        <Stack.Screen name='login' component={LoginScreen} />       
    <Stack.Screen name='contact' component={ContactScreen} />       
    <Stack.Group screenOptions={{headerShown:false}}>
    <Stack.Screen name='calling' component={CallingScreen} />        
    <Stack.Screen name='call' component={CallScreen} />        
    <Stack.Screen name='incoming' component={Incoming} />        
    
        </Stack.Group> 
           </Stack.Navigator>
 
    </NavigationContainer>
  )
}

export default Navigations;