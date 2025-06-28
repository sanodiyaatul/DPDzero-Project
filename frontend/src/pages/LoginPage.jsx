import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("manager");
  const [userId, setUserId] = useState("");

  const handleLogin = async () => {
  if (!userId || isNaN(userId)) {
    alert("Please enter a valid numeric User ID");
    return;
  }

  try {
    const res = await axios.get(`http://localhost:8000/user/${userId}`);
    const user = res.data;

    if (user.role !== role) {
      alert(`User role mismatch. This ID belongs to a ${user.role}.`);
      return;
    }

    // ✅ User exists and role matches — proceed
    if (role === "manager") {
      navigate(`/manager/${user.id}`);
    } else {
      navigate(`/employee/${user.id}`);
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("User not found. Please enter a registered User ID.");
  }
};


  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white shadow-md rounded-md mt-20">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      <input
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      >
        <option value="manager">Manager</option>
        <option value="employee">Employee</option>
      </select>

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
      >
        Login
      </button>

      <p className="mt-4 text-center">
        New here?{" "}
        <span
          onClick={goToRegister}
          className="text-blue-600 underline cursor-pointer"
        >
          Register
        </span>
      </p>
    </div>
  );
}
