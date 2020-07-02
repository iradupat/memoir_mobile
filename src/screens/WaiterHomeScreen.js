import React,{useEffect, useState} from 'react'
import {Text, View, FlatList, TouchableOpacity, Modal, ActivityIndicator,StyleSheet, Platform} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {useSelector,useDispatch} from 'react-redux'
import {colors} from '../redux/config/Config'
import {Actions} from 'react-native-router-flux'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

import {
    Button,Input,Item, 
    Header, Left, Body, 
    Right, Label, Title, 
    Badge
  } from 'native-base'
 
import {loadTables, selectTable as selectTableRedux} from '../redux/actions/WaiterActions'
 


const WaiterHomeScreen =props=>{
    
    const user = useSelector(state=>state.auth.user)
    const tables = useSelector(state=>state.waiter.tables)
    const selectedOrder = useSelector(state=>state.waiter.selectedOrder)
    const isLoading = useSelector(state=>state.waiter.isLoading)
    const dispacher = useDispatch()
    const [selectedTable, setSelectedTable] = useState(null)
    const  [refresh, setRefresh] = useState(false)
   
    useEffect(() => {
       //if(tables.length == 0){
        dispacher(loadTables(user.waiter.house))
       
      // }       
    },[selectedOrder])

    const selectTable = table=>{
        dispacher(selectTableRedux(table))
        Actions.orders_table()

    }

// if(isLoading){
//     return(
//         <View style={{flex:1, alignItems:'center', marginVertical:20}}>
//             <ActivityIndicator/>
//         </View>
//     )
// }
return(
        <View style={{flex:1}}>
            <Header style={{backgroundColor:"#fff"}}>
                {/* <Left>
                    <Text style={{color:"#fff"}}></Text>
                </Left> */}
                <Body>
                    <Title style={{color:colors.main, textTransform:'uppercase'}}> {user.waiter.name},  {tables.length} TABLES</Title>
                </Body>
                <Right>
                    <Button transparent>
                         <EvilIcons name="user" size={45} color={colors.main}/>
                    </Button>
                       
                </Right>
            </Header>
            <View style={{flex:1,}}>
               <FlatList
            
                contentContainerStyle={{paddingHorizontal:10}}
                refreshing={isLoading}
                    onRefresh={
                        ()=>{
                            
                            dispacher(loadTables(user.waiter.house))
                           
                           
                        }
                    }
                    data={tables}
                    keyExtractor={(item)=>item.id+""}
                    renderItem={({item})=>{
                        return (
                            <TouchableOpacity activeOpacity={0.7} style={item.isAvailable?{...styles.table}:{...styles.table,backgroundColor:colors.I}} onPress={()=>{selectTable(item)}}>
                                <View style={styles.circle}>
                                  <Text numberOfLines={2} style={{fontWeight:'bold', fontSize:12}}>{item.number}</Text>
                                </View>
                                <View style={{width:'55%'}}>
                                    <Text style={{color:'#fff'}} numberOfLines={1}>{item.description}</Text>
                                    <Text style={{color:colors.C}}>{item.isAvailable?null:<Text>Closed Table</Text>}</Text>
                                </View>
                                <View style={{width:'30%'}}>
                                    {item.order_set.length>0?
                                         <Badge danger>
                                         <Text style={{color:'#fff'}}>Pending</Text>
                                       </Badge>
                                    
                                    :null}
                                </View>
                               
                            </TouchableOpacity>
                        )
                    }}
                   
               />
                
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    circle:{
        alignItems:'center',
        justifyContent:'center',
        width:'20%',
        height:'80%', 
        borderRadius:35, 
        backgroundColor:'#fff', 
        margin:6
    },
    table:{
        width:'100%',
        backgroundColor:colors.main, 
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
        shadowOpacity: 0.18,
        shadowRadius: 16.00,
    
        elevation: 24,
    }
})

export default WaiterHomeScreen