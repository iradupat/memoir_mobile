import React, {useState, useEffect} from 'react'
import {View,Text, StyleSheet, 
    FlatList, TouchableOpacity, Image,
    ActivityIndicator, Alert} from 'react-native'
import {Input, List ,Header, Item,
    Thumbnail ,Badge, Footer, Body , 
    Left , Button, Right, Title, 
    Icon as MyIcon, Card, CardItem} from 'native-base';
import EncIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/AntDesign'
import {useSelector,useDispatch} from 'react-redux';
import * as AppActions from '../redux/actions/AppActions' 
import {updateCurrentOrder,getTodayOrders} from '../redux/actions/OrderActions'
//import Card from '../components/Card'
import {Actions} from 'react-native-router-flux'
import {url, colors } from '../redux/config/Config'
import MyModal from 'react-native-modal'


const MenuScreen = props =>{
    const dispatcher = useDispatch()
    var isLoading =  useSelector(state=>state.app.isLoading) 
    var new_data = useSelector(state=>state.app.data) 
    var client = useSelector(state=>state.auth.user)
    var errors = useSelector(state=> state.app.error)
    var order= useSelector(state=>state.order.currentOrder)
    var products_list = []
    const [testModal, setTestModal] = useState(true)

   const addProduct = (id,amount)=>{
        const index = order.products.findIndex((e)=>e.productId===id)
        order.client = client.client.id
        order.table = props.table_id
        order.sum = order.sum + amount
        
       if(index===-1){
             order.products.push({productId:id, quantity:1, message:"Thank you!!"})
             Alert.alert(
                'Success',
                "Product added in the list",
                [
                    {text: 'OK', onPress: () => {}},
                ]
        
               )
            
            
       }else{
           order.products[index] = {productId:id, quantity:order.products[index].quantity+=1, message:"Thank you!!"}
           Alert.alert(
            'Success',
            order.products[index].quantity+" Products in the list",
            [
                {text: 'OK', onPress: () => {}},
            ]
    
           )
          
       }
       
      
       dispatcher(updateCurrentOrder(order))
       console.log(order)
   }

   const removeProduct =(id, amount)=>{
        const index = order.products.findIndex((e)=>e.productId===id)
        if (index<0){
            alert("Not in The list")
            return
        }
        order.client = client.client.id
        order.table = props.table_id
        order.sum = order.sum - amount
        if(order.products[index].quantity<=1){
         
            Alert.alert(
                'Alert',
                "You are about to reamove the product from this list",
                [
                    {text: 'Ok', onPress: () => {
                         order.products.splice(index,1)
                         dispatcher(updateCurrentOrder(order))
                    }},
                    {text: 'Cancel', onPress: () => {}},
                ]
        
               )
           
            return
        }

           order.products[index] = {productId:id, quantity:order.products[index].quantity-=1, message:order.products[index].message}
           Alert.alert(
            'Success',
            "Decreased quantity to "+order.products[index].quantity+"",
            [
                {text: 'OK', onPress: () => {}},
            ]
    
           )
       dispatcher(updateCurrentOrder(order))


   }
   

    const renderItem =(item)=>{
    
        return(
            // <View style={styles.foodContainer}>

                <Card style={{width:'48%', }}>
                    <CardItem>
                        <TouchableOpacity style={{flex:1}} onPress={()=>{
                            Actions.home_product({"product":item})
                        }}>
                        <Body> 
                            <Text numberOfLines={1} style={{color:'grey', fontSize:17}} >{item.surname}</Text>
                            <Text style={{color:'red', fontSize:11}} >{item.amount} Frw</Text>
                        </Body>
                        </TouchableOpacity>
                       
                    </CardItem>
                    <CardItem cardBody>
                       <Image source={{uri: item.product.image}} style={{height: 200, width: null, flex: 1}} defaultSource={require('../assets/images/images.png')}/>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent onPress={()=>{addProduct(item.id, item.amount)}}>
                                <MyIcon style={{fontSize:35, color:colors.main}} type="Ionicons" name="ios-add-circle-outline"/>
                            </Button>
                        </Left>
                        <Right>
                            <Button transparent onPress={()=>{removeProduct(item.id, item.amount)}}>
                                <MyIcon style={{fontSize:35, color:colors.P}} type="Ionicons" name="ios-remove-circle-outline"/>
                            </Button>
                        </Right>
                    </CardItem>
                </Card>

               
        )
    }
    
    const navigateToOrders =()=>{
        
            dispatcher(getTodayOrders(props.table_id))
            Actions.home_order({table_id:props.table_id})

       
    
    }

    useEffect( ()=>{
        if(new_data == null){
            // check if table id is a number
            if(props.table_id.length>10){
                //alert("Please i don't know")
                dispatcher(AppActions.reserveTable(0))
            }else{
                 dispatcher(AppActions.reserveTable(props.table_id))
            
            }
        }else{
            
        }
               
    },[])
   if (isLoading){
       return(
        <View style={{justifyContent:'center', alignItems:'center' , marginVertical:'50%'}}><ActivityIndicator/></View>
       )
   }else if( new_data != null){
    return(

        <View style={{flex:1, }}>
            <Header style={{backgroundColor:'#ffffff', borderBottomEndRadius:12, borderBottomLeftRadius:12}}>
          <View style={{width:'80%', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                <Title numberOfLines={2} style={{color:colors.main, textTransform:'uppercase'}}>{new_data.house.name}</Title>
          </View>
         
          <Right>
             {/* <View style={{flexDirection:'column'}}> */}
            
             <Button transparent onPress={navigateToOrders}> 

                    <EncIcon name="bucket" size={28} color={colors.main}/>
                    {order.products.length?<Badge style={{height:17}} danger>
                        <Text style={{fontSize:9, color:'#fff'}}>{order.products.length}</Text>
                    </Badge>:null}
                   
             </Button>
             
             {/* <Text style={{fontSize:8}}> Your bucket</Text> */}
             {/* </View> */}
             
             

        </Right>
         
        </Header>
           
            <View style={styles.content} >
                    <View style={styles.serchBar}>
                    <Item style={{height:35}} rounded>
                        <MyIcon type="Ionicons" name="ios-search" />
                        <Input placeholder="Search" onChangeText={()=>{}} />
                    </Item>

                    </View>
                    
                    {/* <List style={{marginHorizontal:'2%'}}> */}
                    <FlatList
                        contentContainerStyle={{marginLeft:7, justifyContent:'space-around'}}
                        numColumns={2}
                        data={new_data.menu}
                        renderItem={({item})=>{ return renderItem(item) }}
                        keyExtractor={item => item.id+""}
                    />
                {/* </List> */}
                <MyModal
                      isVisible={testModal}
                      swipeDirection={['up', 'left', 'right', 'down']}
                      coverScreen={false}
                       animationOut="zoomOut"
                       animationIn="zoomIn"
                       animationOutTiming={1700}
                       animationInTiming={1800}
                      onBackdropPress={()=>{setTestModal(false)}}
                      onSwipeComplete={()=>{setTestModal(false)}}
                     // style={{justifyContent: 'flex-end',margin:0}}
                      avoidKeyboard={true}
                >
                        <View style={{height:'30%',borderRadius:20,paddingHorizontal:12, backgroundColor:'#fff', alignItems:'center', justifyContent:'center'}}>
                            <Text style={{fontSize:17, fontWeight:'bold'}}>Welcome To {new_data.house.name}</Text>
                            <Text style={{fontSize:13, textAlign:'center', color:colors.main, fontWeight:'bold'}}>Welcome To {new_data.house.description}</Text>
                        </View>
                </MyModal>
                
                
                
               
            </View>
          
            {/* <Text >Menue Screen</Text> */}

            
        </View>
    )
 }else if(errors){
     return(
         <View>
        <Header style={{backgroundColor:colors.main, borderBottomEndRadius:12, borderBottomLeftRadius:12}}>
        
        <Body>
          <Title style={{color:'#fff'}}> SMART WAITER</Title> 
        </Body>
       <Right/>
       
      </Header>
        <View style={{flex:1, alignItems:'center'}}>
            <Image source={require('../assets/images/oops.jpg')} style={{width:230, height:200}}/>
            

        <Text style={{fontSize:26, marginVertical:'80%'}}>{errors.error}</Text>
    </View>
    </View>
     )
  
    

 }else{
     return(
        <View>
        <Header style={{backgroundColor:'#D7DB46'}}>
     <Left>
        
     </Left>
     <Body>
       <Title style={{color:'#fff'}}>SMART WAITER </Title>
     </Body>
    <Right/>
    
   </Header>
   <Text style={{fontSize:26, marginVertical:'50%', marginLeft:'23%'}}>Unknown QR code</Text>
</View>
     )
 }
}
const styles = StyleSheet.create({
    serchBar:{
        paddingHorizontal:12,
        marginVertical:10
    },
    comande:{
        flexDirection:'row',
        justifyContent:'space-around'
    },
    imageCircle:{

    },
    productsImage:{
        // backgroundColor:'red',
        height:'55%',
        alignItems:'center',
        paddingVertical:10
    },
    description:{
            alignItems:'center',
            height:'20%'
    },
    foodContainer:{
        width:'47%',
        margin:5,
        height:310,
        borderRadius:8,
        borderColor:'grey',
        borderWidth:0.5,
    },
    head:{
        height:'34%',
        backgroundColor:'#D7DB46',
        padding:13
    },
    menuTitle:{
        color:'#ffffff',
        fontSize:30,

    },
    content:{
       // backgroundColor:'red',
        flex:1,
        flexDirection:'column',
       // padding:30,

        
    }

})


export default MenuScreen