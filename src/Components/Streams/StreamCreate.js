import React from "react";
import { connect } from "react-redux";

import StreamForm from "./StreamForm";
import { createStream } from "../../Actions";

class StreamCreate extends React.Component {
    render = () => {
        if (this.props.isSignedIn) {
            return (
                <div>
                    <h3>Create a Stream</h3>
                    <StreamForm onSubmit={this.props.createStream} />
                </div>
            );
        }
        else {
            return <h1>Sign In to Create a Stream</h1>;
        }
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { createStream })(StreamCreate);
