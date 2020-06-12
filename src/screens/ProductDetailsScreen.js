import React, {useState, useEffect} from 'react'
import {Button, Content, Input, Item, Toast, Label,Header, Left, Right, Body } from 'native-base';

import { View,
         StyleSheet, Image, Alert,
          ImageBackground, Text, 
          Keyboard, TouchableWithoutFeedback 
        } from 'react-native'
import {Actions} from 'react-native-router-flux'
import {useDispatch} from 'react-redux'
import * as AuthActions from '../redux/actions/Auth'
import EncIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'


//import InputComp from '../components/InpText'




const ProductDetailsScreen = props => {
    // variables 
    //const dispatch = useDispatch();
    const product = props.product
    var [quantinty,setQuantity] = useState(0)

    const addQ=()=>{
        if(quantinty<=100){
            setQuantity(quantinty+=1)
        }else{
            Alert.alert(
                'Alert',
                'That  a huge quantity!!!',
                [
                  
                  {text: 'OK', onPress: () => {}},
                ],
                {cancelable: false},
              );
           
        }
    }
    const reduceQ=()=>{
        if(quantinty>0){
            setQuantity(quantinty-=1)
            
        }else{
           

            Alert.alert(
                'Alert',
                'The product was removed from the list',
                [
                  
                  {text: 'OK', onPress: () => {}},
                ],
                {cancelable: false},
              );



        }
    }

    const addToOrderList =()=>{
        if(quantinty>0){
            Alert.alert(
                'Confirm',
                'Do you want to add this product to your order list?',
                [
                  {text: 'OK', onPress: () => {}},
                  {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {text: 'Return to menu', onPress: () => {
                      Actions.pop()
                  }},
                ],
                {cancelable: false},
              );

        }else{
            Alert.alert(
                'Alert',
                'Specify the quantity pleas!!!',
                [
                  {text: 'OK', onPress: () => {}},
                  
                ],
                {cancelable: false},
              );
        }
    }
   
   
    return (
        
       
      <View style={styles.container}>
          <Header style={{backgroundColor:"#fff"}}>
                <Left>
                    <Button transparent onPress={()=>{Actions.pop()}}>
                    <Icon name="ios-arrow-back" size={30} color="#D7DB46"/>
                    </Button>
                   
                    </Left>
                <Body >
                    <Text style={{color:"#D7DB46", fontWeight:'bold', textAlign:'center'}}>{product.surname}</Text>

                </Body>
                <Right/>
          </Header>
          <View style={styles.card}>
              <View style={{width:'90%', height:'40%', backgroundColor:'white'}}>
                  <ImageBackground source={{uri:product.product.image}} style={{width:'100%', height:'100%', justifyContent:'flex-top', alignItems:'center'}}>

                    
                        <Text style={{fontWeight:'bold', fontSize:20, color:'white', backgroundColor:'grey', opacity:0.8}}>{product.product.title}</Text>
                    
                        
                  </ImageBackground>

              </View>
              <View  style={{width:'90%', height:'52%'}}>
                  <View style={styles.shadow}>
                  <View style={{alignItems:'center',width:'50%', height:'27%', backgroundColor:'#D7DB46', marginHorizontal:'25%', flexDirection:'row', justifyContent:'space-around', borderBottomEndRadius:'20%', borderBottomStartRadius:'20%'}}>
                      <Button transparent onPress={()=>{
                           reduceQ()
                      }}>
                            <MatIcon size={30} name="minus" color="#fff"/>
                      </Button>
                        
                        <View style={{width:55,backgroundColor:'#fff', height:55,  borderRadius:'50%', borderWidth:2, borderColor:'#D7DB46', justifyContent:'center', alignItems:'center'}}>
                                <Text style={{color:'grey', fontSize:20, fontWeight:'bold'}}>{quantinty}</Text>
                        </View>
                        <Button transparent onPress={addQ}>
                            <MatIcon color="#fff" size={30} name="plus"/>
                        </Button>
                        
                  </View>
                  </View>
                  
                  <View style={{width:'100%', height:'57%', alignItems:'center'}}>
                      <Text style={{fontWeight:'bold', fontSize:17, color:'grey'}} >Alcoholic: {product.product.is_alcoholic?<MatIcon size={20} name="check" color="red"/>: <MatIcon size={20} name="close" color="green"/> } </Text> 
                      <Text></Text>
                      <Text style={{fontWeight:'bold', fontSize:17, color:'grey'}} >Vegetarian: {product.product.is_vegetarian?<MatIcon size={20} name="check" color="green"/> : <MatIcon size={20} name="close" color="red"/>} </Text>
                      <Text></Text>
                      <Text style={{fontWeight:'bold', fontSize:17, color:'grey'}} >Price:  {product.amount} Frw </Text>
                      <Text></Text>
                      {/* <MarqueeText
                       style={{fontWeight:'bold', fontSize:17, color:'grey'}} 
                         
                      duration={9500}
                       marqueeOnStart
                        loop
                        marqueeDelay={5000}
                        marqueeResetDelay={1000}
                       >{product.description}</MarqueeText> */}
                      <Text></Text>
                      

                  </View>
                  <View style={{justifyContent:'center', alignItems:'center'}}>
                          <Button block style={{backgroundColor:'#D7DB46'}} onPress={addToOrderList} >
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

export default ProductDetailsScreen