import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import config from "../../config";
import Spinner from "../../Components/Spinner";
import "./style.css";
import Posts from "../Posts";
import Axios from "axios";
export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      deleted: false,
    };
  }

  handelDelete = (e) => {
    e.stopPropagation();
    this.setState({ loading: true });

    Axios.delete(config.API_URL + "/" + this.props.match.params.post_id)
      .then(async (res) => {
        console.log(res);
        let posts = this.props.posts.filter(
          (post) => post.id + "" !== this.props.match.params.post_id
        );
        this.props.updatePosts(posts);
        await this.setState({ loading: false, deleted: true });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };
  render() {
    let post_id = this.props.match.params.post_id;
    let post = null;
    if (this.props.fetch) {
      for (let i = 0; i < this.props.posts.length; i++) {
        let single_post = this.props.posts[i];
        if (single_post.id + "" === post_id) {
          post = single_post;
          break;
        }
      }
    }
    return (
      <Fragment>
        <div className="posts-list-wrapper">
          <Posts />
        </div>
        {this.props.fetch &&
          (post ? (
            !this.state.loading ? (
              <div className="single-post-details">
                <span className="single-post-title">{post.title}</span>
                <span className="single-post-body">{post.body}</span>
                <div className="single-post-delete">
                  <span onClick={this.handelDelete}>delete</span>
                </div>
              </div>
            ) : (
              <Spinner />
            )
          ) : this.state.deleted ? (
            <span className="post-deleted">Post Deleted</span>
          ) : (
            "not found"
          ))}
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
    updatePosts: (posts) => {
      dispatch({ type: "FETCH_POSTS", posts });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
