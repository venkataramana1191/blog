import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./style.css";

export class index extends Component {
  handleClick = () => {
    this.props.history.push("/posts/" + this.props.post.id);
  };
  render() {
    return (
      <div className="single-post" onClick={this.handleClick}>
        <span>{this.props.post.title}</span>
      </div>
    );
  }
}

export default withRouter(index);
