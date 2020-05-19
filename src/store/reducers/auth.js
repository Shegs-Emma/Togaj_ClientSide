import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: null,
    submitted: null
}

const authStart = (state, action) => {
    return updateObject(state, {error: false, loading: true, submitted: false});
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
        submitted: true
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        submitted: false
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
        submitted: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case (actionTypes.AUTH_START): return authStart(state, action);
        case (actionTypes.AUTH_SUCCESS): return authSuccess(state, action);
        case (actionTypes.AUTH_FAIL): return authFail(state, action);
        case (actionTypes.AUTH_LOGOUT): return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;