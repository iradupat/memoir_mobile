import React, {useCallback, useState, useEffect} from 'react'
import {Text, View, ActivityIndicator, Alert, FlatList, Linking} from 'react-native'
import {Button, Header, Left, Right, Icon, Body, Title} from 'native-base'
import {getOrder, acceptOrder} from '../redux/actions/OrderActions'
import {changeOrderStatus} from '../redux/actions/WaiterActions'
import {useDispatch, useSelector} from 'react-redux'
import { Actions } from 'react-native-router-flux'
import MyModal from 'react-native-modal'


const PayOrderScreen = props=>{
const selectedOrder = useSelector(state=>state.order.order)
const orderId = props.id
const dispacher = useDispatch()
const isLoading = useSelector(state=>state.order.isLoading)
const message = useSelector(state=>state.order.message)
// {console.log(selectedOrder)}
const [modal,setModal] = useState(false)

const accpetOrder =()=>{
    
}
    useEffect(()=>{
        
        dispacher(getOrder(orderId))
    },[])

    if(isLoading){
        return(
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <ActivityIndicator/>
            </View>
        )
    }
    if(selectedOrder!=null){
            return(
                <View style={{flex:1}}>
                    <Header>
                        <Left/>
                        <Body>
                            <Title>PAYMENT</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <View style={{ margin:10}}>
                        <View style={{height:32,  flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                            <Text style={{fontSize:18, color:'grey', fontWeight:'bold'}} >{selectedOrder.house}  {selectedOrder.table}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', marginHorizontal:10, marginVertical:10}}>
                        <View style={{width:'45%', height:25, marginHorizontal:10}}>
                            <Text style={{fontSize:18}}>Felix</Text>
                        </View>
                        <View style={{width:'45%', height:25, marginHorizontal:10}}>
                            <Text style={{fontSize:15}}>{selectedOrder.create_at}</Text>
                        </View>
                    </View>

                    <FlatList
                        data={selectedOrder.products}
                        
                        keyExtractor={(item)=>item.product.product.id+""}
                        renderItem={({item})=>{
                                return(
                            <View style={{flexDirection:'row', flex:1, marginHorizontal:10}}>
                                <View style={{width:'45%', height:15, marginHorizontal:10}}>
                                <Text>{item.product.product.title}</Text>
                                </View>
                                <View style={{width:'45%', height:15, marginHorizontal:10}}>
                                    <Text>{item.product.amount} Frw</Text>
                                </View>
                            </View>
                                )

                        }}
                    
                    />

                    <View style={{flexDirection:'row', flex:1, marginHorizontal:10}}>
                        <View style={{width:'45%', height:15, marginHorizontal:10}}>
                                <Text>Total: </Text>
                        </View>
                        <View style={{width:'45%', height:15, marginHorizontal:10}}>
                                <Text>{selectedOrder.order.total_price} Frw</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', flex:1, marginHorizontal:10}}>
                        <View style={{width:'45%', height:15, marginHorizontal:10}}>
                            <Button style={{justifyContent:'center', backgroundColor:'#032280'}} onPress={ async ()=>{
                                const order = {time:0, status:"S"}
                                await dispacher(changeOrderStatus(selectedOrder.order.id, order))
                                //alert(message)
                                if(message.message=="Thank you for using Smart waiter")
                                    setModal(true)
                                    Actions.pop()

                            }}>
                                <Text style={{color:'#fff'}}>PAY CASH</Text>
                            </Button>
                        </View>
                        <View style={{width:'45%', height:15, marginHorizontal:10}}>
                            <Button style={{justifyContent:'center', backgroundColor:'#f5cf14'}} onPress={ async ()=>{
                                    const order = {time:0, status:"S"}
                                    await dispacher(acceptOrder(selectedOrder.order.id))
                                   // alert("Thanks for using Smart Waiter okok")
                                    let number = selectedOrder.house_phone
                                    let new_number =""
                                    if(number.length > 10){
                                        number.substring(3)
                                       // console.log(number)
                                       for (let i=0 ; i<number.length;i++){
                                            if(i>2){
                                                new_number += number[i]
                                            }
                                       }
                                        console.log(new_number)
                                    }
                                    if(message.message=="Thank you for using Smart waiter"){
                                        await Linking.openURL(`tel:*182*1*1*${new_number}*#`)
                                        setModal(true)
                                        Actions.pop()
                                    }
                                        
                                }}>
                                <Text style={{color:'#000'}}>MTN-MOMO</Text>
                            </Button>
                        </View>
                    </View>
                                <MyModal
                                    isVisible={modal}
                                    swipeDirection={['down','left','right','up']}
                                    onSwipeComplete={()=>{setModal(false)}}
                                >
                                        <View style={{height:'30%', backgroundColor:'#fff', borderRadius:20, justifyContent:'center', alignItems:'center'}}>
                                            <Text>{message.message}</Text>
                                        </View>
                                </MyModal>
                </View>
                
            )}
            if(selectedOrder==null){
                return(
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text>wait...</Text>

                    </View>
                )

            }
}

export default PayOrderScreen