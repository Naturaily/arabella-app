const defaultState = {
    token: '',
    user: '',
    signInError: false,
    signOutError: false,
};

const authReducer = (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
    case 'SIGN_IN':
        newState.signInError = false;
        newState.token = action.payload.credential.accessToken;
        newState.user = action.payload.additionalUserInfo.username;
        return newState;
    case 'SIGN_IN_ERROR':
        newState.signInError = true;
        return newState;
    case 'SIGN_OUT':
        newState.signOutError = false;
        newState.token = '';
        return newState;
    case 'SIGN_OUT_ERROR':
        newState.signOutError = true;
        return newState;
    default:
        return state;
    }
};

export default authReducer;
