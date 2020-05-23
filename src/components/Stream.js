import React from "react";

import { Link } from "react-router-dom";

class Stream extends React.Component {
  render() {
    const { stream, handleDelete, toggleForm } = this.props;
    return (
      <>
        <div className="streamInfo">
          <p>{stream.description}</p>
          <button onClick={() => handleDelete(stream)}>Delete Stream</button>
          <button onClick={this.props.toggleForm}>Edit</button>
        </div>
      </>
    );
  }
}

export default Stream;
