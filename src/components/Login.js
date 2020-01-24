import React from 'react';

import { connect } from 'react-redux';

import { signIn } from '../actions/authActions';

const Login = (props) => {
    return (
        <section className="login">
            <h1>GitHub App</h1>
            <p>To continue, sign up with your GitHub account</p>
            <img src={require('../assets/github-logo.png')} alt="github icon" />
            <button
                type="button"
                onClick={props.signIn}
            >
                Login with GitHub
            </button>
        </section>
    );
};

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = (dispatch) => ({
    signIn: () => dispatch(signIn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
