import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './Context/AuthContext';
import ProtectedRoute from './Components/Layout/ProtectedRoute';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import AgentDashboard from './Components/Dashboard/AgentDashboard';
import AgentsList from './Components/Admin/AgentsList';
import Reports from './Components/Admin/Reports';
import MyFields from './Components/Agent/MyFields';
import Schedule from './Components/Agent/Schedule';

// Wrapper component that forces re-render on role change
const AppContent = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }
  
  // Use a key based on user role and id to force re-render when user changes
  const appKey = user ? `${user.role}-${user.id}` : 'no-user';
  
  return (
    <div key={appKey}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            {user?.role === 'admin' ? <AdminDashboard /> : <AgentDashboard />}
          </ProtectedRoute>
        } />
        
        {/* Admin Routes */}
        <Route path="/agents" element={
          <ProtectedRoute>
            <AgentsList />
          </ProtectedRoute>
        } />
        
        <Route path="/reports" element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } />
        
        {/* Agent Routes */}
        <Route path="/fields" element={
          <ProtectedRoute>
            <MyFields />
          </ProtectedRoute>
        } />
        
        <Route path="/calendar" element={
          <ProtectedRoute>
            <Schedule />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
