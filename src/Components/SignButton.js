import React from "react";

import { connect } from "react-redux";

import { signIn, signOut, fetchTodos, clearTodos } from "../Actions";

const SignButton = ({ isSignedIn, signIn, signOut, fetchTodos, clearTodos }) => {
    const logIn = async () => {
        await signIn();
        fetchTodos();
    };
    const logOut = async () => {
        await signOut();
        clearTodos()
    };
    if (isSignedIn)
        return (
            <button className="ui red google button" onClick={logOut}>
                <i className="google icon" />
                    Sign Out
            </button>
        );
    else
        return (
            <button className="ui red google button" onClick={logIn}>
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

export default connect(mapStateToProps, { signIn, signOut, fetchTodos, clearTodos })(SignButton);