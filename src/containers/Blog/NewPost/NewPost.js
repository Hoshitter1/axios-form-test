import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./NewPost.css";

class NewPost extends Component {
  state = {
    title: "",
    content: "",
    author: "Max",
    submitted: false,
  };

  componentDidMount() {
    console.log("NewPost", this.props);
    // if unauth => this.props.history.replace("/posts")
  }

  postDatahandler = () => {
    const data = {
      title: this.state.title,
      content: this.state.content,
      author: this.state.author,
    };
    axios.post("/posts", data).then((response) => {
      console.log("post response", response);
      // this.setState({ submitted: true });
      this.props.history.push("/posts");
    });
  };

  render() {
    return (
      <div>
        {/* {this.state.submitted && <Redirect to="/posts" />} */}
        <div className="NewPost">
          <h1>Add a Post</h1>
          <label>Title</label>
          <input
            type="text"
            value={this.state.title}
            onChange={(event) => this.setState({ title: event.target.value })}
          />
          <label>Content</label>
          <textarea
            rows="4"
            value={this.state.content}
            onChange={(event) => this.setState({ content: event.target.value })}
          />
          <label>Author</label>
          <select
            value={this.state.author}
            onChange={(event) => this.setState({ author: event.target.value })}
          >
            <option value="Max">Max</option>
            <option value="Manu">Manu</option>
          </select>
          <button onClick={this.postDatahandler}>Add Post</button>
        </div>
      </div>
    );
  }
}

export default NewPost;
