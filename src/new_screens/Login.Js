import React ,{} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Icon, Content, Item, Input, Button} from 'native-base'
import Modal from 'react-native-modal'


const MyModal =props=>{
    return(
        <Modal 
               
                isVisible={testModal}
               swipeDirection={['left', 'right', 'down']}
               coverScreen={false}
                animationOut="slideOutDown"
                animationIn="slideInUp"
                animationOutTiming={700}
                animationInTiming={800}
               onBackdropPress={()=>{setTestModal(false)}}
               onSwipeComplete={()=>{setTestModal(false)}}
               style={{justifyContent: 'flex-end',margin:0}}
               avoidKeyboard={true}
               
            >
                <View style={{height:'75%', backgroundColor:'#fff', borderTopStartRadius:20, borderTopEndRadius:20}}>

                <View style={styles.modelBody}>
                    <View style={styles.upperBody}>

                    </View>
                    <View style={styles.midBody}>
                        <Content style={styles.form} contentContainerStyle={{alignItems:'center'}}>
                            <Item style={{marginVertical:17, borderRadius:12}}  regular>
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
                            <Item style={{marginVertical:17, borderRadius:12}}  regular>
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
                            <Button style={{...styles.loginButtons, backgroundColor:'#2680EB'}} onPress={()=>{}}>
                                <Text style={{color:'#fff', fontSize:19, fontWeight:'bold'}}>Facebook</Text>
                            </Button>
                        </Content>
                    </View>
                    <View style={styles.lowerBody}>

                    </View>
                </View>


                </View>

            </Modal>
    )
}

const LoginScreen = props=>{
    return(
        <View style={styles.main}>
                <Text>Home</Text>




        </View>

    )

}

const styles =  StyleSheet.create({
    main:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'

    },
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

export default LoginScreen