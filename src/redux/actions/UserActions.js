import axios from 'axios'

import {url} from '../config/Config'
export const editProfile = (display_name, profile_picture, phone, gender ) =>{
    
    let formData = new FormData();
    formData.append('profile_picture', profile_picture);
    
    return async (dispatch, getState)=>{
      dispatch({type:'PROFILE_LOADING'})
        const token = getState().auth.user.token
        //console.log(profile_picture)
        formData.append('display_name', display_name)
        formData.append('phone', phone)
        formData.append('gender', gender)
       
        
        const response = await fetch(url+'/api/client/profile', {
            method: 'POST',
            body: formData,
            headers: {
              'content-type': 'multipart/form-data',
              'Authorization' : `Token ${token}`
            },
          })
          await response.json().then((data)=>{
                console.log(data)
                dispatch({type:'UPDATE_PROFILE', payload:data})
          })
              
              

          
       


    
 }
}

export const getProfileData =()=>{
    
    return ( dispatch, getState) =>{
        
        const token = getState().auth.user.token
        dispatch({type:'PROFILE_LOADING'})
        axios.get(url+'/api/client/profile', 
        
        {
            headers: {
              'Authorization': `Token ${token}`
            }
        }
        ).then(
            function(response){
              // alert(response.data.table)
                console.log(response.data)
                dispatch({type:'GET_PROFILE_DATA', payload:response.data})
               // alert("Welcome to ell at home")

            }
        ).catch(function(err){
            alert(err.response.data.error+" yes we have an error")
            dispatch({type:"ERROR_PROFILE", payload:err.response.data})
        })

        }

    }
