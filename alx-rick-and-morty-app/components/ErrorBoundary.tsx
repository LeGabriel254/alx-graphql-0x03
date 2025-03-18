import React, { ReactNode } from "react";
import * as Sentry from "@sentry/browser";


// Define the state interface for tracking errors
interface State {
  hasError: boolean;
}

// Define props interface for the ErrorBoundary component
interface ErrorBoundaryProps {
  children: ReactNode; // Accepts React child components
}

// Create the ErrorBoundary class component
class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false }; // Initialize error state
  }

  // Lifecycle method to update state if an error is detected
  static getDerivedStateFromError(): State {
    return { hasError: true }; // Set hasError to true when an error occurs
  }

  // Lifecycle method to log errors to Sentry
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);

    // Convert the errorInfo to a plain object to avoid Sentry type issues
    Sentry.captureException(error, {
      extra: { componentStack: String(errorInfo.componentStack) },
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Oops, something went wrong!</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children; // Render child components if no error occurred
  }
}

export default ErrorBoundary;
