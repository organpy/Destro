import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
    state = { error: null }
    static getDerivedStateFromError(error) { return { error } }
    componentDidCatch(e, info) { console.error('React crash:', e, info) }
    render() {
        if (this.state.error) {
            return (
                <div style={{ padding: 40, background: '#111', color: '#ff5555', height: '100vh', fontFamily: 'monospace', overflow: 'auto' }}>
                    <h2 style={{ color: '#ff5555' }}>App Crashed — See Error Below</h2>
                    <p style={{ fontSize: 18, color: 'white', marginTop: 16 }}>{this.state.error?.toString()}</p>
                </div>
            )
        }
        return this.props.children
    }
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </React.StrictMode>,
)
