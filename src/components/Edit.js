import React from "react";
import Input from "./Input";
import "./Form.css";

const baseURL = process.env.REACT_APP_BACKEND;

class Edit extends React.Component {
  state = {
    stream: {},
    title: "",
    description: "",
  };

  getStream() {
    this.setState({
      stream: this.props.location.state.stream,
    });
  }

  componentWillMount() {
    this.getStream();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    console.log("form submitted");
    fetch(baseURL + "/streams/" + this.state.stream.id, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error({ Error: error }));
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <h1>Edit</h1>
        <div className="newForm">
          <form>
            <h3>New Title</h3>
            <Input
              className="input"
              handleChange={this.handleChange}
              name={"title"}
              placeholder={"Stream Title"}
              type={"text"}
              value={this.state.title}
              id={"title"}
            />
            <h3>New Description</h3>
            <Input
              className="input"
              handleChange={this.handleChange}
              name={"description"}
              placeholder={"Stream Description"}
              type={"text"}
              value={this.state.description}
              id={"description"}
            />
            <br />
            <button type="button" onClick={this.handleSubmit}>
              Edit Stream
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Edit;
