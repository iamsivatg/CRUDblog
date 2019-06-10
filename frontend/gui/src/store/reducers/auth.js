 import * as actiontype from "../actions/actiontype";
 import { updateObject } from "../utility";

 const InitialState = {
     token : null,
     error : null,
     loading : false
 }
 
const authStart = (state,action) =>{
    return updateObject(state,{
        error:null,
        loading : true
    });
}

const authSucess = (state,action) =>{
    return updateObject(state,{
        token :action.token,
        error:null,
        loading : false
    });
}

const authFail = (state,action) =>{
    return updateObject(state,{
        error: action.error,
        loading : false
    });
}

const authLogout = (state,action) =>{
    return updateObject(state,{
        error:null
    });
}

const reducer = (state=InitialState, action) => {
    switch(action.type){
        case actiontype.AUTH_START : return authStart(state,action);
        case actiontype.AUTH_SUCESS : return authSucess(state,action);
        case actiontype.AUTH_FAIL : return authFail(state,action);
        case actiontype.AUTH_LOGOUT : return authLogout(state,action);
        default:
        return state;  

    }
}

export default reducer;