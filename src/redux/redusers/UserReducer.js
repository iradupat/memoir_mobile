const initialState ={
    client:null,
    isLoading:false,
    error: null,
    phone:"+250",
    display_name:"Default",
    gender:"",
    profile_picture:"no"
    
    
}

export default (state=initialState, action)=>{
    switch(action.type){
        case 'PROFILE_LOADING':
            return Object.assign({}, state, {isLoading:true})
        case 'GET_PROFILE_DATA':
            return Object.assign({}, state, {client: action.payload, 
                                            
                                            phone:action.payload.phone,
                                            display_name:action.payload.display_name,
                                            gender:action.payload.gender,
                                            profile_picture:action.payload.profile_picture,
                                            isLoading:false, })
        case 'ERROR_PROFILE':
            return Object.assign({}, state, {error: action.payload, isLoading:false})
        case 'UPDATE_PROFILE':
            return Object.assign({}, state, {client: action.payload, 
                                            isLoading:false,
                                            })
        default:
            return state

    }

}
