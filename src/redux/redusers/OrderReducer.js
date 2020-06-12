const initialState ={
    allOrders : [],
    currentOrder:{
        client:null,
        table:null,
        products:[],
        sum:0
       
    },
    isLoading:false,
    order:null,
    message:"",
    
}

export default (state=initialState, action)=>{
    switch(action.type){
  
        case "LOADING_ORDER":
            return Object.assign({}, state, {isLoading:true})
        case "GET_ORDERS":
            return Object.assign({}, state, {allOrders:action.orders, isLoading:false})
        case "CUSTOMER_UPDATE_ORDER":
            var order = {
                            client:action.currentOrder.client,
                            table:action.currentOrder.table, 
                            products:action.currentOrder.products,
                            sum:action.currentOrder.sum
                          
                        }
           
            return Object.assign({}, state, {currentOrder:order})
        case "SEND_ORDER":
            const newOrder = {table:state.currentOrder.table, client:state.currentOrder.client, products:[], sum:0}
            return Object.assign({}, state, {allOrders:action.orders, currentOrder:newOrder, isLoading:false})

        case "STOP_LOADING":
            return Object.assign({}, state, {isLoading:false})
        case "GET_ORDER_TO_PAY":
            return Object.assign({}, state, {order:action.payload, isLoading:false})
        case "ACCEPT_ORDER":
            return Object.assign({},state, {order:null, isLoading:false, message:action.payload})
        default:
            return state

    }

}