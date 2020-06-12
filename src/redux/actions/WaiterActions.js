import {url} from '../config/Config'



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
                    time:order.time
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
        const response = await fetch(url+'/api/houses/tables/'+id,
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