import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // ✅ fixed
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './features/turf/Home';
import TurfList from './features/turf/TurfList';
import TurfDetails from './features/turf/components/TurfDetails';
import BookingForm from './features/booking/BookingForm';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Profile from './features/auth/Profile';
import Dashboard from './features/admin/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/turf" element={<TurfList />} />
            <Route path="/turf/:id" element={<TurfDetails />} />
            <Route path="/book/:id" element={<BookingForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
      <Toaster position="top-right" /> {/* ✅ fixed */}
    </Router>
  );
}

export default App;
