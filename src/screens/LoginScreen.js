import React, {useState, useEffect} from 'react'
import { Button, Content, Input, Item, Form, Label } from 'native-base';
import { View, StyleSheet, Image, ImageBackground, Text, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import {Actions} from 'react-native-router-flux'
import {useDispatch, useSelector} from 'react-redux'
import * as AuthActions from '../redux/actions/Auth'

const LoginScreen = props => {
    // variables 
    const dispatch = useDispatch();
   
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const user = useSelector(state=>state.auth.user)
    const isLoading = useSelector(state=>state.auth.isLoading)
    //alert(user)
    const inputPassword = (password)=>{
        setPassword(password)
        
    }
    const inputEmail = (email)=>{
        setEmail(email)
        
    }
    useEffect(()=>{
        if (user!==null){
            if(user.isClient){
                Actions.home()
            }
           

           } 

    }, [user])

    const LoginFunction =  ()=>{
       // alert("yes")
       
       try{
        //alert(isLoading)
         dispatch(AuthActions.login(email, password))
          // alert(isLoading) 
          

        }catch(error){
            alert(data)

        }
    }
    
    const signUp =()=>{
       
        Actions.register()
    

    }


    return (
        
        <View style={styles.container}>
            <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>

          
            <ImageBackground source={require('../assets/images/bg3.jpg')} style={styles.bgImage}  >
                <View style={styles.logo}>
                    <Button transparent onPress={()=>{Actions.waiter_login()}}>
                        <Image source={require('../assets/images/logo.png')} style={{ width: 100, height: 100, marginVertical: 30, marginHorizontal: 140, }} />
                    </Button>
                </View>
                <View style={styles.form}>
                    <Content>
                        <Form style={{ marginTop:90}}>
                            <Item floatingLabel style={styles.Input}>
                                <Label style={styles.label}>Email</Label>
                                <Input selectionColor="#ffffff" keyboardType='email-address' value={email} style={styles.inputBorder}  onChangeText={inputEmail}  />
                            </Item>
                            <Item floatingLabel style={styles.Input}>
                                <Label style={styles.label}>Password</Label>
                                <Input selectionColor="#ffffff" style={styles.inputBorder} value={password}  onChangeText={inputPassword} secureTextEntry={true}/>
                            </Item>
                            {isLoading == true?
                            <Button block disabled style={styles.buttonDisabled} onPress={LoginFunction}>
                                <ActivityIndicator/>
                            </Button>
                            :
                            <Button block  style={styles.button} onPress={LoginFunction}>
                                <Text style={{fontSize:17, color:'white'}}>Login</Text>
                            </Button>
                                }
                            
                           
                        </Form>
                    </Content>

                </View>
                <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                
                        <Button transparent style={styles.registerLin} onPress={signUp} >
                                <Text style={{fontSize:17, color:'#D7DB46'}}>Signup here.</Text>
                            </Button>
                    
                </View>
            </ImageBackground>
            </TouchableWithoutFeedback>
        </View>



    )
}

const styles = StyleSheet.create({
    buttonDisabled:{
        marginVertical:40,
        backgroundColor:'#f2f593'
    },
    bgImage: {
        width: '100%',
        height: '100%'
        // height:400,
        // width:"100%"
    },
    logo: {
        height:'20%',
        paddingHorizontal:10,
        paddingTop:55
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',

    },
    registerLink:{ 
        width:'84%',
        marginHorizontal:'8%'
     }
    ,
    form: {
        // backgroundColor: 'rgba(255, 255, 255, 0.3)',
        height:'60%',
        //backgroundColor:'red',
        
        width: '100%',
        //marginHorizontal: '4%',
    


    }
    ,

    Input: {
        width: '100%',
       // marginHorizontal:'5%',
        marginVertical:'5%',
        borderBottomColor:'#D7DB46',
        borderBottomWidth:2,
       
        
    },
    myForm: {
        flex: 1,
        width: "100%",
        marginVertical: 70,


    },
    inputBorder:{
        color:'white',
        fontSize:20,
       
      //  borderBottomColor:'#D7DB46',
        
    }
    ,
    label:{
        color:'#D7DB46',
        fontSize:18,
        fontWeight:'bold'
    },
    button:{
        marginVertical:40,
        width:'100%',
        //marginHorizontal:'4%',
        backgroundColor:'#D7DB46',
    }
});


export default LoginScreen