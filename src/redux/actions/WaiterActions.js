import {url} from '../config/Config'


export const selectTable =(table)=>{
    return (dispatch, getState)=>{
        const orders = table.order_set
        dispatch({type:"SLECT_TABLE", orders:orders, table:table})

    }
}

export const selectOrder = order=>{
    return(dispatch, getState)=>{
  
        dispatch({type:"ORDER_SELECT_PRODUCT", products_in_order:order.selectedproduct_set, order:order})
    }
}

export const changeOrderStatus = (id, order) =>{
    return async (dispatch, getState)=>{
        const token = getState().auth.user.token
        dispatch({type:"LOADING_WAITER_APP"})
        const response = await fetch(url+'/api/orders/update/'+id,
            {
                method:"PUT",
                headers:{
                    "Authorization": `Token ${token}`,
                    'Content-Type': 'application/json'
                    
                },
                body:JSON.stringify({
                    status:order.status,
                    time:order.time,
                  
                }),
                
               
            }    
        )


        if(response.ok){
            const message = await response.json()
            console.log(message)
            dispatch({type:"UPDATE_ORDER", payload:message})
        }else{
            const message = await response.json()
            console.log(message)

        }
    }
}

export const getProductsFromOrder=(id)=>{
    return async (dispatch, getState)=>{
        console.log("The id"+id)
        const token = getState().auth.user.token
        dispatch({type:"LOAD_WAITER_APP"})
        const response = await fetch(url+'/api/orders/products/'+id,
        {
            method:"GET",
            headers:{
                "Authorization": `Token ${token}`
            }
        }
               
        )

        if(response.ok){
            const data = await response.json()
            dispatch({type:"PRODUCTS_IN_ORDER", payload:data})
            console.log(data)
        }else{
            dispatch({type:"STOP_LOADING"})
            const data = await response.json()
            console.log(data)

        }
    }
}

// export const 

export const loadTables =(id)=>{

    return async (dispatch, getState)=>{
        const token = getState().auth.user.token
        dispatch({type:"LOAD_WAITER_APP"})
        // https://smart-waiter.herokuapp.com/api/orders/
        const response = await fetch(url+'/api/orders/',
            {
                method:"GET",
                headers:{
                    "Authorization": `Token ${token}`
                }
            }
        )

        if (response.ok){
           

            const data = await response.json()
            dispatch({type:"LOAD_TABLES", payload:data})
            console.log(data)
        }else{
            dispatch({type:"STOP_LOADING"})
            const data = await response.json()
            console.log(data)
        }

    }

} 

export const get_your_orders=()=>{
    return async(dispatch,getState)=>{
        const token = getState().auth.user.token
        dispatch({type:"LOAD_WAITER_APP"})
        const response = await fetch(url+'/api/orders/waiter/',{
            method:"GET",
            headers:{
                Authorization: `Token ${token}`
            }
        })

        if (response.ok){
           

            const data = await response.json()
            dispatch({type:"ORDERS_FOR_YOU", payload:data})
            console.log(data)
        }else{
            dispatch({type:"STOP_LOADING"})
            const data = await response.json()
            console.log(data)
        }
    }
}