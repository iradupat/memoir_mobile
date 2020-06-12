import React, {useState} from 'react'
import {Button, Content, Input, Item, Form, Label,Header, Left, Right, Body } from 'native-base';

import { View,
         StyleSheet, Image,
          ImageBackground, Text, 
          Keyboard, TouchableWithoutFeedback 
        } from 'react-native'
import {Actions} from 'react-native-router-flux'
import {useDispatch} from 'react-redux'
import * as AuthActions from '../redux/actions/Auth'
import EncIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
// import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePicker from 'expo-image-picker';



const TextScreen = props => {
  // variables 
  //const dispatch = useDispatch();
 
 
  return (
      
     
    <View style={styles.container}>
        <Header>
              <Left>
                  <Button transparent onPress={()=>{Actions.pop()}}>
                  <Icon name="ios-arrow-back" size={30} color="#D7DB46"/>
                  </Button>
                 
                  </Left>
              <Body>
                  <Text style={{color:"#D7DB46", fontWeight:'bold'}}>TOMATO</Text>

              </Body>
              <Right/>
        </Header>
        <View style={styles.card}>
            <View style={{width:'90%', height:'40%', backgroundColor:'white'}}>
                <ImageBackground source={require("../assets/images/bg1.jpg")} style={{width:'100%', height:'100%', justifyContent:'flex-top', alignItems:'center'}}>

                  
                      <Text style={{fontWeight:'bold', fontSize:20, color:'white'}}>Here we are</Text>
                  
                      
                </ImageBackground>

            </View>
            <View  style={{width:'90%', height:'52%'}}>
                <View style={styles.shadow}>
                <View style={{alignItems:'center',width:'50%', height:'27%', backgroundColor:'#D7DB46', marginHorizontal:'25%', flexDirection:'row', justifyContent:'space-around', borderBottomEndRadius:'20%', borderBottomStartRadius:'20%'}}>
                    <Button transparent>
                          <MatIcon size={30} name="minus" color="#fff"/>
                    </Button>
                      
                      <View style={{width:55,backgroundColor:'#fff', height:55,  borderRadius:'50%', justifyContent:'center', alignItems:'center'}}>
                          <Text style={{color:'grey', fontSize:20, fontWeight:'bold'}}>100</Text>
                      </View>
                      <Button transparent>
                          <MatIcon color="#fff" size={30} name="plus"/>
                      </Button>
                      
                </View>
                </View>
                
                <View style={{width:'100%', height:'57%', alignItems:'center'}}>
                    <Text style={{fontWeight:'bold', fontSize:17, color:'grey'}} >Alcoholic:    <MatIcon size={20} name="check" color="red"/> </Text>
                    <Text></Text>
                    <Text style={{fontWeight:'bold', fontSize:17, color:'grey'}} >Vegetarian:    <MatIcon size={20} name="check" color="green"/> </Text>
                    <Text></Text>
                    <Text style={{fontWeight:'bold', fontSize:17, color:'grey'}} >Price:  3000 Frw </Text>
                    <Text></Text>
                    <Text style={{fontWeight:'bold', fontSize:17, color:'grey'}} >description </Text>
                    <Text></Text>
                    

                </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Button block style={{backgroundColor:'#D7DB46'}} >
                            <MatIcon name = "plus-circle-outline" size={30} color="#fff"/>
                        </Button>

                    </View>

            </View>

        </View>
         
    </View>

  )
}


const styles = StyleSheet.create({
  bgImage: {
      width: '100%',
      height: '100%'
      // height:400,
      // width:"100%"
  },
  container:
  {
      marginTop:10,
      width:'100%',
      height:'100%'

  },
  card:{
      alignItems:'center',
      paddingTop:23
  },
  shadow:{
      shadowColor: "#000",
shadowOffset: {
width: 0,
height: 10,
},
shadowOpacity: 0.51,
shadowRadius: 13.16,

elevation: 20,

  }
     

});

export default TextScreen