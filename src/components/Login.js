import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // New state for loading
  const [error, setError] = useState(""); // New state for error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(""); // Reset error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the login API and check the response
      const response = await loginUser(credentials);
      localStorage.setItem("username", response.data.user.username); // Set loading to true on submit
      if (response && response.data) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("role", response.data.user.role); // Store the user's role

        console.log(response.data.token); // Store the JWT token
        alert("Login successful");
        navigate("/dashboard"); // Redirect to dashboard after login
      } else {
        alert("Unexpected response from the server");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {error && <p className="error">{error}</p>}{" "}
        {/* Display error message */}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"} {/* Show loading state */}
        </button>
      </form>
    </div>
  );
};

export default Login;
