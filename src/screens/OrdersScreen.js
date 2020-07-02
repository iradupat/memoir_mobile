import React from 'react'
import {View,Text, StyleSheet, ScrollView} from 'react-native'
import {Header, Left, Right, Body, Title} from 'native-base'
import Card from '../components/Card'
import Order from '../components/OrderCard'
import {colors} from '../redux/config/Config'


const OrderScreen = props =>{
    return(
        <View style={{width:'100%', height:'100%', backgroundColor:'#fff'}}>
            <Header style={{backgroundColor:'#fff'}}>
                <Left/>
                <Body>
                    <Title style={{color:colors.main ,fontWeight:'bold'}}>ORDERS</Title>
                </Body>
                <Right/>
            </Header>
            <View style={{height:'40%'}}>
                <ScrollView horizontal indicatorStyle='#fff' >
                        <Card Date="20-02-2020" status="SERVED" number="21FR6" Restaurant="JAVA HOUSE" />
                        <Card Date="20-02-2020" status="PENDING" number="21FR6" Restaurant="JAVA HOUSE" />
                        <Card Date="20-02-2020" status="SERVED" number="21FR6" Restaurant="JAVA HOUSE" />
                        <Card Date="20-02-2020" status="SERVED" number="21FR6" Restaurant="JAVA HOUSE" />
                        <Card Date="20-02-2020" status="SERVED" number="21FR6" Restaurant="JAVA HOUSE" />
                        <Card Date="20-02-2020" status="SERVED" number="21FR6" Restaurant="JAVA HOUSE" />
                        <Card Date="20-02-2020" status="SERVED" number="21FR6" Restaurant="JAVA HOUSE" />
                        <Card Date="20-02-2020" status="SERVED" number="21FR6" Restaurant="JAVA HOUSE" />
                </ScrollView>

            </View>
            <View style={{flex:1,}}>
                {/* <Order/> */}
                        
            </View>
        </View>
    )
}



export default OrderScreen