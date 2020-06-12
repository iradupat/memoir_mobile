import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios'

const test =()=>{
  axios({
    method:'GET',
    url:'https://stalgia-webserver.herokuapp.com/api/chapters/', 
    
    headers:{
        "Authorization": `Token 254a92fb13cfed21312013182e8327152bccf696542ab71cfa32ab771ef65abc`

    }
}
).then((response)=>{
console.log(response.data)


}).catch((error)=>{


if (error.response) {
/*
 * The request was made and the server responded with a
 * status code that falls out of the range of 2xx
 */
console.log(error.response.data);
console.log(error.response.status);
console.log(error.response.headers);
} else if (error.request) {
/*
 * The request was made but no response was received, `error.request`
 * is an instance of XMLHttpRequest in the browser and an instance
 * of http.ClientRequest in Node.js
 */
console.log(error.request);
} else {
// Something happened in setting up the request and triggered an Error
console.log('Error', error.message);
}
console.log(error);
// console.log(error)
// alert(error)

})
}


const testFetch =async()=>{
  const respo = await fetch('https://stalgia-webserver.herokuapp.com/api/chapters/',{
    headers:{
      "Authorization": "Token 50be17ce6476b05b825bcfa8910a66a8d055fcf6d4862ebe6911d3b6db958f98"
    }
  })
  const data = await respo.json()
  console.log(data)
}
export default function TestScreen() {

  return (
    <View style={{ flex: 1, justifyContent:'center', alignItems:'center'}}>
        <Text>Hello</Text>
        <Button title="test" onPress={testFetch}/>
    </View>
 )
}
