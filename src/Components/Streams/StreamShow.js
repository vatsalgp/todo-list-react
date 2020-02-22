import React from "react";
import flv from "flv.js";
import { connect } from "react-redux";

import { fetchStream } from "../../Actions";

class StreamShow extends React.Component {

    componentWillMount() {
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer() {
        if (!this.player && this.props.stream) {
            this.player = flv.createPlayer({
                type: "flv",
                url: "http://localhost:8000/live/" + this.props.match.params.id + ".flv"
            });
            this.player.attachMediaElement(this.videoRef.current);
            this.player.load();
        }
    }

    render() {

        const { stream } = this.props;
        if (!stream) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    <video
                        ref={this.videoRef}
                        style={{ width: "100%" }}
                        controls
                    />
                    <h1>{stream.title}</h1>
                    <h5>{stream.description}</h5>
                </div>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);