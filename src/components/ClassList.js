// src/components/ClassList.js
import React, { useEffect, useState } from "react";
import { fetchClassList } from "../api";

const ClassList = () => {
  const [students, setStudents] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getClassList = async () => {
      try {
        const response = await fetchClassList(token);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching class list:", error);
      }
    };

    getClassList();
  }, [token]);

  return (
    <div>
      <h3>Class List</h3>
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;
