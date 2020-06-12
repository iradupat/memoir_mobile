import React, {useState, useEffect, useCallback} from 'react'
import {View, Text,Modal, StyleSheet, Image, ActivityIndicator} from 'react-native'
import {Header, Left, Right, Button, Input, Icon, Body, Content, Item} from 'native-base'
import {colors} from '../redux/config/Config'
import MyModal from '../components/MyModal'
import {Actions} from 'react-native-router-flux'
import {useDispatch, useSelector} from 'react-redux'
import * as AuthActions from '../redux/actions/Auth'

const WelcomPage = props =>{
    const [loginModal, setLoginModal] = useState(false)
    const [register,setRegister] = useState(false)
    const dispatch = useDispatch();   
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const user = useSelector(state=>state.auth.user)
    const isLoading = useSelector(state=>state.auth.isLoading)
    
    const login = ()=>{
     
        setLoginModal(true)
        setRegister(false)

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

    //  if (isLoading){
    //         return(
    //             <View style={styles.container}>
    //                     <ActivityIndicator/>
    //             </View>
    //         )
    //  }
    return(
        <View style={styles.container}>
            <View style={styles.logo}>
                <View style={styles.imgContainer}>
                    <Image source={require('../assets/images/logo.png')} style={styles.img}/>
                </View>
                

            </View>
            <View style={styles.body}>  
                <Button style={styles.loginButton} onPress={login}>
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


            {/* the modal */}
        
            <Modal
                visible={loginModal}
                animationType="slide"
            >
                <Header style={{backgroundColor:'#fff', borderBottomColor:'#fff'}}>
                    <Left style={{padding:15}}>
                        <Button transparent onPress={()=>{setLoginModal(false)}}>
                            <Icon style={{fontSize:45, color:'red'}} type="Ionicons" name="ios-close"/>
                        </Button>
                    </Left>
                    <Body/>
                    <Right/>
                </Header>
                {!register?
                <View style={styles.modelBody}>
                    <View style={styles.upperBody}>

                    </View>
                    <View style={styles.midBody}>
                        <Content style={styles.form} contentContainerStyle={{alignItems:'center'}}>
                            <Item style={{marginVertical:20}}  regular>
                                <Input 
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
                            <Item style={{marginVertical:20}}  regular>
                                <Input 
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
                            <Button style={{...styles.loginButtons, backgroundColor:'#2680EB'}}>
                                <Text style={{color:'#fff', fontSize:19, fontWeight:'bold'}}>Facebook</Text>
                            </Button>
                        </Content>
                    </View>
                    <View style={styles.lowerBody}>

                    </View>
                </View>:
                <View style={styles.modelBody}>
                <View style={styles.upperBody}>

                </View>
                <View style={styles.midBody}>
                    <Content style={styles.form} contentContainerStyle={{alignItems:'center'}}>
                        <Item style={{marginVertical:20}}  regular>
                            <Input 
                            autoCompleteType='email'
                            autoCapitalize='none' 
                            contextMenuHidden={true} 
                            keyboardType="email-address"  
                            placeholder='Email ' 
                            />
                        </Item>
                        <Item style={{marginVertical:20}}  regular>
                            <Input  
                            placeholder='User name ' 
                            autoCapitalize='characters'
                            />
                        </Item>
                        <Item style={{marginVertical:20}}  regular>
                            <Input 
                            placeholder='Password ' 
                            secureTextEntry={true}
                            />
                        </Item>
                        <Button disabled={isLoading?true:false} style={{...styles.loginButtons, backgroundColor:colors.main}}>
                           {isLoading? <ActivityIndicator/>: <Text style={{color:'#fff', fontSize:19, fontWeight:'bold'}}>REGISTER</Text>}
                        </Button>
                        
                    </Content>
                </View>
                <View style={styles.lowerBody}>

                </View>
            </View>}
            </Modal>
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
        width:'45%',
        height:'60%',
        shadowColor: "#000",
        shadowOffset: {width: 0,height: 2,},
        shadowOpacity: 0.39,
        shadowRadius: 8.4,
        // backgroundColor:'red',
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
