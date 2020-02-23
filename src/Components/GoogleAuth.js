import React from "react";
import { connect } from "react-redux";

import { signIn, signOut } from "../Actions";

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                scope: "email",
                clientId: "265178248810-8pacirgq0bkoaa937nvrq2np7e8gcj21.apps.googleusercontent.com"
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }
    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId(), this.auth.currentUser.get().getBasicProfile().getGivenName());
        } else {
            this.props.signOut();
        }
    }
    renderAuthButton() {
        switch (this.props.isSignedIn) {
            case true:
                return (
                    <button className="ui red google button" onClick={this.auth.signOut}>
                        <i className="google icon" />
                        Sign Out
                    </button>
                );
            case false:
                return (
                    <button className="ui red google button" onClick={this.auth.signIn}>
                        <i className="google icon" />
                        Sign In with Google
                </button>
                );
            default:
                return null;
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