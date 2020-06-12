import React,{useEffect, useState} from 'react'
import {Text, View, FlatList, TouchableOpacity, Modal, ActivityIndicator, Platform} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {useSelector,useDispatch} from 'react-redux'
import {colors} from '../redux/config/Config'
import {Actions} from 'react-native-router-flux'
//orders_table

import {
    Button,Input,Item, 
    Header, Left, Body, 
    Right, Label, Title, 
    Thumbnail
  } from 'native-base'
 
import {loadTables} from '../redux/actions/WaiterActions'
 


const WaiterHomeScreen =props=>{
    
    const user = useSelector(state=>state.auth.user)
    const tables = useSelector(state=>state.waiter.tables)
    const isLoading = useSelector(state=>state.waiter.isLoading)
    const dispacher = useDispatch()
    const [selectedTable, setSelectedTable] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const changeModalState =(id)=>{
        var x;
        var table;
        for (x in tables){
            if (tables[x].id === id){
                table = tables[x]
            }
        }
        setSelectedTable(table)
        setShowModal(!showModal)
    }
    const MyModal =item=>{
        return(
            <Modal 
              animationType="slide"
              transparent={false}
              visible={showModal}

            >
                <View style={{flex:1, backgroundColor:'#fff'}}>
                    <Header transparent >
                        <Left>
                            <Button transparent onPress={changeModalState}>
                                <Ionicons size={35} name="ios-close"/>
                            </Button>
                        </Left>
                        <Body></Body>
                    </Header>
                    <View style={{flex:1}}>
                        {/* {
                            selectedTable == null?

                            null:<DisplayOrders list={selectedTable.order_set}/>
                        } */}
                        
                    </View>
                </View>
  
            </Modal>
        )
  
    }

    const TableCard = MyItem =>{
        var col = "red"
        var title = ""
        if (MyItem.order_set.length === 0){
            col = colors.F
            title = "NO PENDINGS"
        }else {
            var served = true
            var order ;
            for (order in MyItem.order_set){
            
                    if(MyItem.order_set[order].status==="P"){
                        
                        served = false
                    }
            }
            if(served){
                col = colors.F
                title = "NO PENDINGS"
            }else{
                col = colors.P
                title = "PENDING ORDER"
            }
            
        }
        
        return(
            <TouchableOpacity onPress={()=>{Actions.orders_table({"table":MyItem})}} activeOpacity={0.7} style={{alignItems:'center',width:'45%', height:90, backgroundColor:col, margin:6, borderRadius:10}}>
                <Text style={{color:"#fff"}}>{title}</Text>
                <View style={{flex:1,justifyContent:'center', alignItems:'center', padding:9}}>
                    <Text style={{color:"#fff"}}>{MyItem.number}</Text>
                    <Text style={{color:"#fff"}} numberOfLines={2}>{MyItem.description} </Text>
                    </View>
            </TouchableOpacity>
            
        )
    }
   const DisplayOrders=(list)=>{
       return(
           <FlatList
            data={list}
            keyExtractor = {(item)=>item.id.toString()}
            renderItem={({item})=>{
                    <Text>{item.status}</Text>
            }}
           />
       )
   }
    


   
    useEffect(() => {
        if(tables.length == 0){
                dispacher(loadTables(user.waiter.house))
        }
       

    },[])

if(isLoading){
    return(
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <ActivityIndicator/>
        </View>
    )
}
    return(
        <View style={{flex:1}}>
            <Header style={{backgroundColor:colors.primary}}>
                <Left>
                    <Text style={{color:"#fff"}}>{user.waiter.name}</Text>
                </Left>
                <Body>
                    <Title style={{color:'white'}}>{tables.length} TABLES</Title>
                </Body>
                <Left>

                </Left>
            </Header>
            <View style={{flex:1, marginLeft:'4%'}}>
               <FlatList
                    data={tables}
                    keyExtractor={(item)=>item.id+""}
                    renderItem={({item})=>{
                        return TableCard (item)
                    }}
                    numColumns={2}
               />
                <MyModal />
            </View>
            
        </View>
    )
}

export default WaiterHomeScreen