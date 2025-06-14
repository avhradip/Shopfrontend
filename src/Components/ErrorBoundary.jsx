'use client';

import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by ErrorBoundary:', error);
        console.error('Component Stack:', errorInfo.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#991b1b' }}>
                    <h2>Something went wrong.</h2>
                    <p>{this.state.error?.message}</p>
                </div>
            );
        }

        return this.props.children;
    }
}
