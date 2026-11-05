import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ShopProvider } from './context/ShopContext';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';
import './styles/index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("taatXaal ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#FFF9F0',
          color: '#252322',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            maxWidth: '600px',
            width: '100%',
            backgroundColor: '#FFFFFF',
            border: '2px solid #C6A15B',
            borderRadius: '20px',
            padding: '36px',
            boxShadow: '0 20px 40px rgba(101, 29, 50, 0.12)',
            textAlign: 'center'
          }}>
            <h1 style={{ color: '#651D32', fontSize: '28px', margin: '0 0 12px 0', fontFamily: 'Georgia, serif' }}>
              taatXaal Loom Rejuvenation
            </h1>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', marginBottom: '24px' }}>
              An unexpected render issue occurred. Click the button below to restore the application.
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              style={{
                backgroundColor: '#651D32',
                color: '#FFF9F0',
                border: '1px solid #C6A15B',
                padding: '12px 28px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 'bold',
                cursor: 'pointer',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}
            >
              Reset State &amp; Reload Storefront
            </button>
            {this.state.error && (
              <pre style={{
                marginTop: '24px',
                padding: '12px',
                backgroundColor: '#FAF6EE',
                border: '1px solid #E8D7B7',
                borderRadius: '8px',
                fontSize: '11px',
                textAlign: 'left',
                overflowX: 'auto',
                color: '#7B263C'
              }}>
                {this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AdminProvider>
          <AuthProvider>
            <ShopProvider>
              <App />
            </ShopProvider>
          </AuthProvider>
        </AdminProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
