const defaultState = {
    token: '',
    signedIn: false,
};

const authReducer = (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
    case 'SIGN_IN':
        newState.token = action.payload;
        newState.signedIn = true;
        localStorage.setItem('token', action.payload);
        return newState;
    case 'SIGN_OUT':
        newState.token = '';
        newState.signedIn = false;
        localStorage.setItem('token', '');
        return newState;
    // case 'VALIDATE':
    //     // newState.heroesArray = action.payload;
    //     // newState.requestPending = false;
    //     return newState;
    default:
        return state;
    }
};

export default authReducer;
