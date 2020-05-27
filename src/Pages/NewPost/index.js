import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";
import Spinner from "../../Components/Spinner";
import config from "../../config";
import Axios from "axios";
export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      loading: false,
      added: false,
      error: false,
    };
  }
  onChange = (e) => {
    let changed = {};
    changed[e.target.name] = e.target.value;
    this.setState({ ...changed, error: false });
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.title || !this.state.content)
      this.setState({ error: true });
    else {
      this.setState({ error: false, loading: true });
      let post_length = this.props.posts.length || 0;
      if (!this.state.loading)
        Axios.post(config.API_URL, {
          title: this.state.title,
          body: this.state.content,
        })
          .then((res) => {
            this.setState({ loading: false, added: true });
            this.props.updatePosts(res.data);
          })
          .catch((err) => {
            this.setState({ loading: false });
            console.log(err);
          });
    }
  };
  render() {
    return (
      <div className="new-post-wrapper">
        <span className="new-post-head">Add a Post</span>
        <form onSubmit={this.onSubmit}>
          <span className="new-post-title">Title</span>
          <input
            className="new-post-title-input"
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.onChange}
          />
          <span className="new-post-body">Content</span>
          <textarea
            className="new-post-body-input"
            id="text"
            name="content"
            value={this.state.content}
            onChange={this.onChange}
            rows="4"
            cols="50"
          ></textarea>
          <span className="add-post-button" onClick={this.onSubmit}>
            Add Post
          </span>
          {this.state.error && (
            <span className="new-post-error">Fill all fields</span>
          )}
        </form>
        {this.state.loading ? (
          <Spinner />
        ) : this.state.added ? (
          <span className="new-post-added"> Post added</span>
        ) : (
          ""
        )}
      </div>
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
    updatePosts: (post) => {
      dispatch({ type: "NEW_POST", post });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
