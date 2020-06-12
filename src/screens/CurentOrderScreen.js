import React, { useState, useEffect } from 'react';
import {View, Text, Modal, FlatList, ScrollView, ActivityIndicator, Alert} from 'react-native'
import {Header, Thumbnail, Body, Left, Right, Button, Title, Footer, Badge, List} from 'native-base'
import EncIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/AntDesign'
import {colors as Colors} from '../redux/config/Config'
import { Actions } from 'react-native-router-flux';
import {useSelector, useDispatch } from 'react-redux'
import {updateCurrentOrder, sentOrder} from '../redux/actions/OrderActions'
import OrderItem from '../components/OrderItem'

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
        
        
            <View style={{width:'96%', borderWidth:0.5, borderColor:Colors.primary, backgroundColor:'#fff', marginVertical:10, borderRadius:30,paddingVertical:10, flexDirection:'row', justifyContent:'space-around'}}>
                               <Thumbnail source={{uri:product.product.image}} />
                         <View style={{width:'35%'}}>
                               <Text style={{fontWeight:'bold', color:Colors.primary}}>
                                        Total: {product.amount*props.item.quantity} Frw
                               </Text>
                               <Text style={{fontWeight:'bold', color:'grey'}}> Quantity: {props.item.quantity} </Text>
                               <Text style={{fontWeight:'bold', color:'green'}}>Unity: {product.amount} Frw</Text>
                        </View>
                         <View style={{flexDirection:'row', width:'35%', justifyContent:'space-around'}}>
                                <Button transparent onPress={()=>decreaseQuantity(props.item.productId,product.amount)}>
                                    <EncIcon name="minus" size={30} color="red"/>
                                </Button>
                                <Button transparent onPress={()=>{increaseQuantity(props.item.productId, product.amount)}}>
                                    <EncIcon name="plus" size={30} color="green"/>
                                </Button>
                </View>
                               
                </View>
        )

    }
  
        return (
            <View style={{flex:1, marginTop:10}}>
                <Header style={{backgroundColor:'#ffffff'}}>
                    <Left>
                        <Button onPress={()=>Actions.pop()} transparent>
                            <EncIcon name="chevron-left" size={27} color={Colors.primary}/>
                        </Button>
                        
                    </Left>
                    <Body>
                        <Title style={{color:Colors.primary}}>IN THE LIST</Title>

                    </Body>
                    <Right>
                        <Button transparent onPress={()=>{setVisibleModal(true)}}>
                        <Text style={{color:Colors.primary, fontWeight:'bold'}}>Orders </Text>
                        {your_orders.length>0?
                            <Badge style={{height:17}} danger>
                                <Text style={{fontSize:9, color:'#fff'}}>New</Text>
                            </Badge>
                            :null}
                        </Button>
                        
                    </Right>
                </Header>
                <View style={{flex:1}}>
                    <View style={{width:"100%", }}>
                     
                        <FlatList
                            contentContainerStyle={{alignItems:'center'}}
                            data={DATA.products}
                            renderItem={({item})=>{return <ItemRender item={item} />}}
                            keyExtractor={item=>item.productId.toString()}
                        />
                        {DATA.products.length>0?
                        <View style={{ alignItems:'center'}}>
                            <Text style={{fontWeight:'bold', fontSize:17}}>Total: <Text style={{color:Colors.primary, fontWeight:'bold', fontSize:17}}>{order.sum} Frw</Text></Text>
                            <Button disabled={isLoading?true:false} style={{width:'90%',borderColor:Colors.primary, justifyContent:'center', backgroundColor:'#fff', borderWidth:1}} onPress={sendTheOrder}>
                                   {isLoading? <ActivityIndicator/>: <Text style={{color:Colors.primary, fontWeight:'bold'}}>SEND</Text>}
                            </Button>
                            
                        </View>
                        :null}
                       
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


                <Modal
                animationType="slide "
                visible={visibleModal}
                transparent={false}
                >
                <Header style={{backgroundColor:'#D7DB46'}}>
                    <Left>
                        {/* <Text style={{fontWeight:'bold', color:'#fff'}}>Table 456TE</Text> */}
                    </Left>
                    <Body>
                        <Title style={{color:'#fff'}}>TODAY LIST</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={()=>{setVisibleModal(false)}}>
                            <EncIcon name="cross" size={25} color="#fff"/>
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
                    
                    <Footer style={{backgroundColor:'#fff', borderTopColor:'gery', borderTopWidth:0.2}}>
                        <Left>

                        </Left>
                        <Body >
                            <Button transparent style={{width:'100%', justifyContent:'center', backgroundColor:Colors.primary}} onPress={()=>setVisibleModal(false)}>
                                <Text style={{color:'#fff', fontWeight:'bold'}}>CLOSE</Text>
                            </Button>
                        </Body>
                        <Right>

                        </Right>
                        
                    </Footer>
            </Modal>
                
            </View>
        );
    
}



export default CurentOrderScreen;