import { Component } from "react";
import ErrorPage from "./ErrorPage";

export default class ErrorBoundary extends Component {
  state = {
    errors: [],
  };

  componentDidCatch(error, info) {
    this.setState((state) => ({
      errors: [...state.errors, { error, info }],
    }));
  }

  render() {
    return this.state.errors.length ? (
      <ErrorPage errors={this.state.errors} />
    ) : (
      this.props.children
    );
  }
}
