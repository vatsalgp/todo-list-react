import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Header from "./Header";
import StreamCreate from "./Streams/StreamCreate";
import StreamEdit from "./Streams/StreamEdit";
import StreamDelete from "./Streams/StreamDelete";
import StreamShow from "./Streams/StreamShow";
import StreamList from "./Streams/StreamList";
import history from "../history";

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={StreamList} />
                        <Route path="/new" exact component={StreamCreate} />
                        <Route path="/edit/:id" exact component={StreamEdit} />
                        <Route path="/delete/:id" exact component={StreamDelete} />
                        <Route path="/:id" exact component={StreamShow} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;