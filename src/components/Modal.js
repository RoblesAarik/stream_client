import React from "react";
import Input from "./Input.js";

// const baseURL = process.env.REACT_APP_BACKEND;

class Modal extends React.Component {
  state = {
    title: "",
    description: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleUpdate = (event, stream) => {
    this.props.handleUpdate(event, stream);
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
    console.log(this.state);
    return (
      <div>
        <h1>Edit Stream</h1>
        <form onSubmit={this.handleUpdate}>
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

          <input type="submit" value={"Edit stream"} />
        </form>
      </div>
    );
  }
}

export default Modal;
