import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchTodos } from "../../Actions"

class todoList extends React.Component {
    componentDidMount() {
        if (this.props.isSignedIn) {
            this.props.fetchTodos();
        }
    }

    renderAdmin = (id, todo) => {
        if (this.props.isSignedIn && todo.uid === this.props.uid) {
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
                    <i className="big middle aligned icon book" />
                    <div className="content">
                        <div className="header">
                            {val.title}
                        </div>
                        <div className="description">
                            <span>{val.description}</span>
                            <div className="user">
                                <i className="user icon outline" />
                                {val.name.split(" ")[0]}
                            </div>
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
        uid: state.auth.uid,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchTodos })(todoList);