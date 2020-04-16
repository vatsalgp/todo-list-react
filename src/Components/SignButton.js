import React from "react";

import { connect } from "react-redux";

import { signIn, signOut } from "../Actions";

const SignButton = ({ isSignedIn, signIn, signOut }) => {
    if (isSignedIn)
        return (
            <button className="ui red google button" onClick={signOut}>
                <i className="google icon" />
                    Sign Out
            </button>
        );
    else
        return (
            <button className="ui red google button" onClick={signIn}>
                <i className="google icon" />
                    Sign In with Google
            </button>
        );
};

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { signIn, signOut })(SignButton);