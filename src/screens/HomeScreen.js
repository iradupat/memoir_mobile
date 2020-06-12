import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, TextInput,
  TouchableWithoutFeedback,
  Keyboard, ActivityIndicator,
  Button as Buttons, Modal,
 
} from 'react-native';
import {Platform} from 'expo'
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



export default function App(props) {
 
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
  var text = "Scaned..."

  function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  function getOrderToPay(id){

  }

  const gobackOrScan = (scanned, tableId) => {
    // if (scanned && tableId) {
    //   return <Buttons color="#D7DB46" title={"Go Back to the Menu"} onPress={() => { Actions.home_menu({ "table_id": tableId }) }} />

    // } else if (scanned) {
      if(scanned){
      return <Buttons color="#D7DB46" title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
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

      if (isJson(data)){
     
        console.log(data)
        const pay = JSON.parse(data)
        console.log(pay)
        if (pay.payment) {
          Actions.pay_screen({"id":pay.id})
          console.log("Yes you have payed")
        
          return
        
        }
  
      }
  
      
      //tableId = data
      Actions.home_menu({ "table_id": data })

     }, 1000);
    


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
        backgroundColor:'red'
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{...StyleSheet.absoluteFillObject,flex:1, backgroundColor:colors.main}}
      >
        <Header  style={{ backgroundColor: colors.main }}>

          <Body style={{marginLeft:'10%'}} >
            <Title style={{ color: '#fff', fontWeight: 'bold' }}>
              SMART WAITER
              </Title>
          </Body>
          <Right>

            {user == null ? <EvilIcons name="user" color="#fff" size={40} /> : <Thumbnail circle source={{ uri: user.client.profile_picture == null ? "" : user.client.profile_picture }} style={{ width: 40, height: 40 }} />}
          </Right>
        </Header>

        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>


          {/* {tableId == null?<View></View>:<View><Button transparent onPress={()=>{Actions.home_menu({"table_id":tableId})}}><Text style={{color:'#D7DB46'}}>GO BACK TO THE MENU</Text></Button></View>} */}
          <View style={{ height: 230, width: 230 }}>
            <View style={{ flexDirection: 'row', height: '50%', width: '100%', justifyContent: 'space-between' }}>
              <View style={{ height: '94%', width: "40%", borderLeftColor: barcodeColor, borderLeftWidth: 2, borderTopColor: barcodeColor, borderTopWidth: 2, borderTopLeftRadius: 12, }}>

              </View>
              <View style={{ height: '94%', width: "40%", borderTopColor: barcodeColor, borderTopWidth: 2, borderRightColor: barcodeColor, borderRightWidth: 2, borderTopRightRadius: 12 }}>

              </View>
            </View>
            <View style={{ alignItems: 'center', width: '50%', marginHorizontal: '25%' }} elevation={20} zIndex={2}>
              {scanned? <Text style={{fontSize:17, color:'#fff'}}>{text}</Text>:<Button onPress={() => { setUseCode(!useCode) }} transparent><Text style={{ color: "#fff", fontSize: 20 }}>Use code</Text></Button>}
            </View>
            <View style={{ flexDirection: 'row', height: '50%', width: '100%', justifyContent: 'space-between' }}>
              <View style={{ height: '94%', width: "40%", borderLeftColor: barcodeColor, borderLeftWidth: 2, borderBottomWidth: 2, borderBottomColor: barcodeColor, borderBottomLeftRadius: 12 }}>

              </View>
              <View style={{ height: '94%', width: "40%", borderRightColor: barcodeColor, borderRightWidth: 2, borderBottomWidth: 2, borderBottomColor: barcodeColor, borderBottomRightRadius: 12 }}>

              </View>
            </View>
          </View>


        </View>


      </BarCodeScanner>
      {gobackOrScan(scanned, tableId)}
      {/* {scanned && <Buttons color="#D7DB46" title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
      <Fab active={fabState}
        fabFunc={() => { setFabState(!fabState) }} onTheMap={() => { Actions.map_settings() }}
        useCodeFanc={() => { setChoice("PAY") }}

      />

      {/* The modal */}
      <Modal

        animationType="slide"
        transparent={false}
        visible={useCode}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View>
          <Header style={{ backgroundColor: "#fff" }}>
            <Right>
              <Button transparent onPress={() => { setUseCode(!useCode) }}>
                <Ionicons name="ios-close" size={27} />
              </Button>

            </Right>
          </Header>

          <View style={{ padding: 13, backgroundColor: '#fff' }}>

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

          </View>

        </View>


      </Modal>



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
