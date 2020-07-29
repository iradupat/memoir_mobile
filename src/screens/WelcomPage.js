import React, {useState, useEffect, useCallback} from 'react'
import {View, Text,Modal, StyleSheet, Image, ActivityIndicator, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native'
import {Header, Left, Right, Button, Input, Icon, Body, Content, Item} from 'native-base'
import {colors} from '../redux/config/Config'
import {Actions} from 'react-native-router-flux'
import {useDispatch, useSelector} from 'react-redux'
import * as AuthActions from '../redux/actions/Auth'
import  MyModal from 'react-native-modal'
import { MaterialIcons, Entypo, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const WelcomPage = props =>{
    const [registerModal, setregisterModal] = useState(false)
    const [waiterLogin,setWaiterLogin] = useState(false)
    const dispatch = useDispatch();   
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const user = useSelector(state=>state.auth.user)
    const isLoading = useSelector(state=>state.auth.isLoading)
    const [testModal, setTestModal ] = useState(false)
    const [valid, setValid] = useState(true)
    const [canSee, setCanSee] = useState(false)
    const [userProfile, setUserProfile] = useState({
        email:"",
        password:"",
        name:""
    })
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

     const validateEmail =()=>{
         const test = email.search(/[@]/)
            if(test==-1 || email==""){
                setValid(false)
            }
     }


     const register =() =>{
            console.log(userProfile)
            dispatch(AuthActions.signup(userProfile.name, userProfile.email, userProfile.password))
     }

     useEffect(()=>{

        if (user!==null){ 
            setTestModal(false)
            setregisterModal(false) 
            if(user.isClient){
                Actions.home()
               
                // setregisterModal(false)
                
            }else{
                if (user.isWaiter){
                    Actions.waiter_home()
                }
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
                   
                    setregisterModal(true)
                   
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
                        <TouchableWithoutFeedback style={styles.form} contentContainerStyle={{alignItems:'center'}} onPress={()=>{Keyboard.dismiss()}}>
                            <View style={{flex:1, alignItems:'center', margin:12}}>
                            <View style={{marginVertical:8 ,flexDirection:'row', alignItems:'center' ,width:'100%', height:50, borderRadius:10, borderColor:'grey', borderWidth:1}}>
                                    <TextInput 
                                        placeholder="Email address"
                                        autoCompleteType='email'
                                        keyboardType="email-address"  
                                        autoCapitalize='none' 
                                        style={{width:'85%', height:45, paddingHorizontal:12}}
                                        onChangeText={(text)=>{
                                            setEmail(text)
                                        }}

                                    />
                                    <View style={{width:'15%', alignItems:'center'}}>
                                    <MaterialIcons name="email" size={24} color={colors.main} />
                                    </View>
                                    
                            </View>

                            <View style={{marginVertical:8,flexDirection:'row', alignItems:'center' ,width:'100%', height:50, borderRadius:10, borderColor:'grey', borderWidth:1}}>
                                    <TextInput 
                                        placeholder="Password"
                                        secureTextEntry={canSee}
                                        autoCapitalize='none' 
                                        style={{width:'85%', height:45, paddingHorizontal:12}}
                                        onChangeText={(text)=>{
                                            setPassword(text)
                                        }}

                                    />
                                    <View style={{width:'15%', alignItems:'center'}}>
                                        <Button transparent onPress={()=>{
                                            setCanSee(!canSee)

                                        }}>
                                        {canSee?
                                    <Entypo name="eye" size={24} color={colors.main} />:
                                    <Entypo name="eye-with-line" size={24} color={colors.main} />
                                    }
                                    </Button>
                                    </View>
                                    
                            </View>
                            {/* <Item style={{marginVertical:17, borderRadius:12}}  >
                                <Input 
                                style={{borderWidth:1, borderRadius:13, borderColor:'#000'}}
                                autoCompleteType='email' 
                                autoCapitalize='none' 
                                contextMenuHidden={true} 
                                keyboardType="email-address"  
                                placeholder='Email ' 
                                onChangeText={(text)=>{
                                    setEmail(text)
                                }}
                            />
                            </Item> */}
                            {/* <Item style={{marginVertical:17, borderRadius:12}}  >
                                <Input 
                                style={{borderWidth:1, borderRadius:13, borderColor:'#000'}}
                                placeholder='Password ' 
                                onChangeText={(text)=>{
                                    setPassword(text)
                                }}
                                secureTextEntry={true}
                                />
                            </Item> */}
                            <View style={{marginTop:100 ,width:'90%', flexDirection:'row', justifyContent:'space-evenly'}}>
                            <Button disabled={isLoading?true:false} style={{...styles.loginButtons, backgroundColor:colors.main}} onPress={LoginFunction}>
                               {isLoading?<ActivityIndicator/>: <Text style={{color:'#fff', fontSize:19, fontWeight:'bold'}}>LOGIN</Text>}
                            </Button>
                            <Button style={{...styles.loginButtons, backgroundColor:'#fff'}} onPress={()=>{}}>
                                {/* <Text style={{color:'#fff', fontSize:19, fontWeight:'bold'}}>Facebook</Text> */}
                                {/* <MaterialCommunityIcons name="gmail" size={44} color="#fa2f2f" /> */}
                                <AntDesign name="google" size={34} color="#fa2f2f" />
                            
                            </Button>
                            </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.lowerBody}>

                    </View>
                </View>


                </View>

            </MyModal>


            {/* registration modal */}

            <MyModal 
               coverScreen={true}
                isVisible={registerModal}
               swipeDirection={['left', 'right', 'down']}
               coverScreen={false}
                animationOut="slideOutDown"
                animationIn="slideInUp"
                animationOutTiming={700}
                animationInTiming={800}
               onBackdropPress={()=>{setregisterModal(false)}}
               onSwipeComplete={()=>{setregisterModal(false)}}
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
                                style={{borderWidth:1, borderRadius:13, borderColor:'#000'}}
                                autoCompleteType='email' 
                                autoCapitalize='none' 
                                contextMenuHidden={true} 
                                keyboardType="email-address"  
                                placeholder='Email ' 
                                onChangeText={(text)=>{
                                    setEmail(setUserProfile(Object.assign(userProfile,{},{email:text})))
                                }}
                            />
                            </Item>
                            <Item style={{marginVertical:17, borderRadius:12}}  >
                                <Input 
                                style={{borderWidth:1, borderRadius:13, borderColor:'#000'}}
                           
                                onChangeText={(text)=>{
                                    setUserProfile(Object.assign(userProfile,{},{name:text}))
                                }}
                                placeholder="User Name"
                                />
                            </Item>
                            <Item style={{marginVertical:17, borderRadius:12}}  >
                                <Input 
                                style={{borderWidth:1, borderRadius:13, borderColor:'#000'}}
                                placeholder='Password ' 
                                onChangeText={(text)=>{
                                    setPassword(setUserProfile(Object.assign(userProfile,{},{password:text})))
                                }}
                                secureTextEntry={true}
                                />
                            </Item>
                            <Button disabled={isLoading?true:false} style={{...styles.loginButtons, backgroundColor:colors.main}} onPress={register}>
                               {isLoading?<ActivityIndicator/>: <Text style={{color:'#fff', fontSize:19, fontWeight:'bold'}}>SIGNUP</Text>}
                            </Button>
                          
                        </Content>
                    </View>
                    <View style={styles.lowerBody}>

                    </View>
                </View>


                </View>

            </MyModal>
            {/* Waiter login */}

            <MyModal 
               coverScreen={true}
                isVisible={waiterLogin}
               swipeDirection={['left', 'right', 'down']}
               coverScreen={false}
                animationOut="slideOutDown"
                animationIn="slideInUp"
                animationOutTiming={700}
                animationInTiming={800}
               onBackdropPress={()=>{setWaiterLogin(false)}}
               onSwipeComplete={()=>{setWaiterLogin(false)}}
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
                                style={{borderWidth:1, borderRadius:13, borderColor:'#000'}}
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
                                style={{borderWidth:1, borderRadius:13, borderColor:'#000'}}
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
        width:'97%',
        padding:12,
        
    },
    upperBody:{
        height:'5%',
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
        // width:'50%',
        justifyContent:'center',
        marginVertical:10,
        alignItems:'center',
        width:120,
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
        
        height:'47%',
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
