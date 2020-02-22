import React from "react";
import { Link } from "react-router-dom";

import GoogleAuth from "./GoogleAuth";

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item ui header">
                Streams
            </Link>
            <div className="right menu" style={{ margin: "auto 0" }}>
                <GoogleAuth />
            </div>
        </div>
    );
};

export default Header;