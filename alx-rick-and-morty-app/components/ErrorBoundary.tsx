import { ReactNode } from "react";
import React from "react";
import * as Sentry from '@sentry/react';


interface State {
  hasError: boolean;
}
//`children` is of type ReactNode, representing the child components wrapped by the ErrorBoundary.
interface ErrorBoundaryProps {
  children: ReactNode;
}

// Define the ErrorBoundary class component that extends React.Component.
// It uses the ErrorBoundaryProps interface for props and the State interface for state.
class ErrorBoundary extends
  React.Component<ErrorBoundaryProps, State> {
  // Constructor method initializes the component's state.
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  // Static lifecycle method to update the state when an error is caught.
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }


  ccomponentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.captureException(error, { extra: errorInfo });
  }
  render() {


    if (this.state.hasError) {
      // If an error has occurred, display an error message with a button to retry.
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again?
          </button>
        </div>
      );
    }
    // If no error occurred, render the child components.
    return this.props.children;
  }
}

export default ErrorBoundary;