import {LOGIN ,SIGNUP, LOADING_AUTH, ERROR_AUTH} from '../actions/Auth'
const initialState = {
    user:null,
    error:null,
    isLoading:false,
    
}

export default (state = initialState, action)=>{
    switch (action.type) {
        case LOADING_AUTH:
          return {
            user:null,
            error:null,
            isLoading:true,
          }
        case LOGIN:
           // initialState.user = action.user
          return {
            user: action.user,
            error: null,
            isLoading:false
          };
        case SIGNUP:
           
          return Object.assign({}, state,{
            user: action.user,
            error: null,
            isLoading:false,
          }
          );

        case ERROR_AUTH:
          return {
            user:null,
            error:action.error,
            isLoading:false,
          }
        default:
          return state;
      }
}