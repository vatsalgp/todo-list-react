import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchtodos } from "../../Actions"

class todoList extends React.Component {
    componentDidMount() {
        this.props.fetchtodos();
    }

    renderAdmin = (id, todo) => {
        if (this.props.isSignedIn && todo.userId === this.props.currentUserId) {
            return (
                <div className="right floated button">
                    <Link to={"/edit/" + id} className="ui button primary">EDIT</Link>
                    <Link to={"/delete/" + id} className="ui button negative">DELETE</Link>
                </div>
            );
        }
    }

    renderItem = (key, val) => {
        if (val) {
            return (
                <div className="item" key={key}>
                    {this.renderAdmin(key, val)}
                    <i className="large middle aligned icon book" />
                    <div className="content">
                        <div className="header">
                            {val.title}
                        </div>
                        <div className="description">
                            {val.description}
                        </div>
                    </div>
                </div >
            );
        }
    }

    renderList() {
        const list = [];
        for (const key in this.props.todos) {
            list.push(this.renderItem(key, this.props.todos[key]))
        }
        return list;
    }

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: "right" }}>
                    <Link to="/new" className="ui button primary">
                        Create todo
                    </Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h2>Todos</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        todos: state.todos,
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchtodos })(todoList);