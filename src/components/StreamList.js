import React from "react";
import "./StreamList.css";
import Modal from "./Modal";
import { Link } from "react-router-dom";
// import Stream from "./Stream";

const baseURL = process.env.REACT_APP_BACKEND;

class StreamList extends React.Component {
  state = {
    streams: [],
    formVisible: false,
    stream: {},
  };

  getStream = (stream) => {
    this.setState({ stream: stream });
    console.log(this.state.stream);
  };

  componentDidMount() {
    this.getStreams();
  }

  toggleForm = (stream) => {
    this.getStream(stream);
    this.setState({
      formVisible: !this.state.formVisible,
    });
    console.log(stream);
  };

  getStreams() {
    fetch(`${baseURL}/streams`)
      .then((response) => response.json())
      .then((json) => this.setState({ streams: json }))
      .catch((error) => console.log(error));
  }

  handleAdd = (event, formInputs) => {
    event.preventDefault();
    fetch(`${baseURL}/streams`, {
      body: JSON.stringify(formInputs),
      method: "POST",
      headers: {
        Accept: "application/json, text,plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((createdStream) => createdStream.json())
      .then((jsonedStream) => {
        this.setState({
          pets: [jsonedStream, ...this.state.streams],
        });
      });
  };

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

  handleUpdate = (event, formInputs) => {
    event.preventDefault();
    fetch(`${baseURL}/streams/${formInputs.id}`, {
      body: JSON.stringify(formInputs),
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((updatedStream) => {
        this.getstream();
      })
      .catch((error) => console.log(error));
  };

  render() {
    console.log(this.state);

    return (
      <div>
        <h1>Streams</h1>
        {this.state.formVisible ? (
          <div className="modal">
            <Modal
              stream={this.state.stream}
              handleSubmit={this.handleUpdate}
            />
            <button onClick={this.toggleForm}>Close</button>
          </div>
        ) : null}
        {this.state.streams.map((stream) => (
          <div key={stream.id} className="list">
            <div className="items">
              <Link
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
}

export default StreamList;
