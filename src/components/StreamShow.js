import React from "react";
import flv from "flv.js";

const baseURL = process.env.REACT_APP_BACKEND;

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  state = {
    stream: "",
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
    console.log(this.props.location.state.stream);
    console.log(this.state);
    return (
      <div>
        <h1>Welcome To the Stream</h1>
        <video ref={this.videoRef} style={{ width: "100%" }} controls={true} />
        <h1>{this.state.stream.title}</h1>
        <p>{this.state.stream.description}</p>
      </div>
    );
  }
}

export default StreamShow;
