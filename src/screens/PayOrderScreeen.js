import React, {useCallback, useState, useEffect} from 'react'
import {Text, View, ActivityIndicator, Alert, FlatList, Linking, Image} from 'react-native'
import {Button, Header, Left, Right, Icon, Body, Title,Card,CardItem} from 'native-base'
import {getOrder, acceptOrder} from '../redux/actions/OrderActions'
import {changeOrderStatus} from '../redux/actions/WaiterActions'
import {useDispatch, useSelector} from 'react-redux'
import { Actions } from 'react-native-router-flux'
import MyModal from 'react-native-modal'
import {colors} from '../redux/config/Config' 
import { Entypo } from '@expo/vector-icons';


const PayOrderScreen = props=>{

const selectedOrder = useSelector(state=>state.order.order)
const orderId = props.id
const dispacher = useDispatch()
const isLoading = useSelector(state=>state.order.isLoading)
const message = useSelector(state=>state.order.message)
const user = useSelector(state=>state.auth.user)

// {console.log(selectedOrder)}
const [payment,setPaymentModal] = useState(false)
const [modal, setModal] = useState(false)
const accpetOrder =()=>{
    
}
    useEffect(()=>{
        // if(message.message=="Thank you for using Smart waiter"){
        //     setPaymentModal(true)
        // }
        dispacher(getOrder(orderId))
    },[])

    if(isLoading){
        return(
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <ActivityIndicator/>
            </View>
        )
    }
    if (selectedOrder==null){
        return(
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <MyModal 
                            isVisible={payment}
                            animationIn="bounceIn"
                            animationInTiming={1000}
                            animationOut="zoomOutDown"
                            animationOutTiming={1000}
                           
                            swipeDirection={["down"]}
                           
                            >
                            <View style={{width:'100%', backgroundColor:'#fff', borderTopEndRadius:12, borderTopStartRadius:12}}>
                                
                                
                                
                                <View style={{height:470, backgroundColor:'#fff'}}>
                                    <View style={{height:'38%', alignItems:'center'}}>
                                        <Image source={require('../assets/images/verified.gif')} style={{width:'40%', height:'70%'}}/>
                                    </View>
                                    <View style={{flex:1, margin:3}}>
                                        <Card style={{flex:1, borderRadius:10}}>
                                        <CardItem style={{alignItems:"center",  justifyContent:'center'}} >
                                                <Title style={{color:"#000"}}>Thank you {user.client.display_name}</Title>
                                            
                                        </CardItem>
                                        <CardItem>
                                        <Text style={{textAlign:'center', fontSize:16}}> How was the service at Lebanone Hotel?</Text>
                                        </CardItem>
                                        <CardItem style={{justifyContent:'space-around'}}>
                                            {/* <Button onPress={()=>{setPaying(false)}} style={{justifyContent:'center', width:'100%', backgroundColor:colors.main}}>
                                            <Text style={{fontSize:20, color:'#fff'}}>ok</Text>
                                            </Button> */}
                                            <Button transparent>
                                                <Entypo name="thumbs-up" size={38} color={colors.main} />
                                            </Button>
                                            <Button transparent>
                                                <Entypo name="thumbs-down" size={38} color={colors.main} />
                                            </Button>
                                        </CardItem>
                                        <CardItem>
                                            <Button style={{width:'100%', justifyContent:'center'}} onPress={()=>{
                                                Actions.pop()
                                                setPaymentModal(false)
                                                }}>
{/* }}> */}
                                                <Text style={{fontWeight:'700', color:'#fff'}}>Go Home</Text>
                                            </Button>
                                        </CardItem>
                                        </Card>

                                    </View>
                                </View>
                            </View>

                            </MyModal>
        </View>
        )
    }
    
            return(
                <View style={{flex:1}}>
                    <Header style={{backgroundColor:"#fff"}}>
                        <Left/>
                        <Body>
                            <Title style={{color:colors.main}}>PAYMENT BILL</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <View style={{alignItems:'center', flex:1, marginVertical:5}}>
                    <Card style={{width:'90%'}}>
                        <CardItem>

                        <View style={{ margin:10}}>
                        <View style={{height:32,  flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                            <Text style={{fontSize:18, color:'grey', fontWeight:'bold'}} >{selectedOrder.house} T {selectedOrder.table}</Text>
                        </View>
                    </View>
                        </CardItem>
                    
                    <CardItem>
                    <View style={{flexDirection:'row', marginHorizontal:10, marginVertical:10}}>
                        <View style={{width:'45%', height:25, marginHorizontal:10}}>
                            <Text style={{fontSize:18}}>Felix</Text>
                        </View>
                        <View style={{width:'45%', height:25, marginHorizontal:10}}>
                            <Text style={{fontSize:15}}>{selectedOrder.create_at}</Text>
                        </View>
                    </View>
                   </CardItem>
                    <CardItem>
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
                    </CardItem>
                   <CardItem footer>
                    <View style={{flexDirection:'row', flex:1, marginHorizontal:10}}>
                        <View style={{width:'45%', height:15, marginHorizontal:10}}>
                                <Text style={{fontWeight:'700'}}>Total: </Text>
                        </View>
                        <View style={{width:'45%', height:15, marginHorizontal:10}}>
                                <Text style={{fontWeight:'700'}}>{selectedOrder.order.total_price} Frw</Text>
                        </View>
                    </View>
                    </CardItem>
                    </Card>
                    </View>
                    <View style={{flexDirection:'row', flex:1, marginHorizontal:10}}>
                        <View style={{width:'45%', height:15, marginHorizontal:10}}>
                            <Button style={{justifyContent:'center', backgroundColor:'#032280'}} onPress={ async ()=>{
                                const order = {time:0, status:"S"}
                                await dispacher(acceptOrder(selectedOrder.order.id))
                                //alert(message)
                                if(message.message=="Thank you for using Smart waiter")
                                    setPaymentModal(true)
                                    
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
                                        setPaymentModal(true)
                                       
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
                
            )
           
           
}

export default PayOrderScreen