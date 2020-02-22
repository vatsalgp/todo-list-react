import React from "react";
import { connect } from "react-redux";

import StreamForm from "./StreamForm";
import { fetchStream, editStream } from "../../Actions";

class StreamEdit extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>;
        } else if (this.props.isSignedIn && this.props.stream.userId === this.props.currentUserId) {
            return (
                <div>
                    <h3>Edit a Stream</h3>
                    <StreamForm
                        onSubmit={this.onSubmit}
                        initialValues={{
                            title: this.props.stream.title,
                            description: this.props.stream.description
                        }}
                    />
                </div>
            );
        } else {
            return <h1>You don't have access to edit this Stream</h1>;
        }

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);