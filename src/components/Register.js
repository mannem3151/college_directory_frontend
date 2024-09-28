import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "STUDENT",
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the register API
      const response = await registerUser(formData);

      if (response && response.data) {
        // If a token is received, store it in localStorage
        localStorage.setItem("token", response.data.token);

        // Redirect to the dashboard or another protected route
        alert("Registration successful, you are now logged in!");
        navigate("/dashboard"); // Change this to the route you want to navigate to
      } else {
        alert("Unexpected response from the server");
      }
    } catch (error) {
      console.error("Error registering:", error);
      // Handle different error types here (e.g., network errors, validation errors)
      if (error.response && error.response.data) {
        alert(
          error.response.data.message ||
            "Registration failed. Please try again."
        );
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
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
        <input
          name="name"
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="phone"
          onChange={handleChange}
          placeholder="Phone"
          required
        />
        <select name="role" onChange={handleChange}>
          <option value="STUDENT">Student</option>
          <option value="FACULTY_MEMBER">Faculty Member</option>
          <option value="ADMINISTRATOR">Administrator</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
