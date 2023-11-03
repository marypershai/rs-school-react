import { Component, ErrorInfo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('Error boundry log: ', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1 className="error-message">
          Something went wrong. Please reload the page
        </h1>
      );
    }

    return this.props.children;
  }
}
