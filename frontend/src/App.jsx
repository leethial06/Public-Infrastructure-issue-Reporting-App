import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
import Report from "./pages/report";
import Complaints from "./pages/complaint";
import Notifications from "./pages/notifications";
import Profile from "./pages/profile";
import AdminDashboard from "./pages/admin-dashboard";
import Rewards from "./pages/reward";

function AdminRoute() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.is_staff !== true) {
    return <Navigate to="/dashboard" replace />;
  }

  return <AdminDashboard />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/auth" element={<Auth />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin Dashboard - Admin Only */}
        <Route
          path="/admin-dashboard"
          element={<AdminRoute />}
        />

        {/* Report Issue */}
        <Route path="/report" element={<Report />} />

        {/* My Complaints */}
        <Route path="/complaints" element={<Complaints />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Notifications */}
        <Route
          path="/notifications"
          element={<Notifications />}
        />

        {/* Rewards */}
        <Route
          path="/reward"
          element={<Rewards />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;