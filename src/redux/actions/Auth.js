export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const ERROR_AUTH = 'ERROR_AUTH'
export const LOADING_AUTH = "LOADING_AUTH";
import {url} from '../config/Config' 
import React from 'react'
import {Alert} from 'react-native'

export const signup = (username,email,password) => {
  return async dispatch => {
    dispatch({type:"LOADING_AUTH"})
    const response = await fetch(
      url+'/api/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          display_name: username,
          email: email,
          password: password, 
        })
      }
    );
    
    if(!response.ok){
       // alert(resData.error)
        await response.json().then((resData)=>{
       console.log(resData);
        Alert.alert(
          'Alert',
           resData.error,
          [
            
            {text: 'OK', onPress: () => {}},
          ],
          {cancelable: false},
        );
        dispatch({type: ERROR_AUTH, error:"Server error"});
        throw new Error("erre");
       // dispatch({error: resData.error })
      })
    }
     
    const respData = await response.json()
      //alert(data.token)
      console.log(respData);
      dispatch({ type: SIGNUP, user:respData });
    // })
  
  };
};

export const loginWaiter =(email, password) =>{
  return async (dispatch)=>{
    dispatch({type:"LOADING_AUTH"})

  }
}

export const login =  (email, password) => {
  return async (dispatch) => {
   dispatch({type:"LOADING_AUTH"})
  //  const re= await fetch('https//stalgia-webserver.herokuapp.com/auth/login/', {method:'POST'})
  //   const data = await re.json()
  // console.log( data)
    const response = await fetch(
      url+'/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          // email: email,
          password: password,
         // password: password
          
        })
      }
    );

    if (!response.ok) {
        let message = 'SOMETHING WENT WRONG'
        let data =await response.json()
       alert(data.error)
       dispatch({type: ERROR_AUTH, error:data.error});
     // throw new Error(message);
    }else{
      
      await response.json().then((data)=>{
        console.log(data)
        dispatch({type: LOGIN, user:data});
      }).catch((err)=>{
        console.log(err)
        alert(err.error)
        dispatch({type: ERROR_AUTH, error:"WAIT"});
        //dispatch({type})

      })
        
      
      
    }
    
   
  };
};
