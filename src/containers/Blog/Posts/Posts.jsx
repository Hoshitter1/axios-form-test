import React, { Component } from "react";
import axios from "../../../customAxios";
// import { Link } from "react-router-dom";
import { Route } from "react-router-dom";

import Post from "../../../components/Post/Post";
import "./Posts.css";
import FullPost from "../FullPost/FullPost";

class Posts extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    console.log("this.props", this.props);
    axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: "Hoshito",
          };
        });
        this.setState({ posts: updatedPosts });
        console.log("post Blog", response);
      })
      .catch((err) => {
        // this.setState({ error: true });
        console.log("err", err);
      });
  }
  postSelectedhandler = (id) => {
    // Alternative way to move from one page to another
    // Mostly used when finishing an operation
    this.props.history.push({ pathname: "/posts/" + id });
    // this.setState({ selectedPostId: id });
  };
  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          // <Link to={"/posts/" + post.id} key={post.id}>
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedhandler(post.id)}
          />
          // /* </Link> */
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>;
        <Route
          path={this.props.match.url + "/:id"}
          exact
          component={FullPost}
        />
      </div>
    );
  }
}

export default Posts;
