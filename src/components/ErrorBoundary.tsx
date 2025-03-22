
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-oldPaper">
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg border border-amber-200">
            <div className="flex items-center gap-3 text-amber-700 mb-4">
              <AlertTriangle className="h-8 w-8" />
              <h2 className="text-2xl font-serif">Something went wrong</h2>
            </div>
            <p className="mb-4 text-gray-700">
              We apologize for the inconvenience. Please try refreshing the page.
            </p>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-48 mb-4">
              {this.state.error?.message}
            </pre>
            <button 
              onClick={() => window.location.reload()} 
              className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}