import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        }

        let url = 'http://localhost:3001/api/auth/signup';

        if(!isSignUp){
            url = 'http://localhost:3001/api/auth/login';
        }

        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.token, response.data.userId));
                dispatch(checkAuthTimeout(3600));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    };
}