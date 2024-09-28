// src/components/FacultyProfileUpdate.js
import React, { useState, useEffect } from "react";
import { updateFacultyProfile } from "../api";

const FacultyProfileUpdate = () => {
  const [profile, setProfile] = useState({
    email: "",
    phone: "",
  });
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateFacultyProfile(token, profile);
  };

  return (
    <div>
      <h3>Update Profile</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default FacultyProfileUpdate;
