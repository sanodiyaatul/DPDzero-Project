import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("employee");

  const handleRegister = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Registered successfully! Your ID is ${data.id}`);
        navigate("/");
      } else {
        alert("Registration failed.");
      }
    } catch (err) {
      alert("Error connecting to backend.");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white shadow-md rounded-md mt-20">
      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

      <input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      >
        <option value="employee">Employee</option>
        <option value="manager">Manager</option>
      </select>

      <button
        onClick={handleRegister}
        className="bg-green-600 text-white px-4 py-2 w-full rounded hover:bg-green-700"
      >
        Register
      </button>
    </div>
  );
}
