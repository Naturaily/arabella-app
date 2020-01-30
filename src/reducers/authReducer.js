const defaultState = {
    token: '',
    user: '',
    signInError: false,
    signOutError: false,
};

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
    case 'SIGN_IN':
        return {
            ...state,
            token: action.payload.credential.accessToken,
            user: action.payload.additionalUserInfo.username,
        };
    case 'SIGN_IN_ERROR':
        return {
            ...state,
            signInError: true,
        };
    case 'SIGN_OUT':
        return {
            ...state,
            token: '',
            user: '',
        };
    case 'SIGN_OUT_ERROR':
        return {
            ...state,
            signOutError: true,
        };
    case 'RESET_ERRORS':
        return {
            ...state,
            signInError: false,
            signOutError: false,
        };
    default:
        return state;
    }
};

export default authReducer;
