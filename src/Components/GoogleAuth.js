import React from "react";
import * as firebase from "../firebase";

import { connect } from "react-redux";

import { signIn, signOut } from "../Actions";

class GoogleAuth extends React.Component {

    signIn = async () => {
        const { uid, name } = await firebase.signIn();
        this.props.signIn(uid, name);
    }

    signOut = () => {
        firebase.signOut();
        this.props.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn) {
            return (
                <button className="ui red google button" onClick={this.signOut}>
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button className="ui red google button" onClick={this.signIn}>
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }
    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);