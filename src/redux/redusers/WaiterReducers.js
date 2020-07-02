const initialState ={
    tables:[],
    isLoading:false,
    house:null,
    productsinOrder:[],
    message:"",
    selectedOrder:null,
    orders:[],
    tableOrders:[],
    selectedTable:null,
    selectedOrder:null,
    selectedTable:null
   
}


export default (state=initialState, action)=>{
    switch(action.type){
        case "ORDER_SELECT_PRODUCT":
            return Object.assign({}, state, {productsInOrder:action.products_in_order, selectedOrder:action.order})
        case "SLECT_TABLE":
            return Object.assign({}, state, {tableOrders:action.orders, selectedTable:action.table})
        case "LOAD_WAITER_APP":
            return Object.assign({}, state, {isLoading:true})
        case "STOP_LOADING":
            return Object.assign({}, state, {isLoading:false})
        case "LOAD_TABLES":
            return Object.assign({}, state, {isLoading:false, tables:action.payload.tables, house:action.payload.house })
        case "PRODUCTS_IN_ORDER":
            return Object.assign({}, state, {isLoading:false, productsInOrders:action.payload})
        case "UPDATE_ORDER":
            const new_array = state.tableOrders.filter((order)=>{return order.id != action.payload.order.id})
            return Object.assign({}, state, {message:action.payload.message, selectedOrder:null, tableOrders:new_array})
        case "ORDERS_FOR_YOU":
            return Object.assign({}, state, {orders:action.payload.orders, isLoading:false})
        default:
            return state
    }
}