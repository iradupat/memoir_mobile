import React, { useEffect, useState } from 'react'
import {
    StyleSheet, View,Alert,ActivityIndicator,
    Text, FlatList, TouchableOpacity,
    Modal, Image
} from 'react-native'
import { Button, Header, Left, Thumbnail, ListItem, Body, Right } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { changeOrderStatus, selectOrder as selectOrderRedux } from '../redux/actions/WaiterActions'
import { colors } from '../redux/config/Config'
import { Ionicons as Icons } from '@expo/vector-icons'
import { Actions } from 'react-native-router-flux';
import image from '../assets/images/empty.gif'


const TableViewScreen = props => {
    const isLoading = useSelector(state=>state.waiter.isLoading)
    const dispacher = useDispatch()
    const orders = useSelector(state => state.waiter.tableOrders)
    const selectedOrder = useSelector(state => state.waiter.selectedOrder)
    const table = useSelector(state => state.waiter.selectedTable)
    const [visible, setVisible] = useState(false)
    const [time, setTime] = useState({
        inMinutes: 0,
        mins: 1,
        hours: 0
    })
    //console.log(selectedOrder)
    //  console.log(products)

    const acceptOrder =  (id) => {
        Alert.alert('Alert', 'Are you sure?',
            [
                {
                    text:'OK',
                    onPress: async()=>{
                        const min = (time.hours * 60) + time.mins
                        setTime(Object.assign({}, time, { inMinutes: min }))
                        const order = {
                            time: min,
                            status: "I"
                        }
                        console.log(order)
                
                        await dispacher(changeOrderStatus(id, order))
                        setVisible(false)

                    }
                },
                {
                    text:'Cancel',
                    onPress:()=>{return}
                }
            ]
        )

        
    }

    const cancelOrder = (id) => {

        Alert.alert('Alert', 'Are you sure?',
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        setTime(Object.assign({}, time, { inMinutes: 0, min: 0, hours: 0 }))
                        const order = {
                            time: 0,
                            status: "C"
                        }
                        dispacher(changeOrderStatus(id, order))
                        setVisible(false)
                    }
                },
                {
                    text: 'No',
                    onPress: () => setVisible(false)
                    
                },
            ]

        )

    }

    const changeTimeMinutsUp = () => {
        if (time.mins < 60) {
            const newMins = time.mins + 1
            setTime(Object.assign({}, time, { mins: newMins }))
        } else {
            setTime(Object.assign({}, time, { mins: 0 }))

        }

    }
    const changeTimeMinutsLow = () => {
        if (time.mins) {
            const newMins = time.mins - 1
            setTime(Object.assign({}, time, { mins: newMins }))
        }

    }

    const changeTimeHoursUp = () => {
        if (time.hours < 24) {
            const newHours = time.hours + 1
            setTime(Object.assign({}, time, { hours: newHours }))
        }

    }

    const changeTimeHoursLow = () => {
        if (time.hours > 0) {
            const newHours = time.hours - 1
            setTime(Object.assign({}, time, { hours: newHours }))
        } else {

        }

    }

    const selectOrder = async (order) => {

        await dispacher(selectOrderRedux(order))
        setVisible(true)
    }
    if(orders.length==0){
        return(
        <View style={styles.main}>
            <Header style={{ backgroundColor: '#fff' }}>
                <Left>
                    <Button transparent onPress={()=>{Actions.pop()}}>
                        <Icons name="ios-arrow-back" size={40} color={colors.main} />
                    </Button>
                </Left>
                <Body/>
            </Header>
            <View style={styles.body}>
                <View style={{ height: '30%', width: '100%', padding: 12 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>TABLE {table.number}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>ORDERS: <Text style={{ color: 'red', fontSize: 19 }}>{orders.length}</Text> </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{table.description}</Text>
                </View>
            <View style={{alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:18, marginBottom:10}}>The order list is empty!!!</Text>
                    <Image source={require('../assets/images/empty.gif')} style={{ width:'80%', height:'70%'}}/>
            </View>
            </View>
        </View>
        )
    }
   
    return (
        <View style={styles.main}>
            <Header style={{ backgroundColor: '#fff' }}>
                <Left>
                    <Button transparent onPress={()=>{Actions.pop()}}>
                        <Icons name="ios-arrow-back" size={35} color={colors.main} />
                    </Button>
                </Left>
                <Body/>
            </Header>
            <View style={styles.body}>
                <View style={{ height: '30%', width: '100%', padding: 12 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Table {table.number}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Orders: <Text style={{ color: 'red', fontSize: 19 }}>{orders.length}</Text> </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{table.description}</Text>
                </View>

                <FlatList
                    refreshing={isLoading}
                    onRefresh={()=>{}}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    data={orders}
                    keyExtractor={(item) => item.id + ""}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity activeOpacity={0.7} style={styles.order} onPress={() => { selectOrder(item) }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center', width: '20%', height: '80%', borderRadius: 35, backgroundColor: '#fff', margin: 6 }} >
                                    <Text numberOfLines={2} style={{ textAlign: 'center', color: 'grey', fontSize: 15, fontWeight: 'bold' }}>ORDER {item.id}</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <View>
                                        <Text style={{ color: '#fff', fontSize: 17 }}> TABLE {item.table.number}, <Text style={{ color: 'red', fontWeight: 'bold' }}> {item.selectedproduct_set.length} </Text> Products </Text>

                                    </View>
                                    <View>
                                        <Button transparent>
                                            <Text style={{ color: '#fff', fontWeight: 'bold' }}> {item.client.display_name}</Text>
                                        </Button>
                                    </View>

                                </View>

                            </TouchableOpacity>
                        )
                    }}
                />

                {selectedOrder != null ? <Modal
                    animationType="slide"
                    transparent={false}
                    visible={visible}
                >
                    <View style={{flex:1}}>
                    <Header style={{ backgroundColor: '#fff', borderBottomColor:'#fff' }}>
                        <Left>
                            <Button onPress={() => { setVisible(!visible) }} transparent>
                                <Icons name="ios-close" size={40} color={colors.main} />
                            </Button>
                        </Left>
                        <Body>

                        </Body>
                    </Header>
                    <View style={{flex:1}}>
                    <View style={{borderBottomColor: 'grey', borderBottomWidth: 0.8, padding: 5 }}>
                        <Text style={{ textTransform: 'uppercase', textAlign: 'center', fontSize: 16, color:colors.main }}>{selectedOrder.client.display_name}<Text selectable={true} dataDetectorType="all" style={{ textTransform: 'lowercase', color:colors.S }}> :  {selectedOrder.client.owner.email}</Text></Text>
                        <Text style={{textAlign:'center', textTransform: 'uppercase', margin:4, color:colors.main}}>Table Description: {selectedOrder.table.description}</Text>
                        <Text style={{textAlign:'center', textTransform: 'uppercase', margin:4, fontSize:16, color:'red'}} >Total : {selectedOrder.total_price} Frw</Text>
                    </View>
                    
                    <View style={{alignItems:'center', paddingHorizontal:'20%', width:'100%', height:'20%', flexDirection:'row', justifyContent:'space-around'}}>
                        <View style={{ width:'30%', height:'90%', alignItems:'center'}}>
                            <Button transparent onPress={changeTimeHoursUp} onLongPress={changeTimeHoursUp}> 
                                <Icons size={45} name="ios-add"/>
                            </Button>
                            <Text style={{fontSize:22}}>{time.hours} h</Text>
                            <Button transparent onPress={changeTimeHoursLow} onLongPress={changeTimeHoursLow}>
                                 <Icons name="ios-remove" size={45}/>
                            </Button>
                        </View>
                        <View style={{alignItems:'center', width:'30%', height:'90%', }}>
                           <Button transparent onPressIn={changeTimeMinutsUp} onLongPress={changeTimeMinutsUp}>
                                    <Icons size={45} name="ios-add"/>
                            </Button>
                            <Text style={{fontSize:22}}>{time.mins} m</Text>
                            <Button transparent onPress={changeTimeMinutsLow}  onLongPress={changeTimeMinutsLow}>
                                <Icons name="ios-remove" size={45}/>
                            </Button>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                            <Button rounded style={{ backgroundColor: '#DF0F16', width: '35%', justifyContent: 'center' }} >
                                <Text style={{ color: '#fff', fontSize: 16 }} >CANCEL</Text>
                            </Button>
                            <Button rounded style={{ backgroundColor: "#599DEE", width: '35%', justifyContent: 'center' }} onPress={()=>{acceptOrder(selectedOrder.id)}}>
                                <Text style={{ color: '#fff', fontSize: 16 }}>ACCEPT</Text>
                            </Button>
                    </View>
                    <View style={{flex:1}}>
                        <FlatList
                            contentContainerStyle={{ paddingHorizontal:5 }}
                            data={selectedOrder.selectedproduct_set}
                            keyExtractor={(item) => item.product.product.id + ""}
                            renderItem={({ item }) => {
                                return (
                                    <ListItem avatar>
                                        <Left>
                                            <Thumbnail source={{ uri: item.product.product.image }} />
                                        </Left>
                                        <Body style={{ height: '100%' }}>
                                            <Text>{item.product.surname}</Text>
                                            <Text style={{color:'red'}} note>{item.product.amount} Frw</Text>
                                        </Body>
                                        <Right style={{ width: '30%' }}>
                                            <Text note>Quantity: {item.quantity} </Text>
                                        </Right>
                                    </ListItem>
                                )
                            }}
                        />
                        
                        </View>
                        {/* <View style={{height:20}}>

                        </View> */}
                  </View>
                  </View>
                </Modal> : null}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    body: {
        flex: 1,
        //marginHorizontal:'3%'
    },
    order: {

        width: '100%',
        backgroundColor: colors.main,
        height: 80,
        borderRadius: 17,
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.28,
        shadowRadius: 16.00,

        elevation: 24,
    },
})

export default TableViewScreen