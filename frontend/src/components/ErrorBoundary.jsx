import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center p-4">
          <div className="card bg-base-100 shadow-2xl max-w-2xl w-full">
            <div className="card-body text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-error" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong</h1>
              <p className="text-base-content/70 mb-6">
                We encountered an unexpected error. Don't worry, our team has been notified and we're working on a fix.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mockup-code text-left mb-6 max-h-60 overflow-auto">
                  <pre data-prefix=">" className="text-error">
                    <code>{this.state.error.toString()}</code>
                  </pre>
                  <pre data-prefix=">" className="text-warning">
                    <code>{this.state.errorInfo.componentStack}</code>
                  </pre>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-primary gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
                <Link to="/" className="btn btn-outline gap-2">
                  <Home className="w-4 h-4" />
                  Go Home
                </Link>
              </div>

              <div className="mt-8 text-sm text-base-content/50">
                <p>Error ID: {Date.now()}</p>
                <p>If this problem persists, please contact support.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;