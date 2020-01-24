import React from 'react';

import { connect } from 'react-redux';

import { signOut } from '../actions/authActions';

const Repos = (props) => {
    return (
        <>
            <button onClick={props.signOut}>Sign out</button>
        </>
    );
};

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Repos);
