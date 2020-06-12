import React, { Component } from 'react';
import { Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right, View } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import EncIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {colors as Colors} from '../redux/config/Config'

 const  CardScreen = props =>{
    var url = props.imageUrl
    url='../assets/images/bg2.jpg'
    return (
     
     
     <TouchableOpacity activeOpacity={0.75}>

        <Card style={styles.card}>
       
          <View style={{width:'100%', height:'35%', justifyContent:'center', alignItems:'center'}}>
              <View style={{height:'90%', borderColor:Colors.primary, width:'43%', borderRadius:30, borderWidth:1, marginVeritical:'auto', justifyContent:'center', alignItems:'center'}}>
                  <Text style={{fontSize:22, fontWeight:'bold', color:Colors.primary}}>C</Text>
              </View>
              {/* */}
          </View>
          <View style={{width:'100%', height:'65%',  alignItems:'center'}}>
                <Text style={{fontSize:16, fontWeight:'bold', color:Colors.primary, textAlign:'center'}}>JAVA HOUSE, 12/02/2020</Text>
                <Text style={{fontSize:14, fontWeight:'bold', color:'orange'}}>SERVED</Text>
                <Text></Text>
                <Text></Text>
                <Button style={{borderColor:Colors.primary}} small bordered>
                  <Text style={{color:'grey'}}>DETAILS</Text>
                </Button>
          </View>
                  
      
          </Card>
        
          </TouchableOpacity>  
    
  
        
     
    );
  
}

const styles = StyleSheet.create({
  card:{
    shadowColor: "#000",
    //backgroundColor:'#ed1f1f',
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.36,
shadowRadius: 6.68,

elevation: 11,
flex: 0, width:150, height:200,
  },
  bgImage: {
    width: '100%',
    height: '100%'
    // height:400,
    // width:"100%"
},
}) 
export default CardScreen