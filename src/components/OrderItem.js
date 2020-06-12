import React from 'react';
import {View, Text} from 'react-native'
import {List, ListItem, Left, Right, Body, Thumbnail,Button} from 'native-base'
import {useSelector} from 'react-redux'


function OrderItem(props) {

  var orderType = props.ourItem.status
  var orderStatus = ""
  var orderMainColor = "#fff"
  var orderTextColor = "red"
  var message = ""


  if (orderType=="P"){

    orderStatus = "PENDING"
    orderMainColor = "#fff"
    orderTextColor = "green"
    message = "This order is pendind, please wait for the waiter's response"
  }else if(orderType=="C"){
    orderStatus = "CENCELED"
    orderMainColor = "#fff"
    orderTextColor = "red"
    message = "The order, was canceled."
  }else if(orderType=="I"){

    var time = props.ourItem.to_be_delivered_in
    var hour = time/60
    var rhour = Math.floor(hour)
    var minutes = (hour - rhour) * 60;
    var hour = parseInt(hour) 
    orderStatus = "RECIEVED"
    orderMainColor = "#fff"
    orderTextColor = "blue"
    message = <Text>This Order is in process and it is to be served in <Text style={{fontSize:17, color:'blue'}}>{hour} h : {minutes} min </Text></Text>

  }else if(orderType=="S"){
    orderStatus = "SERVED"
    orderMainColor = "#fff"
    orderTextColor = "green"
    message = "This order was served"

  }
    
 
    return (
        <View style={{width:'100%'}}>
           
            <ListItem thumbnail>
              <Left>
                <View style={{backgroundColor:orderMainColor, borderRadius:30, width:55, height:55, justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:orderTextColor}}>
                      <Text style={{color:orderTextColor, fontSize:9}}>{orderStatus}</Text>
                </View>
                {/* <Thumbnail source={require('../assets/images/bg3.jpg')} /> */}
              </Left>
              <Body style={{paddingRight:3,}}>
              <Text style={{color:orderTextColor}} note>ORDER N0: {props.ourItem.id}</Text>

                <Text numberOfLines={3} style={{color:'grey'}} note>{message}</Text>
              </Body>
              <Right>
                   <Button transparent>
                            <Text style={{color:orderTextColor}}>Action</Text>
                    </Button>
                       
                    
              </Right>
            </ListItem>
        </View>
    );
}

export default OrderItem;