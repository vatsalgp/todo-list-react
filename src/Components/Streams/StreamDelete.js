import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../Actions";

class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderDelete() {
        return (
            <button
                className="ui button negative"
                onClick={() => this.props.deleteStream(this.props.match.params.id)}//
            >Delete</button>
        );
    }

    renderCancel() {
        return <Link to="/" className="ui button">Cancel</Link>;
    }

    renderActions() {
        return (
            <div>
                {this.renderDelete()}
                {this.renderCancel()}
            </div>
        );
    }

    renderContent() {
        if (!this.props.stream) {
            return "Are you sure you want to delete this stream ?";
        } else {
            return "Are you sure you want to delete the stream with title: " + this.props.stream.title + " ?";
        }
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>;
        } else if (this.props.isSignedIn && this.props.stream.userId === this.props.currentUserId) {
            return (
                < Modal
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push("/")}
                />
            );
        } else {
            return (
                < Modal
                    title="Delete Stream"
                    content={"You don't have access to delete this Stream"}
                    actions={this.renderCancel()}
                    onDismiss={() => history.push("/")}
                />
            );
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

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);