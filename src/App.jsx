import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import Cameras from './pages/Cameras';
import CameraView from './pages/CameraView';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Docs from './pages/Docs';
import Support from './pages/Support';
import DocumentViewer from './pages/DocumentViewer';

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem('auth');
  if (!isAuth) return <Navigate to="/login" replace />;
  return (
    <div className="app">
      <Sidebar />
      <main className="main" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--gap)', overflow: 'hidden' }}>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/docs/:id" element={<DocumentViewer />} />
        <Route path="/support" element={<Support />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/cameras" element={<ProtectedRoute><Cameras /></ProtectedRoute>} />
        <Route path="/cameras/:id" element={<ProtectedRoute><CameraView /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
