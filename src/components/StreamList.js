import React from "react";
import "./StreamList.css";
import { Link } from "react-router-dom";
// import Stream from "./Stream";

const baseURL = process.env.REACT_APP_BACKEND;

class StreamList extends React.Component {
  state = {
    streams: [],
    stream: {},
  };

  getStream = (stream) => {
    this.setState({ stream: stream });
  };

  getStreams() {
    fetch(`${baseURL}/streams`)
      .then((response) => response.json())
      .then((json) => this.setState({ streams: json }))
      .catch((error) => console.log(error));
  }

  handleDelete = (deleteStream) => {
    fetch(`${baseURL}/streams/${deleteStream.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((json) => {
        const streams = this.state.streams.filter(
          (stream) => stream.id !== deleteStream.id
        );
        this.setState({ streams });
      })
      .catch((error) => console.log(error));
  };

  render() {
    console.log(`${baseURL}/streams`);
    console.log(this.state.streams);
    return (
      <div>
        <h1>Current Streams</h1>
        {this.state.streams.map((stream) => (
          <div key={stream.id} className="list">
            <div className="items">
              <Link
                className="stream_title"
                to={{
                  pathname: `/show/${stream.id}`,
                  state: { stream: stream },
                }}
              >
                {stream.title}
              </Link>
              <p>{stream.description}</p>

              <Link
                to={{
                  pathname: `edit/${stream.id}`,
                  state: { stream: stream },
                }}
              >
                <button>Edit</button>
              </Link>
              <button onClick={() => this.handleDelete(stream)}>
                Delete Stream
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  componentDidMount() {
    this.getStreams();
  }
}

export default StreamList;
