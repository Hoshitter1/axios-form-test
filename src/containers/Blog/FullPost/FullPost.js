import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null,
  };

  loadData() {
    const newId = this.props.match.params.id;
    const hasInvalidId = newId === null;
    if (hasInvalidId) {
      return;
    }
    const hasNoLoadedPost = this.state.loadedPost === null;
    if (hasNoLoadedPost) {
      this.fetchPost(newId);
      return;
    }
    const hasUpdatedId = this.state.loadedPost.id !== newId;
    if (hasUpdatedId) {
      this.fetchPost(newId);
      return;
    }
  }

  fetchPost = (id) => {
    axios.get("/posts/" + id).then((response) => {
      this.setState({ loadedPost: response.data });
      console.log(response);
    });
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    // Router does not unmount so use this method for updating the content
    this.loadData();
  }
  deleteHandler = () => {
    axios.delete("/posts/" + this.props.match.params.id).then((response) => {
      console.log("response delete", response);
    });
  };

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.match.params.id) {
      post = <p style={{ textAlign: "center" }}>Loading....!</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.content}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deleteHandler}>
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
