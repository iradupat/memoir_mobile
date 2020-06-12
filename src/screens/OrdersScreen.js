import React from 'react'
import {View,Text, StyleSheet, ScrollView} from 'react-native'
import {Header, Left, Right, Body, Title} from 'native-base'
import Card from '../components/Card'
import Order from '../components/OrderCard'


const SettingsScreen = props =>{
    return(
        <View style={{width:'100%', height:'100%', backgroundColor:'#fff'}}>
            <Header style={{backgroundColor:'#D7DB46'}}>
                <Left/>
                <Body>
                    <Title style={{color:'#fff',fontWeight:'bold'}}>ORDERS</Title>
                </Body>
                <Right/>
            </Header>
            <View style={{height:'37%'}}>
                <ScrollView horizontal indicatorStyle='white' >
                        <Card Date="20-02-2020" status="SERVED" number="21FR6" Restaurant="JAVA HOUSE" />
                        <Card Date="20-02-2020" status="SERVED" number="21FR6" Restaurant="JAVA HOUSE" />
                        <Card Date="20-02-2020" status="SERVED" number="21FR6" Restaurant="JAVA HOUSE" />
                        <Card Date="20-02-2020" status="SERVED" number="21FR6" Restaurant="JAVA HOUSE" />
                        <Card Date="20-02-2020" status="SERVED" number="21FR6" Restaurant="JAVA HOUSE" />
                        <Card Date="20-02-2020" status="SERVED" number="21FR6" Restaurant="JAVA HOUSE" />
                        <Card Date="20-02-2020" status="SERVED" number="21FR6" Restaurant="JAVA HOUSE" />
                        <Card Date="20-02-2020" status="SERVED" number="21FR6" Restaurant="JAVA HOUSE" />
                </ScrollView>

            </View>
            <View style={{flex:1,}}>
                <Order/>
                        
            </View>
        </View>
    )
}



export default SettingsScreen