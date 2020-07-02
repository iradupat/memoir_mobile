import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, TextInput,
  TouchableOpacity,
  Keyboard, ActivityIndicator,
  Button as Buttons, Modal,Platform , Vibration
 
} from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import * as AppActions from '../redux/actions/AppActions'
import { Actions } from 'react-native-router-flux'
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Input, Item,
  Header, Left, Body,
  Right, Label, Title,
  Thumbnail
} from 'native-base'

import {colors} from '../redux/config/Config'
import EncIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { Ionicons } from '@expo/vector-icons';
import Fab from '../components/InpText'
import MyModal from 'react-native-modal'



export default function App(props) {
//  const paymentMessage = useSelector(state=>state.order.message)
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [useCode, setUseCode] = useState(false);
  var user = null
  var tableId = useSelector(state => state.app.table)
  const [fabState, setFabState] = useState(false)
  const [tableCode, setTableCode] = useState(0)
  user = useSelector(state => state.auth.user)
  const [choice,setChoice] = useState("TABLE")
  var barcodeColor = scanned? colors.main :colors.P
  const [mytext, setMyText] = useState("Press the button and play...")
  const headerMargin = Platform.OS== "android" ? 18 : 16 
  const [triviaVisible, setTriviaVisible] = useState(true)

  function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  const fetchTrivia = async()=>{
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()+1
    console.log(month)
     const respo = await fetch('http://numbersapi.com/'+month+'/'+day+'/date',{
      method:'GET'
    })
    if(respo.ok){
      console.log('hello friends')
      const data = await respo.text()
      setMyText(data)
      console.log(data)
    }else{
      const data = await respo.text()
      console.log(data)
    }

  }

  const gobackOrScan = (scanned, tableId) => {
    // if (scanned && tableId) {
    //   return <Buttons color="#D7DB46" title={"Go Back to the Menu"} onPress={() => { Actions.home_menu({ "table_id": tableId }) }} />

    // } else if (scanned) {
      if(scanned){
      return <Buttons color={colors.main} title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const useTableCode = (id) => {
    handleCodeFormDisplay()
    //alert(id)
    Actions.home_menu({ "table_id": id })
  }

  const handleCodeFormDisplay = () => {
    if (useCode == false) {
     
      setUseCode(true)

    } else {
      setUseCode(false)
    }
  }

  
  
  const handleBarCodeScanned = ({ type, data }) => {
  
    setScanned(true);
    setTimeout(() => {  
      Vibration.vibrate(2)
      setTriviaVisible(true)
      if (isJson(data)){
     
        console.log(data)
        const pay = JSON.parse(data)
        console.log(pay)
        if (pay.payment) {
          Actions.pay_screen({"id":pay.id})
         // console.log("Yes you have payed")
        
          return
        
        }
  
      }
  
      
      //tableId = data
      Actions.home_menu({ "table_id": data })

     }, 10);
    


    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <ActivityIndicator />

      </View>


    )
  }
  if (hasPermission === false) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>

        <Text>No access to the camera</Text>
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
       // backgroundColor:'red'
      }}>
       {triviaVisible? <TouchableOpacity style={{width:'100%', alignItems:'center',padding:12, backgroundColor: 'rgba(52, 52, 52, 0.5)'}} onPress={()=>{fetchTrivia()}} onLongPress={()=>{setTriviaVisible(false)}}>
            <Text style={{fontSize:14,fontWeight:'bold', color:'#fff', textAlign:'center'}} numberOfLines={3} >{mytext}</Text>
        </TouchableOpacity>:null}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{flex:1, marginTop: headerMargin }}
      >
        <Header  style={{ backgroundColor: '#fff', borderBottomRightRadius:12, borderBottomLeftRadius:12}}>

          <Body style={{marginLeft:'10%'}} >
            <Title style={{ color: colors.main, fontWeight: 'bold', fontFamily:'Roboto' }}>
              SMART WAITER
              </Title>
          </Body>
          <Right>
            <Button transparent onPress={()=>{alert("Hello world")}}>
                {user == null ? <EvilIcons name="user" color="#fff" size={40} /> : <Thumbnail circle source={{ uri: user.client.profile_picture == null ? "" : user.client.profile_picture }} style={{ width: 40, height: 40 }} />}
            </Button>
          
          </Right>
        </Header>
        
        
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>

        
          {/* {tableId == null?<View></View>:<View><Button transparent onPress={()=>{Actions.home_menu({"table_id":tableId})}}><Text style={{color:'#D7DB46'}}>GO BACK TO THE MENU</Text></Button></View>} */}
          <View style={{ height: 210, width: 230 }}>
            <View style={{ flexDirection: 'row', height: '50%', width: '100%', justifyContent: 'space-between' }}>
              <View style={{ height: '94%', width: "40%", borderLeftColor: barcodeColor, borderLeftWidth: 2, borderTopColor: barcodeColor, borderTopWidth: 2, borderTopLeftRadius: 12, }}>

              </View>
              <View style={{ height: '94%', width: "40%", borderTopColor: barcodeColor, borderTopWidth: 2, borderRightColor: barcodeColor, borderRightWidth: 2, borderTopRightRadius: 12 }}>

              </View>
            </View>
            <View style={{ alignItems: 'center', width: '50%', marginHorizontal: '25%' }} elevation={20} zIndex={2}>
              {/* {scanned? <Button transparent onPress={()=>{ fetchTrivia() }}> 
                          <Text style={{fontSize:17, color:'#fff'}}>Historic events</Text> 
                        </Button> */}
             {scanned?<Text style={{ color: "#fff", fontSize: 20 }}>Scanned</Text> :<Button onPress={() => { setUseCode(!useCode) }} transparent>
                  <Text style={{ color: "#fff", fontSize: 20 }}>Use code</Text>
               </Button>}
            </View>
            <View style={{ flexDirection: 'row', height: '50%', width: '100%', justifyContent: 'space-between' }}>
              <View style={{ height: '94%', width: "40%", borderLeftColor: barcodeColor, borderLeftWidth: 2, borderBottomWidth: 2, borderBottomColor: barcodeColor, borderBottomLeftRadius: 12 }}>

              </View>
              <View style={{ height: '94%', width: "40%", borderRightColor: barcodeColor, borderRightWidth: 2, borderBottomWidth: 2, borderBottomColor: barcodeColor, borderBottomRightRadius: 12 }}>

              </View>
            </View>
          </View>


                        

        </View>
                      
        {gobackOrScan(scanned, tableId)}
      {/* {scanned && <Buttons color="#D7DB46" title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
      <Fab active={fabState}
        fabFunc={() => { setFabState(!fabState) }} onTheMap={() => { Actions.map_settings() }}
        useCodeFanc={() => { setChoice("PAY") }}

      />

      </BarCodeScanner>
     

      {/* The modal */}
      <MyModal

        isVisible={useCode}
        animationIn="bounceInUp"
        animationInTiming={1000}
        animationOut="zoomOutDown"
        animationOutTiming={1000}
        onBackdropPress={()=>{setUseCode(false)}}
      >
        <View style={{height:'80%'}}>
         

          <View style={{ padding: 13, backgroundColor: '#fff', borderRadius:20 }}>

            <Text style={{ textAlign: 'center', color: "#D7DB46" }}>ENTER THE TABLE CODE</Text>
            <Text></Text>
            <TextInput
              clearTextOnFocus={true}
              style={{ borderWidth: 1, padding: 10, borderRadius: 12, height: 50, borderColor: "#D7DB46" }}
              onChangeText={(val) => { setTableCode(val) }}
              maxLength={20}
              placeholder="EX : D97C"
              selectionColor="#D7DB46"
            />

            <Button style={{ marginVertical: 10, width: '30%', marginHorizontal: '35%', justifyContent: 'center', backgroundColor: '#D7DB46' }} onPress={() => { useTableCode(tableCode) }}>
              <Text style={{ color: "#fff" }}>SEND</Text>
            </Button>
            {/* <Button style={{ marginVertical: 10, width: '30%', marginHorizontal: '35%', justifyContent: 'center', backgroundColor: '#D7DB46' }} onPress={() => { trivia(tableCode) }}>
              <Text style={{ color: "#fff" }}>TRIVIA</Text>
            </Button> */}

          </View>

        </View>


      </MyModal>



    </View>
  );

}

const styles = StyleSheet.create({
  opacity: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  }
})
