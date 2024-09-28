// src/components/FacultyAdvisors.js
import React, { useEffect, useState } from "react";
import { fetchFacultyAdvisors } from "../api";

const FacultyAdvisors = () => {
  const [advisors, setAdvisors] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getAdvisors = async () => {
      try {
        const response = await fetchFacultyAdvisors(token);
        setAdvisors(response.data);
      } catch (error) {
        console.error("Error fetching advisors:", error);
      }
    };

    getAdvisors();
  }, [token]);

  return (
    <div>
      <h3>Faculty Advisors</h3>
      <ul>
        {advisors.map((advisor) => (
          <li key={advisor.id}>
            {advisor.name} - {advisor.email} - {advisor.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacultyAdvisors;
