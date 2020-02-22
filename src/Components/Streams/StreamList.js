import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchStreams } from "../../Actions"

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin = (id, stream) => {
        if (this.props.isSignedIn && stream.userId === this.props.currentUserId) {
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
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={"/" + key} className="header">
                            {val.title}
                        </Link>
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
        for (const key in this.props.streams) {
            list.push(this.renderItem(key, this.props.streams[key]))
        }
        return list;
    }

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: "right" }}>
                    <Link to="/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        streams: state.streams,
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);