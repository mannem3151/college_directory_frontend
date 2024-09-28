// src/components/AdminManageRecords.js
import React, { useState, useEffect } from "react";
import { fetchStudents, deleteStudent, addStudent } from "../api";

const AdminManageRecords = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const getStudents = async () => {
      const response = await fetchStudents();
      setStudents(response.data);
    };

    getStudents();
  }, []);

  const handleAdd = async () => {
    await addStudent(newStudent);
    // Refresh the student list after adding
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    // Refresh the student list after deletion
  };

  return (
    <div>
      <h3>Manage Records</h3>
      <input
        placeholder="Name"
        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) =>
          setNewStudent({ ...newStudent, email: e.target.value })
        }
      />
      <button onClick={handleAdd}>Add Student</button>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.email}
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminManageRecords;
