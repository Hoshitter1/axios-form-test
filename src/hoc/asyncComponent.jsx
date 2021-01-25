import React, { Component } from "react";

// LazyLoading (a component wrapped with this is not going to be loaded until it is needed)
const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null,
    };
    componentDidMount() {
      importComponent().then((cmp) => {
        this.setState({ component: cmp.default });
      });
    }
    render() {
      const C = this.state.component;
      return C && <C {...this.props} />;
    }
  };
};

export default asyncComponent;
