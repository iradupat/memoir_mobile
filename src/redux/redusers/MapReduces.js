const initialState ={
    data:null,
    isLoading:false,
    error: null,
    initial:null
    
    
}

export default (state=initialState, action)=>{
    switch(action.type){
        case 'MAP_LOADING':
            return Object.assign({}, state, { data:null,isLoading:true, error: null,initial:null})
        case 'GET_MAP_DATA':
            let init = action.payload.find(v=>{if(v.isInitialOnMap==true){return v}})
            return Object.assign({}, state, {data: action.payload, isLoading:false, initial:init})
        case 'MAP_ERROR':
            return Object.assign({}, state, {error: action.payload, isLoading:false})
        default:
            return state

    }

}
