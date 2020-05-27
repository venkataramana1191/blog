import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import config from "../../config";
import Spinner from "../../Components/Spinner";
import Post from "../../Components/Post";
import "./style.css";

export class index extends Component {
  componentDidMount() {
    if (!this.props.fetch) {
      axios
        .get(config.API_URL)
        .then((res) => {
          this.props.fetchComplete(res.data.splice(0, 4));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  handleOpen = (id) => {
    console.log(this.props);
    this.props.history.push("/posts/" + id);
  };
  render() {
    let posts = [];
    if (this.props.fetch) {
      posts = this.props.posts.map((post) => {
        return <Post post={post} key={post.id} onOpen={this.handleOpen} />;
      });
    }
    return (
      <Fragment>
        <div className="posts-outer-wrapper">
          {!this.props.fetch && (
            <div className="posts-loading">
              <Spinner></Spinner>
            </div>
          )}
          {this.props.fetch && <div className="posts-list">{posts}</div>}
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    fetch: state.fetch,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplete: (posts) => {
      dispatch({ type: "FETCH_POSTS", posts });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
