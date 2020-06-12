import React, { useState, useEffect, useCallback } from 'react';
import {
    Text, View, StyleSheet,
    FlatList, TouchableOpacity, Modal,
    ActivityIndicator, Alert
} from 'react-native';
import { Button, Left, Header, Body, Right, ListItem, List, Thumbnail, } from 'native-base'
import { colors } from '../redux/config/Config'
import { Ionicons as Icons } from '@expo/vector-icons'
import { Actions } from 'react-native-router-flux';
import { getProductsFromOrder, changeOrderStatus } from '../redux/actions/WaiterActions'
import { useDispatch, useSelector } from 'react-redux'
import { QRCode } from 'react-native-custom-qr-codes-expo';


const TableOrdersScreen = props => {

    const [codeValue, setCodeValue] = useState({
        payment: true,
        id: null
    })
    const [visible, setVisible] = useState(false)
    const diapacher = useDispatch()
    const isLoading = useSelector(state => state.waiter.isLoading)
    const products = useSelector(state => state.waiter.productsInOrders)
    const table = props.table
    const [selectedOrder, setSelectedOrder] = useState(null)
    const updated_order = useSelector(state=>state.waiter.selectedOrder)
    const [orderStatus, setOrderStatus] = useState("I")
    const [time, setTime] = useState({
        inMinutes: 0,
        mins: 1,
        hours: 0
    })

    // accept an order
    const acceptOrder = async (id) => {

        const min = (time.hours * 60) + time.mins
        setTime(Object.assign({}, time, { inMinutes: min }))
        const order = {
            time: min,
            status: "I"
        }
        console.log(order)

        await diapacher(changeOrderStatus(id, order))
        setSelectedOrder(updated_order)
        setVisible(false)
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
                        diapacher(changeOrderStatus(id, order))
                    }
                },
                {
                    text: 'No',
                    onPress: () => console.log('OK')
                },
            ]

        )

    }
    const serveOrder = (id) => {
        setOrderStatus("S")
        setCodeValue(JSON.stringify(Object.assign({}, codeValue, { id: id })))

    }


    const getProducts = (id) => {
        setVisible(!visible)
        if (products.length == 0) {
            diapacher(getProductsFromOrder(id))
        }


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
    const actions = (item) => {
        setOrderStatus(item.status)
        setSelectedOrder(item)
        Alert.alert(
            'Actions',
            'What would you like to do?',
            [
                {
                    text: 'close',
                    onPress: () => console.log('Ask me later pressed')
                },

                //   { text: 'cancel', onPress: () => console.log('OK Pressed') },
                { text: 'Inspect', onPress: () => getProducts(item.id) }
            ],
            { cancelable: false }
        );

    }


    useEffect(() => {

    }, [])
    return (
        <View style={styles.body}>
            <View style={styles.header}>
                <View style={styles.left}>
                    <Button transparent onPress={() => { Actions.pop() }}>
                        <Icons name="ios-arrow-back" size={27} color="white" />
                    </Button>
                </View>
                <View style={styles.middle}>
                    <Text style={styles.title}>Table {table.number}</Text>
                </View>

            </View>
            <View style={styles.inBody}>
                <View style={{ backgroundColor: '#fff', height: '25%' }}>

                </View>
                <View>
                    <FlatList
                        data={table.order_set}
                        keyExtractor={(item) => item.id + ""}
                        renderItem={({ item }) => {
                            return (
                                <ListItem style={{ backgroundColor: '#F5E7A0' }} avatar>
                                    <View style={{ width: '16%', margin: 6, borderRadius: 30, height: 40, borderWidth: 2, alignItems: 'center', borderColor: 'black' }}>
                                        <View >
                                            <Text style={{ fontSize: 20 }}>{item.status}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        <Text>Price {item.total_price} Frw</Text>
                                        {/* <Text note>Doing what you like will always keep you happy . .</Text> */}
                                    </View>
                                    <View style={{ paddingHorizontal: 10, width: '20%' }}>
                                        <TouchableOpacity onPress={() => { actions(item) }}>
                                            <Text>Actions</Text>
                                        </TouchableOpacity>

                                    </View>

                                </ListItem>
                            )
                        }}
                    />
                </View>

            </View>

            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
            >
                <Header style={{ backgroundColor: colors.primary }}>
                    <Left>
                        <Button onPress={() => { setVisible(!visible) }} transparent>
                            <Icons name="ios-close" size={30} color="#fff" />
                        </Button>
                    </Left>
                    <Body />
                </Header>
                <View style={{ flex: 1 }}>
                    {isLoading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                            <ActivityIndicator />
                        </View> :
                        <View style={{ flex: 1, padding: 12 }}>
                            <View style={{ height: '10%', backgroundColor: '#fff', alignItems: 'center' }}>
                                <Text>Thanks for the products, and the services you offer</Text>
                            </View>
                            <View style={{ height: '20%', flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>

                                    <Button transparent rounded style={{ width: '50%', justifyContent: 'center' }} onPress={changeTimeHoursUp}>
                                        <Text style={{ color: '#000' }} >
                                            <Icons name="ios-arrow-up" size={45} />
                                        </Text>
                                    </Button>
                                    <Text style={{ fontSize: 18 }}>{time.hours} h</Text>
                                    <Button transparent rounded style={{ width: '50%', justifyContent: 'center' }} onPress={changeTimeHoursLow}>
                                        <Text style={{ color: '#000' }}>
                                            <Icons name="ios-arrow-down" size={45} />
                                        </Text>
                                    </Button>


                                </View>
                                <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>

                                    <Button transparent rounded style={{ width: '35%', justifyContent: 'center' }} onPress={changeTimeMinutsUp}>
                                        <Text style={{ color: '#000' }} >
                                            <Icons name="ios-arrow-up" size={45} />
                                        </Text>
                                    </Button>
                                    <Text style={{ fontSize: 18 }}>{time.mins} m</Text>
                                    <Button transparent rounded style={{ width: '35%', justifyContent: 'center' }} onPress={changeTimeMinutsLow}>
                                        <Text style={{ color: '#000' }}>
                                            <Icons name="ios-arrow-down" size={40} />
                                        </Text>
                                    </Button>

                                </View>

                            </View>
                            {orderStatus == "P" ?
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Button rounded style={{ backgroundColor: '#DF0F16', width: '35%', justifyContent: 'center' }} onPress={() => { selectedOrder != null ? cancelOrder(selectedOrder.id) : null }}>
                                        <Text style={{ color: '#fff', fontSize: 16 }} >CANCEL</Text>
                                    </Button>
                                    <Button rounded style={{ backgroundColor: "#599DEE", width: '35%', justifyContent: 'center' }} onPress={() => { selectedOrder != null ? acceptOrder(selectedOrder.id) : null }}>
                                        <Text style={{ color: '#fff', fontSize: 16 }}>ACCEPT</Text>
                                    </Button>

                                </View> :
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Button rounded style={{ backgroundColor: '#DF0F16', width: '35%', justifyContent: 'center' }} onPress={() => { selectedOrder != null ? serveOrder(selectedOrder.id) : null }}>
                                        <Text style={{ color: '#fff', fontSize: 16 }} >SERVE</Text>
                                    </Button>
                                </View>

                            }
                            {orderStatus == "P" || orderStatus == "I" ?
                                <FlatList
                                    data={products}
                                    keyExtractor={(item) => item.product.product.id + ""}
                                    renderItem={({ item }) => {
                                        return (


                                            <ListItem avatar>
                                                <Left>
                                                    <Thumbnail small source={{ uri: item.product.product.image }} />
                                                </Left>
                                                <Body>
                                                    <Text> {item.quantity} {item.product.product.title}</Text>
                                                    {/* <Text note>Doing what will always keep you happy . .</Text> */}
                                                </Body>
                                                {/* <Right>
                                        <Text style={{fontSize:10}} >{item.quantity}</Text>
                                    </Right> */}
                                            </ListItem>




                                            // <Text> </Text>

                                        )
                                    }}
                                /> :
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Let the customer scan the code</Text>
                                    <QRCode linearGradient={["#000"]} content={codeValue} />

                                </View>
                            }

                        </View>
                    }
                </View>

            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: '10%',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
    },
    title: {
        fontSize: 20,
        color: '#fff',
    },
    inBody: {
        flex: 1,
    },
    left: {

        width: '10%',
        alignItems: 'center',
    },
    middle: {
        width: '90%',
        paddingLeft: '14%',
    },
})

export default TableOrdersScreen