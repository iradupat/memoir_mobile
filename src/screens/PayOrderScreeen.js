import React, {useCallback, useState, useEffect} from 'react'
import {Text, View, ActivityIndicator, Alert, FlatList, Linking} from 'react-native'
import {Button, Header, Left, Right, Icon, Body, Title} from 'native-base'
import {getOrder, acceptOrder} from '../redux/actions/OrderActions'
import {changeOrderStatus} from '../redux/actions/WaiterActions'
import {useDispatch, useSelector} from 'react-redux'




const PayOrderScreen = props=>{
const selectedOrder = useSelector(state=>state.order.order)
const orderId = props.id
const dispacher = useDispatch()
const isLoading = useSelector(state=>state.order.isLoading)
// {console.log(selectedOrder)}

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
                        <View style={{height:32, backgroundColor:'red', flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                            <Text>{selectedOrder.house} TABLE {selectedOrder.table}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', marginHorizontal:10, marginVertical:10}}>
                        <View style={{width:'45%', height:15, marginHorizontal:10}}>
                            <Text>Felix</Text>
                        </View>
                        <View style={{width:'45%', height:15, marginHorizontal:10}}>
                            <Text>{selectedOrder.create_at}</Text>
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
                                    <Text>800 Frw</Text>
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
                            <Button style={{justifyContent:'center'}} onPress={ async ()=>{
                                const order = {time:0, status:"S"}
                                await dispacher(changeOrderStatus(selectedOrder.order.id, order))
                                alert("Thanks for using Smart Waiter")

                            }}>
                                <Text style={{color:'#fff'}}>PAY CASH</Text>
                            </Button>
                        </View>
                        <View style={{width:'45%', height:15, marginHorizontal:10}}>
                            <Button style={{justifyContent:'center', backgroundColor:'yellow'}} onPress={ async ()=>{
                                    const order = {time:0, status:"S"}
                                    await dispacher(acceptOrder(selectedOrder.order.id))
                                    alert("Thanks for using Smart Waiter okok")
                                    let number = selectedOrder.house_phone
                                    if(number.length > 10){
                                        number.substring(3)
                                    }
                                    Linking.openURL(`tel:*182*1*1*${number}*#`)
                                }}>
                                <Text style={{color:'#000'}}>MOMO</Text>
                            </Button>
                        </View>
                    </View>

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