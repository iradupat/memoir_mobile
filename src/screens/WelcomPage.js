import React, {useState, useEffect, useCallback} from 'react'
import {View, Text,Modal, StyleSheet, Image, ActivityIndicator} from 'react-native'
import {Header, Left, Right, Button, Input, Icon, Body, Content, Item} from 'native-base'
import {colors} from '../redux/config/Config'
import {Actions} from 'react-native-router-flux'
import {useDispatch, useSelector} from 'react-redux'
import * as AuthActions from '../redux/actions/Auth'
import  MyModal from 'react-native-modal'

const WelcomPage = props =>{
    const [loginModal, setLoginModal] = useState(false)
    const dispatch = useDispatch();   
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const user = useSelector(state=>state.auth.user)
    const isLoading = useSelector(state=>state.auth.isLoading)
    const [testModal, setTestModal ] = useState(false)
    const login = ()=>{
     
        setLoginModal(true)
        setRegister(false)

    } 

    const googleAuth = async () =>{

    }

    const LoginFunction =  async ()=>{   
         
        try{
          await dispatch(AuthActions.login(email, password))  
         
         }catch(error){
             alert(error)
 
         }
     }

     useEffect(()=>{

        if (user!==null){  
            if(user.isClient){
                Actions.home()
                setLoginModal(false)
                
            }    
          }
           
     },[user])

    return(
        <View style={styles.container}>
            <View style={{zIndex:0}}>
            <View style={{...styles.logo,}}>
                <View style={styles.imgContainer}>
                    <Image source={require('../assets/images/logo.png')} style={styles.img}/>
                </View>
                

            </View>
            <View style={styles.body}>  
                <Button style={styles.loginButton} onPress={()=>{ setTestModal(!testModal) }}>
                    <Text style={{color:'#fff', fontSize:25, fontWeight:'bold'}}>LOGIN</Text>
                </Button>
                <Button transparent onPress={()=>{Actions.waiter_login()}}>
                    <Text style={{color:colors.main, fontSize:13, fontWeight:'bold'}}> {'<--WAITERS-->'} </Text>
                </Button>
            </View>
            <View style={styles.footer}>
                <Button transparent onPress={()=>{
                   
                    setLoginModal(true)
                    setRegister(true)
                }}>
                    <Text style={{color:colors.main, fontSize:17}}>create your account here!</Text>
                </Button>
            </View>
            </View>

            {/* the modal */}
        
            <MyModal 
               coverScreen={true}
                isVisible={testModal}
               swipeDirection={['left', 'right', 'down']}
               coverScreen={false}
                animationOut="slideOutDown"
                animationIn="slideInUp"
                animationOutTiming={700}
                animationInTiming={800}
               onBackdropPress={()=>{setTestModal(false)}}
               onSwipeComplete={()=>{setTestModal(false)}}
               style={{justifyContent: 'flex-end',margin:0, zIndex:3}}
               avoidKeyboard={true}
               
            >
                <View style={{height:'85%', backgroundColor:'#fff', borderTopStartRadius:20, borderTopEndRadius:20}}>

                <View style={styles.modelBody}>
                    <View style={styles.upperBody}>

                    </View>
                    <View style={styles.midBody}>
                        <Content style={styles.form} contentContainerStyle={{alignItems:'center'}}>
                            <Item style={{marginVertical:17, borderRadius:12}}  >
                                <Input 
                                style={{borderWidth:2, borderRadius:13, borderColor:colors.main}}
                                autoCompleteType='email' 
                                autoCapitalize='none' 
                                contextMenuHidden={true} 
                                keyboardType="email-address"  
                                placeholder='Email ' 
                                onChangeText={(text)=>{
                                    setEmail(text)
                                }}
                                />
                            </Item>
                            <Item style={{marginVertical:17, borderRadius:12}}  >
                                <Input 
                                style={{borderWidth:2, borderRadius:13, borderColor:colors.main}}
                                placeholder='Password ' 
                                onChangeText={(text)=>{
                                    setPassword(text)
                                }}
                                secureTextEntry={true}
                                />
                            </Item>
                            <Button disabled={isLoading?true:false} style={{...styles.loginButtons, backgroundColor:colors.main}} onPress={LoginFunction}>
                               {isLoading?<ActivityIndicator/>: <Text style={{color:'#fff', fontSize:19, fontWeight:'bold'}}>LOGIN</Text>}
                            </Button>
                            <Button style={{...styles.loginButtons, backgroundColor:'#2680EB'}} onPress={()=>{}}>
                                <Text style={{color:'#fff', fontSize:19, fontWeight:'bold'}}>Facebook</Text>
                            </Button>
                        </Content>
                    </View>
                    <View style={styles.lowerBody}>

                    </View>
                </View>


                </View>

            </MyModal>
        </View>


       
    )
}

const styles = StyleSheet.create({
    form:{
        width:'87%',
        padding:12,
        
    },
    upperBody:{
        height:'20%',
        // backgroundColor:'yellow'
    },
    midBody:{
        height:'70%',
        // backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center'
    },
    lowerBody:{
        height:'10%'
    },
    modelBody:{
        flex:1
    },
    footer:{
        height:'15%',
        alignItems:'center',
        justifyContent:'center',
        paddingBottom:15
    },
    loginButton:{
        width:'40%',
        justifyContent:'center',
        backgroundColor:colors.main
    },
    loginButtons:{
        width:'50%',
        justifyContent:'center',
        marginVertical:10,
    },
    imgContainer:{
        width:150,
        height:150,
        shadowColor: "#000",
        shadowOffset: {width: 0,height: 2,},
        shadowOpacity: 0.39,
        shadowRadius: 8.4,
        zIndex:0,
        borderRadius:90,
        elevation: 13,
    },
    img:{
        width:'100%',
        height:'100%'  
    },
    body:{
        
        height:'50%',
        alignItems:'center',
        justifyContent:'center',

    },
    logo:{
        height:'40%',
        justifyContent:'center',
        alignItems:'center',
        
    },
    container:{
        flex:1,
        
    }

})

export default  WelcomPage
