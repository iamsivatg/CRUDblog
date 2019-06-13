import axios from "axios";
import * as actiontype from "./actiontype";

export const authStart = () => {
    return{
        type : actiontype.AUTH_START
    }
}


export const authFail = error => {
    return{
        type : actiontype.AUTH_FAIL,
        error : error
    }
}

export const authSucces = token => {
    return{
        type : actiontype.AUTH_SUCESS,
        token : token
    }
}

export const logout = () =>{
    localStorage.removeItem('user');
    localStorage.removeItem('exdate');
    return{
        type:actiontype.AUTH_LOGOUT
    }

}




export const checkTime = extime =>{
    return dispatch => {
        setTimeout(()=>{
        dispatch(logout());
        }, extime*1000)
    }   

}



export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/login/',{
            username:username,
            password:password
        })

        .then(res =>{
            const token = res.data.key;
            const exdate = new Date(new Date().getTime() + 3600 * 1000 );
            localStorage.setItem('token', token);
            localStorage.setItem('exdate', exdate); 
            dispatch(authSucces(token));
            dispatch(checkTime(3600));

        })
        .catch(err =>{
            dispatch(authFail(err))
        })
    } 
}


export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/registration/',{
            username:username,
            email:email,
            password1:password1,
            password2:password2 
        })

        .then(res =>{
            const token = res.data.key;
            const exdate = new Date(new Date().getTime() + 3600 * 1000 );
            localStorage.setItem('token', token);
            localStorage.setItem('exdate', exdate); 
            dispatch(authSucces(token));
            dispatch(checkTime(3600));

        })
        .catch(err =>{
            dispatch(authFail(err))
        })
    } 
}


export const authCheckState = () =>{
   return dispatch => {
      const token = localStorage.getItem('token');
      if (token ===undefined){
          dispatch(logout());
       } else{
         const expDate = new Date(localStorage.getItem('expDate'));
            if( expDate <= new Date()){
                dispatch(logout());
        } else{
                dispatch(authSucces(token));
                dispatch(checkTime( (expDate.getTime() - new Date().getTime())) / 1000);
            }
            }
        }  
  
    }
