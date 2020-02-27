import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { signIn as signInAction } from '../actions/authActions';

import logo from '../assets/github-logo.png';

const Login = ({ signIn, authReducer }) => {
  const { signInError } = authReducer;

  return (
    <section className="login">
      <h1>GitHub App</h1>
      <p>To continue, sign up with your GitHub account</p>
      <img src={logo} alt="github icon" />
      <button
        type="button"
        onClick={signIn}
      >
        Login with GitHub
      </button>
      {
        signInError
        && (
          <p className="login-error">Could not sign in. Please, try again later.</p>
        )
      }
    </section>
  );
};

Login.propTypes = {
  signIn: PropTypes.func.isRequired,
  authReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: () => dispatch(signInAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
