import React from "react";
import "./StreamList.css";

const baseURL = process.env.REACT_APP_BACKEND;

class StreamList extends React.Component {
  state = {
    streams: [],
  };

  componentDidMount() {
    this.getStreams();
  }

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
        this.getStreams();
      })
      .catch((error) => console.log(error));
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

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Streams</h1>
        {this.state.streams.map((stream) => (
          <div key={stream.id} className="list">
            <div className="items">
              <h3>{stream.title}</h3>
              <p>{stream.description}</p>
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
