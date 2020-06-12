import React, { Component } from 'react';
import { Image, TouchableOpacity, StyleSheet,View, Text } from 'react-native';
import { Container } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

 const  CardScreen = props =>{
    var url = props.imageUrl
    var  col = ['#ffffff', '#d7db46', '#fcb045']
    var col2 = ['#22c1c3','#96be74', '#fdbb2d']
    var col3 = ['#3f5efb', '#fc466b']
    url='../assets/images/bg2.jpg'
    return (
     
     
      <TouchableOpacity onPress={props.displayOrder} style={{marginLeft:8}}>
          <View style={styles.shadow}>
          <LinearGradient  colors={col3} style={styles.card} >
                <View style={styles.header}> 
                        <Text style={{fontSize:20}}>JAVA HOUSE</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.body1}>
                    <Text></Text>
                    <Text style={{}}>DATE: 20/02/2020 </Text>
                    <Text></Text>
                    <Text style={{}}>STATUS: CANCELED </Text>
                    </View>
                    <View style={styles.body2}>
                    

                    </View>

                </View>

            </LinearGradient>
          </View>
            
          
      </TouchableOpacity>
  
        
     
    );
  
}

const styles = StyleSheet.create({
    header:{
       
        width:'100%',
        alignItems:'center',
        margin:3
    },
  card:{
    
        width:250, 
        height:150,  
        alignItems:'center'
        },
    shadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    body:{
        width:'100%',
        height:'100%'

    },
    body1:{
    
        height:'50%',
        width:'100%',
        alignItems:'center'
    },
    body2:{
        
        height:'50%',
        width:'100%',
        
    }

}) 
export default CardScreen