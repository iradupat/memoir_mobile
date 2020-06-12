import axios from 'axios'

import {url} from '../config/Config'




export const reserveTable =(id)=>{
    //id = 8
    return (dispatch, getState) =>{
        const token = getState().auth.user.token
        //const token = '5886d9b7d85e661e583386e4c849420c3a416dd7401c6dd5ebb40d637a2a3443'
        dispatch({type:'LOADING'})
        axios.get(url+'/api/tables/'+id,
        {
            headers: {
              'Authorization': `Token ${token}`
            }
        }
        ).then(
            function(response){
               // alert(response.data.table)
                console.log(response.data)
                dispatch({type:'GET_DATA', payload:response.data})
               // alert("Welcome to "+response.data.house.name+ ", fell at home")
            }
        ).catch(function(err){
            console.log(err.response.data)
            dispatch({type:"ERROR", payload:err.response.data})
        })

        }

    }
