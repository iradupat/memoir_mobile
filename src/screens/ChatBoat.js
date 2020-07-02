import React, {useState, useEff} from 'react'
import { Button, Content, Input, Item, Form, Label, Header, Left, Icon } from 'native-base';
import { View, StyleSheet, Image, ImageBackground, Text, Keyboard, TouchableWithoutFeedback } from 'react-native'
import {Actions} from 'react-native-router-flux'
import {useDispatch, useSelector} from 'react-redux'
import * as AuthActions from '../redux/actions/Auth'
import { GiftedChat } from 'react-native-gifted-chat'

const ChatBoatScreen = props => {
  const [messages, setMessages] = useState([
            {
              _id: 1,
              text: 'Hello developer',
              createdAt: new Date(),
              sent: true,
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
            },
          
  ]) 
   
    return (
        <View style={{flex:1}}>
          <Header>
            <Left>
            
            <Button transparent onPress={()=>{Actions.pop()}}>
            <Icon type="Ionicons" name="ios-close" style={{fontSize:30}}/>
            </Button>
         
            </Left>
          </Header>
           <GiftedChat
              messages={messages}
              onSend={messages => ()=>{}}
              user={{
                _id: 1,
              }}
            />
         </View>
       

    )
}



export default ChatBoatScreen