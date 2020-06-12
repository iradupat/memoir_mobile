import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ActivityIndicator, TextInput, TouchableWithoutFeedback, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as UserActions from "../redux/actions/UserActions";
import {
  Header,
  Left,
  Button,
  Body,
  Title,
  Right,
  Thumbnail,
  List,
  ListItem,
    Content,
  Separator,
  Picker,Icon
  
} from "native-base";
import {colors} from '../redux/config/Config'
import * as ImagePicker from 'expo-image-picker';
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Actions } from "react-native-router-flux";

const ProfileScreen = (props) => {
  var client = useSelector((state) => state.user.client);
  var isLoadind = useSelector((state) => state.user.isLoadind);
  var error = useSelector((state) => state.user.error);
  var dispacher = useDispatch();
  var [gender,setGender] = useState("F")
  const [display_name, setDisplay_name] = useState("")
  const [phone,setPhone] = useState("")
  const [profile, setProfile] = useState()
  
 

  useEffect(()  => {
   
    if (client == null) {

        dispacher(UserActions.getProfileData())
       
       
    }
  
  }, [dispacher, isLoadind]);
  
  

  

  const update =(display_name, picture, phone, gender) => {



    Alert.alert(
      'Confirm',
      'Do you want to change you profile info?',
      [
        {text: 'YES', onPress: () => {
         
        if(display_name==""){
            display_name=client.display_name
        }
       
        if (phone==""){
          phone = client.phone
        }
        if(picture==undefined){
          let localUri = client.profile_picture;
          let filename = localUri.split('/').pop();
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;
          let photo = { uri: localUri, name: filename, type }

         // console.log("****** here the data:    "+display_name+" is me "+"    "+ photo+ phone+ gender)
          dispacher(UserActions.editProfile(display_name, photo, phone, gender))
          return
      }
        let localUri = picture.uri;
        let filename = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        let photo = { uri: localUri, name: filename, type }
    
       console.log("****** here the data:    "+display_name+" is me "+"    "+ photo+ phone+ gender)
         dispacher(UserActions.editProfile(display_name, photo, phone, gender))


        }},
        
        {text: 'NO', onPress: () => {}},
      ],
      {cancelable: false},
    );
    
    
  }

  const setProfilePic =(pic)=>{
    profilePicture=pic
  }
  const setPhoneNbr = (phone)=>{
    setPhone(phone)

  }
  const setName =(name)=>{
      setDisplay_name(name)
  }
  const onValueChange =(val)=>{
    
    setGender(val)
  }
  

const uploadPic = async() =>{
  //isLoadind = true
  let result = await ImagePicker.launchCameraAsync()
  if(!result.cancelled){
    
    //const img = await fetch(result.uri)
    //picture = img
    //profile_picture = result
    setProfile(result)
   // update(display_name, result, phone, gender)
    //setProfilePic(result.uri)
    //isLoadind = false
    
  }
}


 

 

if(isLoadind){
  return(
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator/>

    </View>
  )
}else if(error!=null){
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
     <Text>{error.error}</Text>

    </View>
  )
}else if(client !=null ){
 
  
  
  return (
    <View style={{ flex: 1 }}>
      <Header style={{ backgroundColor: colors.main }}>
        <Left>
          <Button transparent onPress={()=>{Actions.pop()}}>
            <Text style={{ color: "#fff", fontWeight:'bold' }}>Cancel</Text>
          </Button>
        </Left>
        <Body>
          <Title style={{ color: "#fff" }}>Profile</Title>
        </Body>
        <Right>
          <Button transparent onPress={()=>{
            // update(display_name, profile, phone, gender)
            }}>
            <MatIcon name="check" size={27} color="#fff" />
          </Button>
        </Right>
      </Header>
      <View
        style={{
          width: "100%",
          height: "20%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button transparent onPress={uploadPic}>
          <Thumbnail
            square
           style={{borderRadius :12, width:70}}
            source={{
              uri:client.profile_picture==null? "":client.profile_picture,
            }}
          />
        </Button>
        {/* <Text></Text> */}
        <Text></Text>
        <Text style={{ color: colors.main, fontWeight: "bold", fontSize: 15 }}>
           {client.owner.email}
        </Text>
      </View>
      <Separator bordered>
            
          </Separator>
      <View style={{ width: "100%", height: "45%" }}>
          
        <List>
          <ListItem selected>
            <Left>
              <Text style={{fontWeight:'bold', color:'grey'}}>Email Address</Text>
            </Left>
            <Body>
                <TextInput keyboardType="email-address" value={client.owner.email} editable={false} />
            </Body>
          </ListItem>
          <ListItem>
            <Left>
              <Text style={{fontWeight:'bold', color:'grey'}}>User Name</Text>
            </Left>
            <Body>
            <TextInput defaultValue={client.display_name} onTextInput={setName}  onChangeText={setName} />
            </Body>
          </ListItem>
          <ListItem>
            <Left>
              <Text style={{fontWeight:'bold', color:'grey'}}>Phone Number</Text>
            </Left>
            <Body>
            <TextInput keyboardType="phone-pad" defaultValue={client.phone} onChangeText={setPhoneNbr} />
            </Body>
          </ListItem>
          <ListItem>
            <Left>
              <Text style={{fontWeight:'bold', color:'grey'}}>Gender</Text>
            </Left>
            <Body>
           
            <Picker
              mode="dropdown"
              iosHeader="Gender"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              onValueChange={onValueChange}
              selectedValue={gender}
              
             
            >
              <Picker.Item label="Male" value="M" />
              <Picker.Item label="Female" value="F" />
              <Picker.Item label="Unknown" value="U"/>
              
            </Picker>


            </Body>
          </ListItem>
        </List>
      
      </View>
      
      <Separator bordered>
            
          </Separator>
      <View
        style={{ backgroundColor: "#fff", width: "100%", height: "20%", alignItems:'center', justifyContent:'center' }}
      >
          <Text style={{color:colors.main, fontSize:17, fontWeight:'bold'}}>SMART WAITER</Text>
      </View>
    </View>
  );
 }else{
   return(
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    <ActivityIndicator/>

    </View>
   )
 }
};

export default ProfileScreen;
