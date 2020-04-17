import React from "react";
import { connect } from "react-redux";

import TodoForm from "./TodoForm";
import { fetchTodo, editTodo } from "../../Actions";

class todoEdit extends React.Component {

    componentDidMount() {
        this.props.fetchTodo(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editTodo(this.props.match.params.id, formValues);
    }

    render() {
        if (!this.props.todo) {
            return <div>Loading...</div>;
        } else if (this.props.isSignedIn && this.props.todo.uid === this.props.currentuid) {
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
        currentuid: state.auth.uid,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchTodo, editTodo })(todoEdit);