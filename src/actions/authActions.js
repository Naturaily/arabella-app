import * as firebase from 'firebase';

export const signIn = () => (dispatch) => {
    dispatch({
        type: 'RESET_ERRORS',
    });
    const provider = new firebase.auth.GithubAuthProvider().addScope('repo');
    return firebase.auth().signInWithPopup(provider)
        .then((result) => {
            localStorage.setItem('token', result.credential.accessToken);
            localStorage.setItem('user', result.additionalUserInfo.username);
            dispatch({
                type: 'SIGN_IN',
                payload: result,
            });
        }).catch(() => {
            dispatch({
                type: 'SIGN_IN_ERROR',
            });
        });
};

export const signOut = () => (dispatch) => {
    dispatch({
        type: 'RESET_ERRORS',
    });
    return firebase.auth().signOut()
        .then(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            dispatch({
                type: 'SIGN_OUT',
            });
        })
        .catch(() => {
            dispatch({
                type: 'SIGN_OUT_ERROR',
            });
        });
};
