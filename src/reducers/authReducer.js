const defaultState = {
    token: '',
    user: '',
};

const authReducer = (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
    case 'SIGN_IN':
        newState.token = action.payload.credential.accessToken;
        newState.user = action.payload.additionalUserInfo.username;
        localStorage.setItem('token', newState.token);
        localStorage.setItem('user', newState.user);
        return newState;
    case 'SIGN_OUT':
        newState.token = '';
        localStorage.setItem('token', '');
        localStorage.setItem('user', '');
        return newState;
    default:
        return state;
    }
};

export default authReducer;
