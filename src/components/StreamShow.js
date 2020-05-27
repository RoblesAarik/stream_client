import React from "react";
import flv from "flv.js";
import "./StreamShow.css";

const baseURL = process.env.REACT_APP_BACKEND;

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  state = {
    stream: "",
    formVisible: false,
  };

  toggleForm = () => {
    this.setState({
      formVisible: !this.state.formVisible,
    });
  };

  componentDidMount() {
    this.getStream();
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  // componentWillUnmount() {
  //   this.player.destroy();
  // }

  buildPlayer() {
    if (this.player || !this.props.location.state.stream) return;

    const id = this.props.location.state.stream.id;

    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  getStream() {
    fetch(`${baseURL}/streams/${this.props.location.state.stream.id}`)
      .then((response) => response.json())
      .then((json) => this.setState({ stream: json }))
      .catch((error) => console.log(error));
  }

  render() {
    console.log(this.state.stream.id);
    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls={true} />
        <div className="info">
          <h1>{this.state.stream.title}</h1>
          <p>{this.state.stream.description}</p>
        </div>
      </div>
    );
  }
}

export default StreamShow;
