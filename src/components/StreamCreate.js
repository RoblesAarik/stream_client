import React from "react";
import Input from "./Input.js";

const baseURL = process.env.REACT_APP_BACKEND;

class StreamCreate extends React.Component {
  state = {
    title: "",
    description: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = (event, formInputs) => {
    console.log("form submited");
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
    this.props.history.push("/");
  };

  componentWillMount() {
    if (this.props.stream) {
      this.setState({
        title: this.state.title,
        description: this.state.description,
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Start a new Stream</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            handleChange={this.handleChange}
            name={"title"}
            placeholder={"Stream Title"}
            type={"text"}
            value={this.state.title}
            id={"title"}
          />
          <Input
            handleChange={this.handleChange}
            name={"description"}
            placeholder={"Stream Description"}
            type={"text"}
            value={this.state.description}
            id={"description"}
          />
          <input
            type="submit"
            value={this.props.stream ? "Edit stream" : "Create New Stream"}
          />
        </form>
      </div>
    );
  }
}

export default StreamCreate;
