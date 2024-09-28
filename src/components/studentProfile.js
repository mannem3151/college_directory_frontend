// src/components/StudentProfile.js
import React, { useEffect, useState } from "react";
import { fetchStudentProfile } from "../api";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetchStudentProfile(token);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    getProfile();
  }, [token]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>{profile.name}'s Profile</h2>
      <img src={profile.photo} alt="Profile" />
      <p>Email: {profile.email}</p>
      <p>Phone: {profile.phone}</p>
      <h3>Academic Information</h3>
      <p>Courses: {profile.courses.join(", ")}</p>
      <p>Grades: {profile.grades.join(", ")}</p>
      <p>Attendance: {profile.attendance.join(", ")}</p>
    </div>
  );
};

export default StudentProfile;
