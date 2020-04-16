import React from "react";
import { Link } from "react-router-dom";

import SignButton from "./SignButton";

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item ui header">
                Todos
            </Link>
            <div className="right menu" style={{ margin: "auto 0" }}>
                <SignButton />
            </div>
        </div>
    );
};

export default Header;