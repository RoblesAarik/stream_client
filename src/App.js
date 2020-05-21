import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import StreamCreate from "./components/StreamCreate";
import StreamEdit from "./components/StreamEdit";
import StreamDelete from "./components/StreamDelete";
import StreamList from "./components/StreamList";
import StreamShow from "./components/StreamShow";
import Header from "./components/Header";

class RenderRoutes extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Route path="/" exact component={StreamList} />
          <Route path="/create" exact component={StreamCreate} />
          <Route path="/edit" exact component={StreamEdit} />
          <Route path="/delete" exact component={StreamDelete} />
          <Route path="/show" exact component={StreamShow} />
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />

          <RenderRoutes />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
