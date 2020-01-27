import * as firebase from 'firebase';

export const signIn = () => (dispatch) => {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
    return firebase.auth().signInWithPopup(provider).then((result) => {
        dispatch({
            type: 'SIGN_IN',
            payload: result,
        });
    }).catch((error) => {
        console.log({ error });
    });
};

export const signOut = () => (dispatch) => {
    return firebase.auth().signOut()
        .then(() => {
            dispatch({
                type: 'SIGN_OUT',
            });
        })
        .catch((error) => {
            console.log({ error });
        });
};
