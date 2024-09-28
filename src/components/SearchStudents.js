// src/components/SearchStudents.js
import React, { useState, useEffect } from "react";
import { searchStudents } from "../api";

const SearchStudents = () => {
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    const results = await searchStudents(query);
    setStudents(results.data);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for students"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchStudents;
