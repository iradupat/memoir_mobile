import React from 'react'
import {View,Text, StyleSheet, ScrollView} from 'react-native'
import {Header, Left, Right, Body, Title, List, ListItem, Thumbnail, Button} from 'native-base'
import Card from '../components/Card'
import Order from '../components/OrderCard'
import {colors} from '../redux/config/Config'

const notifications = [
    {
        id:1,
        message:"Your Order is in preparation",
        object:"O",
        objectId:2,
        seen:false,
        title:"Order Notification"
    },
    {
        id:2,
        message:"Lebanone Hotel is  lounching a new branch in Gikondo.",
        object:"A",
        objectId:3,
        title:"Lebanone Ad",
        seen:false,
    },
    {
        id:3,
        message:"Java house reopens tomorrow !!!",
        object:"A",
        objectId:5,
        title:"JAVA House",
        seen:true
    }
]


const OrderScreen = props =>{
    return(
        <View style={{width:'100%', height:'100%', backgroundColor:'#fff'}}>
            <Header style={{backgroundColor:'#fff'}}>
               <View style={{width:'100%', justifyContent:'center', alineItems:'center'}}>
                     <Title style={{color:colors.main ,fontWeight:'bold'}}>NOTIFICATIONS</Title>
               </View>
                   
                
            </Header>
            <View style={{flex:1}}>
                <ScrollView showsVerticalScrollIndicator={false} >
                       {
                           notifications.map((item, index)=>{
                               return(
                                <ListItem onPress={()=>{alert("Hello")}} key={index} thumbnail>
                                <Left>
                                  <Thumbnail square source={require('../assets/images/logo.png')} />
                                </Left>
                                <Body>
                                  <Text>{item.title}</Text>
                                  <Text note numberOfLines={1}>{item.message}</Text>
                                </Body>
                                <Right>
                                  {/* <Button transparent> */}
                                   {!item.seen? <Text style={{color:'blue'}}>NEW</Text>:null}
                                  {/* </Button> */}
                                </Right>
                              </ListItem>
                               )
                           })
                       }
                </ScrollView>

            </View>
            <View style={{flex:1,}}>
                {/* <Order/> */}
                        
            </View>
        </View>
    )
}



export default OrderScreen