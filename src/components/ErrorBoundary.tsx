import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary captured error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="py-16 px-6 bg-[#000000] text-[#F2F4F7] flex flex-col items-center justify-center text-center select-none border border-white/5 rounded-2xl m-4">
          <div className="w-12 h-12 rounded-full bg-[#111113] border border-[#7FA6E0]/30 flex items-center justify-center mb-4 text-[#7FA6E0]">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-display font-medium text-white mb-2">
            {this.props.fallbackTitle || 'Component Temporarily Unavailable'}
          </h2>
          <p className="text-[#9AA3AF] max-w-md text-xs sm:text-sm mb-4 leading-relaxed">
            A temporary component error was isolated. The rest of the portfolio remains fully active.
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            className="px-5 py-2 rounded-full bg-[#7FA6E0] text-[#000000] text-xs font-semibold hover:bg-[#9BBDF2] transition-colors duration-200 cursor-pointer"
          >
            Retry Component
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
