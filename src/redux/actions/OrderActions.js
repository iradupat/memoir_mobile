import axios from 'axios'
import {url} from '../config/Config'

export const updateCurrentOrder =(currentOrder)=>{

    return (dispach, getState)=>{

        dispach({type:"CUSTOMER_UPDATE_ORDER", currentOrder:currentOrder})
    }


}

export const acceptOrder = id =>{

    return async (dispach, getState)=>{
        const token = getState().auth.user.token
        const status = "S"
        dispach({type:"LOADING_ORDER"})
        const response = await fetch(url+'/api/orders/pay/'+id,{
            headers:{
                'Content-Type': 'application/json',
                "Authorization": `Token ${token}`
            },
            method:"PUT"
        })
        if(response.ok){
            const data = await response.json()
            console.log(data)
        }else{
            const data = await response.json()
            console.log(data)
            dispach({type:"STOP_LOADING"})
        }
    }
}

export const getOrder =(id)=>{
    return async (dispach, getState)=>{
        const token = getState().auth.user.token
        dispach({type:"LOADING_ORDER"})
        const response = await fetch(url+'/api/orders/update/'+id,
            {
                method:"GET",
                headers:{
                    "Authorization": `Token ${token}`,

                }
            }
        )
        if(response.ok){
            const data = await response.json()
            dispach({type:"GET_ORDER_TO_PAY", payload:data})
           console.log(data)
        }else{
            const data = await response.json()
            console.log(data)
            dispach({type:"STOP_LOADING"})
        }
    }
}

export const sentOrder = ()=>{
    return  (dispach, getState)=>{
        const token = getState().auth.user.token
        const order = getState().order.currentOrder
        dispach({type:"LOADING_ORDER"})
       
        axios({
                    method:'POST',
                    url:url+"/api/orders/"+order.table, 
                    data:{products:order.products},
                    headers:{
                        "Authorization": `Token ${token}`

                    }
        }
        ).then((response)=>{
            console.log(response.data)
            dispach({type:"SEND_ORDER", orders:response.data})

        }).catch((error)=>{


            if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                /*
                 * The request was made but no response was received, `error.request`
                 * is an instance of XMLHttpRequest in the browser and an instance
                 * of http.ClientRequest in Node.js
                 */
                console.log(error.request);
            } else {
                // Something happened in setting up the request and triggered an Error
                console.log('Error', error.message);
            }
            console.log(error);
            // console.log(error)
            // alert(error)
            dispach({type:"STOP_LOADING"})
        })

    }
}

export const getSum =()=>{
    return(dispach, getState)=>{
        dispach({type:"ORDER_SUM"})
    }
}

export const getTodayOrders =(id) =>{
    return (dispach, getState)=>{
        const token = getState().auth.user.token 
        dispach({type:"LOADING_ORDER"})
        axios({
            method: "GET",
            url: url+"/api/orders/"+id, 
            headers:{
                    'Authorization' : `Token ${token}`
                }
            }
        ).then((response)=>{
            console.log(response.data)
            dispach({type:"GET_ORDERS", orders:response.data})
        }).catch((error)=>{

            if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                /*
                 * The request was made but no response was received, `error.request`
                 * is an instance of XMLHttpRequest in the browser and an instance
                 * of http.ClientRequest in Node.js
                 */
                console.log(error.request);
            } else {
                // Something happened in setting up the request and triggered an Error
                console.log('Error', error.message);
            }
            //console.log(error);
            
            dispach({type:"STOP_LOADING"})
        })

    }
}