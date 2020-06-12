import React , {}from 'react'
import {View,Text, StyleSheet} from 'react-native'
import {Header, Left, Right, Card, Icon, CardItem, Body, Button,Separator, Title } from 'native-base'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Actions} from 'react-native-router-flux'
import {colors } from '../redux/config/Config'
const SettingsScreen = props =>{



    return(
        
        <View style={{width:'100%', height:'100%'}}>
            <Header style={{backgroundColor:colors.main}}>
                <Body>
                    <Title style={{color:'#fff', fontWeight:'bold'}}>SMART WAITER</Title>
                </Body>
                  <Right>

                  </Right>
            </Header>
       
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Card style={{width:'100%'}}>
        <CardItem style={{borderTopWidth:0}}>
              
              <Text style={{fontWeight:'bold', fontSize:20}}>Settings</Text>
              <Body/>
              <Right>
              <Button transparent style={{ width:'100%', justifyContent:'flex-end'}}>
                  <Icon name="person"/>
                  </Button>
              </Right>
              
             </CardItem>
             <Separator bordered>
            
          </Separator>
            <CardItem style={{borderTopWidth:1, borderTopColor:'#f7f7f7'}}>
              <MatIcon active name="account" size={30} color="#1565c0"/>
              <Text style={{}}>   Account         </Text>
              <Body/>
              <Right>
              <Button transparent style={{ width:'100%', justifyContent:'flex-end'}} onPress={()=>{Actions.profile_settings()}}>
                <Icon name="arrow-forward" />
                </Button>
              </Right>
             </CardItem>
            
             <CardItem style={{borderTopWidth:1, borderTopColor:'#f7f7f7'}}>
             <MatIcon active name="map" size={30} color="#2e7d32"/>
              <Text>  On Google Map</Text>
              <Body/>
              <Right >
                
                <Button transparent style={{ width:'100%', justifyContent:'flex-end'}} onPress={()=>{Actions.map_settings()}}>
                   <Icon name="arrow-forward" />
                </Button>
               
                
                
              </Right>
             </CardItem>
             
             <CardItem style={{borderTopWidth:1, borderTopColor:'#f7f7f7'}}>
             
             <MatIcon active name="filter" size={30} color={colors.main}/>
              <Text>  Filter products</Text>
              <Body/>
              <Right >
              <Button transparent style={{ width:'100%', justifyContent:'flex-end'}}>
              <Icon name="arrow-forward" />
              </Button>
                
                
               
              </Right>
              
             </CardItem>
            
             <CardItem style={{borderTopWidth:1,borderTopColor:'#f7f7f7'}}>
     <MatIcon active name="robot" size={30} color="grey"/>
              <Text>  Talk to wewe</Text>
              <Body/>
              <Right>
              <Button transparent style={{ width:'100%', justifyContent:'flex-end'}} onPress={()=>{
                                                                                                    //Actions.chat_settings()
                                                                                                }}>
                <Icon name="arrow-forward" />
                </Button>
               
              </Right>
             </CardItem>
           </Card>
           
        </View>
       
        <View style={{height:'15%', justifyContent:'center', alignItems:"center", width:'100%'}}>
            <Text style={{color:colors.main, fontSize:16, fontWeight:'bold'}}>
               SMART WAITER &copy;
            </Text>
                    
        </View>
    </View>
    )
}



export default SettingsScreen