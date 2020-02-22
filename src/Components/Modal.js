import React from "react";
import ReactDOM from "react-dom";

const Modal = props => {
    const Portal = (
        <div
            className="ui dimmer modals visible active"
            onClick={props.onDismiss}
        >
            <div
                className="ui standard modal visible active"
                onClick={e => e.stopPropagation()}
            >
                <div className="header">{props.title}</div>
                <div className="content">{props.content}</div>
                <div className="actions">{props.actions}</div>
            </div>
        </div>
    );
    return ReactDOM.createPortal(Portal, document.querySelector("#modal"));
};

export default Modal;