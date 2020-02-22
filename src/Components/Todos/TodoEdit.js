import React from "react";
import { connect } from "react-redux";

import TodoForm from "./TodoForm";
import { fetchtodo, edittodo } from "../../Actions";

class todoEdit extends React.Component {

    componentDidMount() {
        this.props.fetchtodo(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.edittodo(this.props.match.params.id, formValues);
    }

    render() {
        if (!this.props.todo) {
            return <div>Loading...</div>;
        } else if (this.props.isSignedIn && this.props.todo.userId === this.props.currentUserId) {
            return (
                <div>
                    <h3>Edit a todo</h3>
                    <TodoForm
                        onSubmit={this.onSubmit}
                        initialValues={{
                            title: this.props.todo.title,
                            description: this.props.todo.description
                        }}
                    />
                </div>
            );
        } else {
            return <h1>You don't have access to edit this todo</h1>;
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

export default connect(mapStateToProps, { fetchtodo, edittodo })(todoEdit);