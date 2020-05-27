import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Form from "./components/Form";
import StreamList from "./components/StreamList";
import StreamShow from "./components/StreamShow";
import Header from "./components/Header";
import Edit from "./components/Edit.js";

class RenderRoutes extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Switch>
            <Route path="/" exact component={StreamList} />
            <Route path="/edit/:id" exact component={Edit} />
            <Route path="/create" exact component={Form} />
            <Route
              path="/show/:id"
              render={(routeProps) => (
                <StreamShow {...routeProps} stream={this.props.stream} />
              )}
            />
          </Switch>
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
