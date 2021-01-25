import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";

import "./Blog.css";
import Posts from "./Posts/Posts";
// import NewPosts from "./NewPost/NewPost";
// for lazy loading
import asyncComponent from "../../hoc/asyncComponent";
const AsyncNewPost = asyncComponent(() => {
  return import("./NewPost/NewPost");
});
// From React6.6 or higher use
// const AsyncNewPost = React.lazy(()=>import("path"))
// <Route path="path" render(()=><Suspense fallback={<div>Loading....</div>}><AsyncNewPost /></Suspense>) />
class Blog extends Component {
  state = {
    auth: true,
  };
  render() {
    console.log(this.state.auth);
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/posts"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline",
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true",
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          {/* GUARD */}
          {this.state.auth && (
            <Route path="/new-post" component={AsyncNewPost} />
          )}
          <Route path="/posts" component={Posts} />
          {/* This catches everything that does not match with any url */}
          <Route render={() => <h1>404 Not Found</h1>} />
          {/* <Redirect from="/" to="/posts" /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
