import React, { Fragment } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import "./style.css";

const index = (props) => {
  return (
    <div className="nav-wrapper">
      <div
        className={
          "nav-link " +
          (props.history.location.pathname === "/posts" ? "active" : "")
        }
      >
        <Link className="link" to="/posts">
          Posts
        </Link>
      </div>
      <div
        className={
          "nav-link " +
          (props.history.location.pathname === "/new-post" ? "active" : "")
        }
      >
        <Link className="link" to="/new-post">
          New Post
        </Link>
      </div>
    </div>
  );
};
export default withRouter(index);
