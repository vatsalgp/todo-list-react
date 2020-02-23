import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../Modal";
import history from "../../history";
import { fetchTodo, deleteTodo } from "../../Actions";

class todoDelete extends React.Component {

    componentDidMount() {
        this.props.fetchTodo(this.props.match.params.id);
    }

    renderDelete() {
        return (
            <button
                className="ui button negative"
                onClick={() => this.props.deleteTodo(this.props.match.params.id)}//
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
        if (!this.props.todo) {
            return "Are you sure you want to delete this todo ?";
        } else {
            return "Are you sure you want to delete the todo with title: " + this.props.todo.title + " ?";
        }
    }

    render() {
        if (!this.props.todo) {
            return <div>Loading...</div>;
        } else if (this.props.isSignedIn && this.props.todo.userId === this.props.currentUserId) {
            return (
                < Modal
                    title="Delete todo"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push("/")}
                />
            );
        } else {
            return (
                < Modal
                    title="Delete todo"
                    content={"You don't have access to delete this todo"}
                    actions={this.renderCancel()}
                    onDismiss={() => history.push("/")}
                />
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        todo: state.todos[ownProps.match.params.id],
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchTodo, deleteTodo })(todoDelete);