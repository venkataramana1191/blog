import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Posts from "./Pages/Posts";
import NewPost from "./Pages/NewPost";
import SinglePost from "./Pages/SinglePost";
import NotFound from "./Pages/NotFound";
import NavBar from "./Components/NavBar";
import "./App.css";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:post_id" component={SinglePost} />
          <Route exact path="/new-post" component={NewPost} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
