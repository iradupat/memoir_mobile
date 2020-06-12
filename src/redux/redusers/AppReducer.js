const initialState ={
    data:null,
    isLoading:false,
    error: null,
    table:null,
    
}

export default (state=initialState, action)=>{
    switch(action.type){
        case 'LOADING':
            return Object.assign({}, state, {isLoading:true})
        case 'GET_DATA':
            return Object.assign({}, state, {data: action.payload, isLoading:false, table:action.payload.table.id})
        case 'ERROR':
            return Object.assign({}, state, {error: action.payload, isLoading:false})
        default:
            return state

    }

}
