import React from "react";
import Input from "./Input.js";

const baseURL = process.env.REACT_APP_BACKEND;

class Form extends React.Component {
  state = {
    title: "",
    description: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleAdd = (event) => {
    console.log("form submitted");
    fetch(baseURL + "/streams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
      }),
    })
      .then((res) => {
        console.log("res from from", res);
      })
      .catch((error) => console.log(error));
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
    console.log(this.state);
    return (
      <div>
        <h1>Start a new Stream</h1>
        <form onSubmit={this.handleAdd}>
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

          <input type="submit" value={"Create New Stream"} />
        </form>
      </div>
    );
  }
}

export default Form;
