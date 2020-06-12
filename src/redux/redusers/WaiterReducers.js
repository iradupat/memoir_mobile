const initialState ={
    tables:[],
    isLoading:false,
    house:null,
    productsInOrders:[],
    message:"",
    selectedOrder:null
}


export default (state=initialState, action)=>{
    switch(action.type){

        case "LOAD_WAITER_APP":
            return Object.assign({}, state, {isLoading:true})
        case "STOP_LOADING":
            return Object.assign({}, state, {isLoading:false})
        case "LOAD_TABLES":
            return Object.assign({}, state, {isLoading:false, tables:action.payload.table_set, house:action.payload })
        case "PRODUCTS_IN_ORDER":
            return Object.assign({}, state, {isLoading:false, productsInOrders:action.payload})
        case "UPDATE_ORDER":
            return Object.assign({}, state, {message:action.payload.message, selectedOrder:action.payload.order})
        default:
            return state
    }
}