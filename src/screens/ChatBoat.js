import React, {useState, useEff} from 'react'
import { Button, Content, Input, Item, Form, Label, Header } from 'native-base';
import { View, StyleSheet, Image, ImageBackground, Text, Keyboard, TouchableWithoutFeedback } from 'react-native'
import {Actions} from 'react-native-router-flux'
import {useDispatch, useSelector} from 'react-redux'
import * as AuthActions from '../redux/actions/Auth'
import ChatBot from 'react-native-chatbot';
const steps = [
    {
        id: '0',
        message: 'Welcome to react chatbot!',
        trigger: '1',
      },
      {
        id: '1',
        message: 'Bye!',
        end: true,
      },
];
const ChatBoatScreen = props => {

    return (
        <View style={{flex:1, paddind:22}}>
            {/* <Header/> */}
                 <ChatBot steps={steps} />
         </View>
       

    )
}



export default ChatBoatScreen