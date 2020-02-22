import React from "react";
import { Router, Route } from "react-router-dom";

import Header from "./Header";
import TodoCreate from "./Todos/TodoCreate";
import TodoEdit from "./Todos/TodoEdit";
import TodoDelete from "./Todos/TodoDelete";
import TodoList from "./Todos/TodoList";
import history from "../history";

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header />
                    <Route path="/" exact component={TodoList} />
                    <Route path="/new" exact component={TodoCreate} />
                    <Route path="/edit/:id" exact component={TodoEdit} />
                    <Route path="/delete/:id" exact component={TodoDelete} />
                </div>
            </Router>
        </div>
    );
};

export default App;