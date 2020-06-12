import axios from 'axios'
import {url} from '../config/Config'

export const getRestaurants =()=>{
    
    return ( dispatch, getState) =>{
        
        //const token = '5886d9b7d85e661e583386e4c849420c3a416dd7401c6dd5ebb40d637a2a3443'
        dispatch({type:'MAP_LOADING'})
        axios.get(url+'/api/houses/mapp/').then(
            function(response){
               // alert(response.data.table)
                //console.log(response.data)
                dispatch({type:'GET_MAP_DATA', payload:response.data})
               // alert("Welcome to ell at home")

            }
        ).catch(function(err){
            alert(err.response.data.error+" yes we have an error")
            dispatch({type:"MAP_ERROR", payload:err.response.data})
        })

        }

    }
