import React, { Component } from 'react';
import { Image, TouchableOpacity, StyleSheet,View, Text, ScrollView, ImageBackground } from 'react-native';
import { Container, Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Iconn from 'react-native-vector-icons/MaterialIcons'
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';
import {colors} from '../redux/config/Config'

 
 const  CardScreen = props =>{
    var url = props.imageUrl
    var grey = ['#fff', '#fff']
    var  col = ['#ffffff', '#d7db46', '#fcb045']
    var col2 = ['#22c1c3','#96be74', '#fdbb2d']
    var col3 = ['#3f5efb', '#fc466b']
    url='../assets/images/bg2.jpg'
    return (
     
        <View style={{flex:1}}>
            <View style={{backgroundColor:'red', width:'100%', height:'35%', flexDirection:'row'}}>
                <View  style={{backgroundColor:"#fff", width:'50%', padding:10}}>
                    <Text style={{fontWeight:'bold',color:'grey'}}>On the 11/02/2020</Text>
                    <Text></Text>
                    <Text style={{fontWeight:'bold',color:'grey'}} numberOfLines={1}>138 Products commanded</Text>
                    <Text></Text>
                    <Text style={{fontWeight:'bold',color:'grey'}}>The order was delivared</Text>

                </View>
                <View style={{backgroundColor:"white", width:'50%', padding:10,}}>
                    <Text style={{textAlign:'right', fontWeight:'bold',color:'grey'}}>Waiter ID: 23</Text>
                    <Text></Text>
                    <Text style={{textAlign:'right', fontWeight:'bold',color:'grey'}}>Table Number:1028H</Text>
                    <Text></Text>
                    <Text numberOfLines={1} style={{textAlign:'right', fontWeight:'bold',color:'grey'}}>A TABLE FOR TWO AND WITH</Text>
                </View>

            </View>
            <ScrollView contentContainerStyle={{backgroundColor:'#fff', width:'100%', padding:9}}>
                    <Text style={{fontWeight:'bold', fontSize:17, color:colors.primary, textAlign:'center'}}>JAVA HOUSE</Text>
                    <Text></Text>
                    <Text></Text>
                    <Text style={{textAlign:'center',color:'grey'}} > Used to truncate the text with an ellipsis after computing the text layout, including line wrapping, such that the total number of lines does not exceed this number.</Text>
                    <Text></Text>
                    <Text style={{textAlign:'center',color:'grey'}} numberOfLines={1}>+250789421906, iradupat@yahoo.fr</Text>
                    <Text></Text>
                    <Text style={{textAlign:'center',color:'grey'}}>10 users of SMART WAITER come here, and 60% of them liked the place</Text>
                    <Text></Text>
                    <Text style={{textAlign:"center",color:'grey'}}>On the map <Iconn name="touch-app" size={20} color={colors.primary}/></Text>
                    <Text></Text>
                    <View style={{flexDirection:'row', width:'100%', justifyContent:'space-around'}}>
                    <Button style={{ flexDirection:'column', borderColor:colors.primary, padding:2}} bordered>
                        <Icon name="chevron-up" color={colors.primary} size={15}/>
                        <Text style={{color:colors.primary}}>Up vote</Text>
                    </Button>
                    <Button style={{ flexDirection:'column', borderColor:'orange', padding:2}} bordered>
                        <Icon name="chevron-down" color='orange' size={15}/>
                        <Text style={{color:'orange'}}>Down vote</Text>
                    </Button>
                    <Button style={{ flexDirection:'column', borderColor:'#3ea9fa', padding:2}} bordered>
                    <Icon name="share-alt" color='#3ea9fa' size={15}/>
                        <Text style={{color:'#3ea9fa'}}>Share</Text>
                    </Button>
                    <Button style={{ flexDirection:'column', borderColor:'#fa5d52', padding:2}} bordered>
                    <Iconn name="delete" color='#fa5d52' size={15}/>
                        <Text style={{color:'#fa5d52'}}>Delete</Text>
                    </Button>

                    </View>
                   
            </ScrollView>

        </View>
    )
 }
export default CardScreen