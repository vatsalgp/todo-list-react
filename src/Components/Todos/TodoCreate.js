import React from "react";
import { connect } from "react-redux";

import TodoForm from "./TodoForm";
import { createtodo } from "../../Actions";

class todoCreate extends React.Component {
    render = () => {
        if (this.props.isSignedIn) {
            return (
                <div>
                    <h3>Create a todo</h3>
                    <TodoForm onSubmit={this.props.createtodo} />
                </div>
            );
        }
        else {
            return <h1>Sign In to Create a todo</h1>;
        }
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { createtodo })(todoCreate);
