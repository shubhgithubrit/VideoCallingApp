import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import CallAction from '../../../components/callaction/callAction';

const CallScreen = () => {
  return (
    <View style={styles.s1}>    
        <View style={styles.cameraPreview}/>
      <CallAction/>
    
    </View>
  )
}
const styles=StyleSheet.create({
    s1:{
        flex:1,
        backgroundColor: '#7b4e80',
    },
    cameraPreview:{
    width:150,
    height:200,
    backgroundColor:'green',
    position:'absolute',
    right:10,
    top:30,
    borderRadius:10
    }
})

export default CallScreen