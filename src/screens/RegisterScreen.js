import React, {useState, useEffect} from 'react'
import { Button, Content, Input, Item, Form, Label, } from 'native-base';
import { View,
         StyleSheet, Image,
          ImageBackground, Text, ActivityIndicator,
          Keyboard, TouchableWithoutFeedback , TextInput
        } from 'react-native'
import {Actions} from 'react-native-router-flux'
import {useDispatch, useSelector} from 'react-redux'
import * as AuthActions from '../redux/actions/Auth'

//import InputComp from '../components/InpText'




const RegisterScreen = props => {
    // variables 
    const user = useSelector(state=>state.auth.user)
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("USER")
    const isLoading = useSelector(state=>state.auth.isLoading)

    const inputName =(name)=>{
        setName(name)
    }
    const inputPassword = (password)=>{
        setPassword(password)
        
    }
    const inputEmail = (email)=>{
        setEmail(email)
        
    }
    const login =()=>{
        Actions.pop()
    }
    useEffect(()=>{
        if (user!==null){
            Actions.home()

           } 

    }, [user])

    const regHandler = ()=>{
        let action;
          action = AuthActions.signup(
                        name,
                        email,
                        password

                    )
                    try{
                        if(user==null){
                        dispatch(action)
                        }

                    }catch(err){

                    }
                     
                   
    }


    return (
        
       
       <View style={styles.container}>
           <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
        <ImageBackground source={require('../assets/images/bg5.jpg')} style={styles.bgImage}  >
            {/* <ImageBackground source={{uri:"https://imgflip.com/gif/3wqr34"}} style={styles.bgImage}> */}
            <View style={styles.logo}>
                    <Image source={require('../assets/images/logo.png')} style={{ width: 100, height: 100, marginVertical: 30, marginHorizontal: 140, }} />

                </View> 
           
           
                <View style={styles.form}>
            <Content>
            <Form style={{ marginVertical:40}}>
            
                {/* <View style={styles.form}> */}
               
                            <Item floatingLabel style={styles.Input}>
                                <Label style={styles.label}>Email</Label>
                                
                                <Input selectionColor="#ffffff" keyboardType='email-address'  style={styles.inputBorder}  onChangeText={inputEmail}  />
                                    {/* <Field name="email"  keyboardType='email-address' style={styles.inputBorder}  onChangeText={inputEmail}   component={renderTextInput} /> */}
                            </Item>
                            <Item floatingLabel style={styles.Input}>
                                <Label style={styles.label}>Username</Label>
                                
                                <Input selectionColor="#ffffff" defaultValue={name}  style={styles.inputBorder}  onChangeText={inputName}  />
                                    {/* <Field name="email"  keyboardType='email-address' style={styles.inputBorder}  onChangeText={inputEmail}   component={renderTextInput} /> */}
                            </Item>
                            
                            <Item floatingLabel style={styles.Input}>
                                <Label style={styles.label}>Password</Label>
                                <Input selectionColor="#ffffff"  style={styles.inputBorder}  onChangeText={inputPassword} secureTextEntry={true}  />
                                {/* <Field name="password"  /> */}
                            </Item> 
                            {!isLoading? 
                             <Button block light  style={styles.button} onPress={regHandler}>
                                <Text  style={{fontSize:17, color:'black'}}>Register</Text>
                            </Button>:
                             <Button block light disabled  style={styles.button} onPress={regHandler}>
                                <ActivityIndicator />
                            </Button>
                            }

                            
                                  
                {/* </View> */}
                </Form>
                </Content> 
               </View>
                
                <View style={{ justifyContent:'flex-end', alignItems:'center', height:'12%'}}>
                <Button transparent style={styles.registerLin} onPress={login}>
                                <Text style={{fontSize:17, color:'#ffffff' }}>Login if you already have an account.</Text>
                            </Button>
                           
                </View>
       
               
        
        
            </ImageBackground>
            </TouchableWithoutFeedback>

       </View>
        
           
           
       



    )
}


const styles = StyleSheet.create({
    bgImage: {
        width: '100%',
        height: '100%'
        // height:400,
        // width:"100%"
    },
    logo: {
        height:'25%'
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
        //backgroundColor: 'rgba(255, 255, 255, 0.3)',
        height:'60%',
        width: '100%',
        //marginHorizontal: '2%',
        marginVertical: 10


    }
    ,

    Input: {
        width: '100%',
       // marginHorizontal:'2%',
       // marginVertical:'2%',
        borderBottomColor:'#ffffff',
        borderBottomWidth:2,
       
       
        
    },
    myForm: {
        flex: 1,
        width: "100%",
        marginVertical: 70,
        justifyContent:'center'


    },
    inputBorder:{
        color:'white',
        fontSize:20,
       
      //  borderBottomColor:'#D7DB46',
        
    }
    ,
    label:{
        color:'#ffffff',
        fontSize:18,
        fontWeight:'bold'
    },
    button:{
        marginVertical:40,
        width:'100%',
       // marginHorizontal:'4%',
        //backgroundColor:'#ffffff',
    }
});

export default RegisterScreen
// export default ContactForm = reduxForm({
//     // a unique name for the form
//     form: 'register'
//   })(RegisterScreen)