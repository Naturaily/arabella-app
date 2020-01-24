import * as firebase from 'firebase';

// const apiUrl = process.env.REACT_APP_API_URL;

export const signIn = () => (dispatch) => {
    const provider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        // var user = result.user;
        dispatch({
            type: 'SIGN_IN',
            payload: token,
        });
        console.log(result);
    }).catch((error) => {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        console.log(error);
    });
};

export const signOut = () => (dispatch) => {
    return firebase.auth().signOut()
        .then((result) => {
            dispatch({
                type: 'SIGN_OUT',
            });
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
};

// export const validate = () => (dispatch) => {
//     return firebase.auth().onAuthStateChanged((user) => {
//         if (user) {
//             console.log(user);
//         } else {
//             console.log(false);
//         }
//     });
// };
