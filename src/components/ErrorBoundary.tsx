import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
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
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#000000] text-[#F2F4F7] flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="w-16 h-16 rounded-full bg-[#111113] border border-[#7FA6E0]/30 flex items-center justify-center mb-6 text-[#7FA6E0]">
            <svg
              className="w-8 h-8"
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
          <h1 className="text-2xl md:text-3xl font-display font-medium text-white mb-3">
            Portfolio Display Paused
          </h1>
          <p className="text-[#9AA3AF] max-w-md text-sm md:text-base mb-8 leading-relaxed">
            A temporary rendering glitch occurred. Reload the portfolio to restore the 3D visual scene.
          </p>
          <button
            onClick={this.handleReload}
            className="px-6 py-2.5 rounded-full bg-[#7FA6E0] text-[#000000] text-sm font-medium hover:bg-[#9BBDF2] transition-colors duration-200 cursor-pointer"
          >
            Reload Portfolio
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
