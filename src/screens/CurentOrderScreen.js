import React, { useState, useEffect } from 'react';
import {View, Text, Modal, FlatList, ScrollView, ActivityIndicator, Alert} from 'react-native'
import {Header,Body, Left, Right, Button, Title, Footer, Badge, ListItem,Thumbnail } from 'native-base'
import EncIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/AntDesign'
import {colors as Colors} from '../redux/config/Config'
import { Actions } from 'react-native-router-flux';
import {useSelector, useDispatch } from 'react-redux'
import {updateCurrentOrder, sentOrder} from '../redux/actions/OrderActions'
import OrderItem from '../components/OrderItem'
import { MaterialIcons } from '@expo/vector-icons';
import MyModal from 'react-native-modal'

const CurentOrderScreen =props=> {
    const [visibleModal, setVisibleModal] = useState(false)
    const your_orders = useSelector(state=>state.order.allOrders)
    const DATA = useSelector(state=>state.order.currentOrder)
    const real_product = useSelector(state=>state.app.data.menu)
    const order = useSelector(state=>state.order.currentOrder)
    const isLoading = useSelector(state=>state.order.isLoading)
    const client = useSelector(state=>state.auth.user)
    var [total,setTotal] = useState(0) 
    const dispatcher = useDispatch()
    useEffect(()=>{
        setTotal(0)
        addToTotale()
    },[order])

    // increase quantity
    const increaseQuantity =(id, amount)=>{
        const index = order.products.findIndex((e)=>e.productId===id)
        order.client = client.client.id
        order.table = props.table_id
        order.sum = order.sum + amount
           order.products[index] = {productId:id, quantity:order.products[index].quantity+=1, message:order.products[index].message}
           Alert.alert(
            'Success',
            "Icreased quantity to "+order.products[index].quantity+"",
            [
                {text: 'OK', onPress: () => {}},
            ]
    
           )
       dispatcher(updateCurrentOrder(order))
       //console.log(order)
    }

    // decrease quantity
    const decreaseQuantity =(id, amount)=>{
        const index = order.products.findIndex((e)=>e.productId===id)
        order.client = client.client.id
        order.table = props.table_id
        
        if(order.products[index].quantity<=1){
         
            Alert.alert(
                'Alert',
                "You are about to reamove the product from this list",
                [
                    {text: 'Ok', onPress: () => {
                        order.sum = order.sum - amount
                         order.products.splice(index,1)
                         dispatcher(updateCurrentOrder(order))
                    }},
                    {text: 'Cancel', onPress: () => {}},
                ]
        
               )
           
            return
        }
           order.sum = order.sum - amount
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

    //calculate the totale
    const addToTotale=()=>{
       
        //alert(total)
        if(total==0)
            DATA.products.map(item=>{
                const pro = real_product.find(p=>p.id==item.productId)
               
                setTotal(total=+pro.amount*item.quantity)
            })
        
    }

    // send order

    const sendTheOrder =() =>{
        console.log("Here is the order\n")

    // console.log(order)
        dispatcher(sentOrder())
    }

    const ItemRender =(props)=>{
        const product = real_product.find((product)=>product.id==props.item.productId) 
  
        return(

            <ListItem thumbnail>
            <Left>
              <Thumbnail square source={{uri:product.product.image}}/>
            </Left>
            <Body>
                <Text style={{fontSize:16, fontWeight:'bold'}}>{product.surname}</Text>
              <Text note numberOfLines={2}>Quantity: {props.item.quantity},  Unity: {product.amount} <Text style={{color:Colors.main, fontWeight:'bold'}}> Frw Total: {product.amount*props.item.quantity} Frw</Text> </Text>
            </Body>
            <Right>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Button transparent onPress={()=>decreaseQuantity(props.item.productId,product.amount)}>
                        <EncIcon name="minus" size={30} color={Colors.P}/>
                    </Button>
                    <Button transparent onPress={()=>{increaseQuantity(props.item.productId, product.amount)}}>
                        <EncIcon name="plus" size={30} color={Colors.main}/>
                    </Button>
                </View>
            </Right>
          </ListItem>
        
            // <View style={{width:'96%', borderWidth:0.5, borderColor:Colors.primary, backgroundColor:'#fff', marginVertical:10, borderRadius:30,paddingVertical:10, flexDirection:'row', justifyContent:'space-around'}}>
            //                    <Thumbnail source={{uri:product.product.image}} />
            //              <View style={{width:'35%'}}>
            //                    <Text style={{fontWeight:'bold', color:Colors.primary}}>
            //                             Total: {product.amount*props.item.quantity} Frw
            //                    </Text>
            //                    <Text style={{fontWeight:'bold', color:'grey'}}> Quantity: {props.item.quantity} </Text>
            //                    <Text style={{fontWeight:'bold', color:'green'}}>Unity: {product.amount} Frw</Text>
            //             </View>
                         
                               
            //     </View>
        )

    }
  
        return (
            <View style={{flex:1}}>
                <Header style={{backgroundColor:'#ffffff', borderBottomEndRadius:12,borderBottomLeftRadius:12}}>
                    <Left>
                        <Button onPress={()=>Actions.pop()} transparent>
                            <EncIcon name="chevron-left" size={27} color={Colors.main}/>
                        </Button>
                        
                    </Left>
                    <Body>
                        <Title style={{color:Colors.main}}>IN THE LIST</Title>

                    </Body>
                    <Right>
                        <Button transparent onPress={()=>{setVisibleModal(true)}}>
                        <MaterialIcons name="bookmark-border" size={29} color={Colors.main} />
                        {your_orders.length>0?
                            <Badge style={{height:17}} danger>
                                <Text style={{fontSize:9, color:'#fff'}}>New</Text>
                            </Badge>
                            :null}
                        </Button>
                        
                    </Right>
                </Header>
                <View style={{flex:1}}>
                    <View style={{width:"100%", flex:1}}>
                            
                    {DATA.products.length>0?
                        <View style={{ alignItems:'center'}}>
                            <Text style={{fontWeight:'bold', fontSize:17}}>Total: <Text style={{color:Colors.main, fontWeight:'bold', fontSize:17}}>{order.sum} Frw</Text></Text>
                            <Button disabled={isLoading?true:false} style={{width:'90%',borderColor:Colors.main, justifyContent:'center', backgroundColor:'#fff', borderWidth:1}} onPress={sendTheOrder}>
                                   {isLoading? <ActivityIndicator/>: <Text style={{color:Colors.main, fontWeight:'bold'}}>SEND</Text>}
                            </Button>
                            
                        </View>
                        :null}
                        <FlatList
                            contentContainerStyle={{flexGrow:1}}
                            data={DATA.products}
                            renderItem={({item})=>{return <ItemRender item={item} />}}
                            keyExtractor={item=>item.productId.toString()}
                        />
                        
                       
                    </View>
                    

                </View>
                {isLoading?<Modal

                            animationType="slide "
                            visible={true}
                            transparent={true}
                            >
                                <Header transparent />
                                <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                                    <ActivityIndicator/>

                                </View>
                            </Modal>:null}


                <MyModal
                
                isVisible={visibleModal}
              
                >
                <Header style={{backgroundColor:'#fff'}}>
                    <Left>
                       
                    </Left>
                    <Body>
                        <Title style={{color:Colors.main}}>TODAY LIST</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={()=>{setVisibleModal(false)}}>
                            <EncIcon name="cross" size={25} color={Colors.main}/>
                        </Button>
                    </Right>
                </Header>
                    <View style={{flex:1}}>
                        {/* <List> */}
                       <FlatList
                          data={your_orders}
                          keyExtractor={item=>item.id+""}
                          renderItem={({item})=><OrderItem ourItem={item} />}
                       />
                       {/* </List> */}

                    </View>
                    
                    
            </MyModal>
                
            </View>
        );
    
}



export default CurentOrderScreen;