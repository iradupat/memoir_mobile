import React, {useState, useEffect} from 'react'
import {View, Text, ActivityIndicator,
     FlatList, StyleSheet, TouchableOpacity,
     Modal} from 'react-native'
import {Button, Alert, Header,Content,
        Left, Right, Body, Badge, ListItem, Thumbnail
        } from 'native-base'
import {useSelector, useDispatch} from 'react-redux'
import {colors} from '../redux/config/Config'
import {selectOrder as selectOrderRedux ,get_your_orders} from '../redux/actions/WaiterActions'
import { Ionicons as Icons, EvilIcons } from '@expo/vector-icons'
import { QRCode } from 'react-native-custom-qr-codes-expo';

const HouseOrdersScreen = props =>{
    const isLoading = useSelector(state=>state.waiter.isLoading)
    const orders = useSelector(state=>state.waiter.orders)
    const selectedOrder = useSelector(state=>state.waiter.selectedOrder)
    const dispacher = useDispatch()
    const [showQcode, setShowQcode] = useState(false)
    const [codeValue, setCodeValue] = useState({
        payment: true,
        id: null
    })
    const [visible, setVisible] = useState(false)
    useEffect(()=>{
        dispacher(get_your_orders())

    },[selectedOrder])

    const selectOrder = async (order) => {

        await dispacher(selectOrderRedux(order))
        setVisible(true)
    }

    const serveOrder = (id) => {
        //setOrderStatus("S")
        setShowQcode(true)
        setCodeValue(JSON.stringify(Object.assign({}, codeValue, { id: id })))

    }

    return(
        <View style={styles.main}>

               <Header style={{backgroundColor:"#fff",  alignItems:'center'}}>
                    <Text style={styles.headerText}>ORDERS YOU ARE SERVING</Text>
                    <Right>
                    <Button transparent>
                         <EvilIcons name="user" size={45} color={colors.main}/>
                    </Button>
                       
                </Right>                     
                </Header>
                
                <View style={styles.body}>
                    <FlatList
                        refreshing={isLoading}
                        onRefresh={()=>{
                            dispacher(get_your_orders())
                        }}
                         contentContainerStyle={{paddingHorizontal:10}}
                        data={orders}
                        keyExtractor={(item)=>item.id+""}
                        renderItem={({item})=>{
                            return(
                                <TouchableOpacity activeOpacity={0.7} style={styles.order} onPress={()=>selectOrder(item)}>
                                    <View style={{alignItems:'center',justifyContent:'center',width:'20%', height:'80%', borderRadius:35, backgroundColor:'#fff', margin:6}} >
                                        <Text  numberOfLines={2} style={{textAlign:'center' ,color:'grey', fontSize:15, fontWeight:'bold'}}>ORDER {item.id}</Text>
                                    </View>
                                    <View style={{alignItems:'center'}}>
                                        <View> 
                                            <Text style={{color:'#fff'}}> TABLE {item.table.number} </Text> 
                                            
                                        </View>
                                        <View>    
                                            <Text style={{color:"#fff"}}> <Text style={{ color: 'red', fontWeight: 'bold' }}> {item.selectedproduct_set.length} </Text> Product(s) </Text>
                                        </View>
                                       
                                    </View>
                                   
                                    
                                </TouchableOpacity>
                            )
                        }}
                    />

                </View>
                {selectedOrder != null ? <Modal
                    animationType="slide"
                    transparent={false}
                    visible={visible}
                >
                    <Header style={{ backgroundColor: '#fff' }}>
                        <Left>
                            <Button onPress={() => {
                                 setVisible(!visible) 
                                 setShowQcode(false) 
                                 setCodeValue({
                                    payment: true,
                                    id: null
                                 })
                                 
                                 }} transparent>
                                <Icons name="ios-close" size={40} color={colors.main} />
                            </Button>
                        </Left>
                        <Body>

                        </Body>
                    </Header>
                    <View style={{ height: '20%', borderBottomColor: 'grey', borderBottomWidth: 0.8, padding: 5 }}>
                        <Text style={{ textTransform: 'uppercase', textAlign: 'center', fontSize: 16, color:colors.main }}>{selectedOrder.client.display_name}<Text selectable={true} dataDetectorType="all" style={{ textTransform: 'lowercase', color:colors.S }}> :  {selectedOrder.client.owner.email}</Text></Text>
                        <Text style={{textAlign:'center', textTransform: 'uppercase', margin:4, color:colors.main}}>Table Description: {selectedOrder.table.description}</Text>
                        <Text style={{textAlign:'center', textTransform: 'uppercase', margin:4, fontSize:16, color:'red'}} >Total : {selectedOrder.total_price} Frw</Text>
                    </View>
                    <View >

                    {showQcode?<View style={{ alignItems: 'center', justifyContent: 'center', marginVertical:'8%', marginBottom:'3%' }}>
                                    <Text>Let the customer scan the code</Text>
                                    <QRCode linearGradient={["#000"]} content={codeValue} />

                            </View>:  
                    
                        <View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical:'10%' }}>
                                <Button rounded style={{ backgroundColor: '#DF0F16', width: '35%', justifyContent: 'center' }} onPress={()=>{serveOrder(selectedOrder.id)}} >
                                    <Text style={{ color: '#fff', fontSize: 16 }} >CONCLUD</Text>
                                </Button>
                            </View>

                        <FlatList
                            contentContainerStyle={{ paddingHorizontal: 5 }}
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
                        }

                    </View>
                </Modal> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    order:{
        
        width:'100%', 
        backgroundColor:colors.primary, 
        height:80, 
        borderRadius:17, 
        marginVertical:8, 
        flexDirection:'row', 
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.28,
        shadowRadius: 16.00,
    
        elevation: 24,
    },
    body:{
        flex:1,
        //paddingHorizontal:'2%'
    },
    main:{
        flex:1,
        
         
    },
    headerText:{
        color:colors.main,
        fontSize:17,
        fontWeight:'bold'
    }
})


export default HouseOrdersScreen