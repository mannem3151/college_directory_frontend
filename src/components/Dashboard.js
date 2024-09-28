import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [metrics, setMetrics] = useState({ studentCount: 0, facultyCount: 0 });
  // State for user role
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState(""); // State for user role
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch user role and metrics on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role"); // Get user role from localStorage
    const username = localStorage.getItem("username");
    if (!token || !role || !username) {
      navigate("/login"); // Redirect to login if no token or role found
      return;
    }

    setUserRole(role); // Set user role state
    setUsername(username);

    if (role === "ADMIN") {
      fetchMetrics(token);
    }
  }, [navigate]);

  // Fetch admin metrics (for admin users)
  const fetchMetrics = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMetrics(response.data);
    } catch (error) {
      console.error("Error fetching metrics:", error);
      if (error.response && error.response.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    localStorage.removeItem("role");
    localStorage.removeItem("username"); // Remove the role from localStorage
    navigate("/login"); // Redirect to the login page
  };

  // Render content dynamically based on user role
  const renderContent = () => {
    switch (userRole) {
      case "STUDENT":
        return <StudentDashboard />;
      case "FACULTY_MEMBER":
        return <FacultyDashboard />;
      case "ADMIN":
        return <AdminDashboard metrics={metrics} />;
      default:
        return <p></p>;
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {username || "Guest"} 👋</h2>
      {renderContent()}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

// Student Dashboard Component
const StudentDashboard = () => (
  <div>
    <h3>Student Profile</h3>
    <p>View and manage your personal details and enrolled courses.</p>
    {/* Add more student-specific content */}
  </div>
);

// Faculty Dashboard Component
const FacultyDashboard = () => (
  <div>
    <h3>Faculty Profile</h3>
    <p>View and manage your assigned courses and profile.</p>
    {/* Add more faculty-specific content */}
  </div>
);

// Admin Dashboard Component
const AdminDashboard = ({ metrics }) => (
  <div>
    <h3>Admin Management</h3>
    <p>Student Count: {metrics.studentCount}</p>
    <p>Faculty Count: {metrics.facultyCount}</p>
    <p>Manage student and faculty records, and view other key metrics.</p>
    {/* Add more admin-specific content */}
  </div>
);

export default Dashboard;
