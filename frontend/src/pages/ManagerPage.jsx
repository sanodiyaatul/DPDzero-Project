// src/pages/ManagerPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ManagerPage() {
  const { userId } = useParams(); // ✅ Get userId from route
  const [employeeId, setEmployeeId] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({
    strengths: "",
    improvements: "",
    sentiment: "positive",
  });

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/manager/${userId}/team_feedbacks`);
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  const submitFeedback = async () => {
    if (!employeeId || isNaN(employeeId) || !userId || isNaN(userId)) {
      alert("Invalid user/employee ID");
      return;
    }

    const payload = {
      strengths: form.strengths,
      improvements: form.improvements,
      sentiment: form.sentiment,
      employee_id: parseInt(employeeId),
      manager_id: parseInt(userId), // ✅ Ensure it's an integer
    };

    console.log("Submitting feedback payload:", payload);

    try {
      await axios.post("http://localhost:8000/feedback/", payload);
      setForm({ strengths: "", improvements: "", sentiment: "positive" });
      setEmployeeId("");
      fetchFeedbacks();
    } catch (err) {
      console.error("Submit failed:", err.response?.data || err.message);
      alert("Submit failed: " + JSON.stringify(err.response?.data || {}));
    }
  };

  useEffect(() => {
    if (userId) fetchFeedbacks();
  }, [userId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 font-bold">Manager Dashboard</h1>

      <input
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
      />

      <textarea
        placeholder="Strengths"
        className="border p-2 mb-2 w-full rounded"
        value={form.strengths}
        onChange={(e) => setForm({ ...form, strengths: e.target.value })}
      />

      <textarea
        placeholder="Areas to Improve"
        className="border p-2 mb-2 w-full rounded"
        value={form.improvements}
        onChange={(e) => setForm({ ...form, improvements: e.target.value })}
      />

      <select
        value={form.sentiment}
        onChange={(e) => setForm({ ...form, sentiment: e.target.value })}
        className="border p-2 mb-4 w-full rounded"
      >
        <option value="positive">Positive</option>
        <option value="neutral">Neutral</option>
        <option value="negative">Negative</option>
      </select>

      <button
        onClick={submitFeedback}
        className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
      >
        Submit Feedback
      </button>

      <h2 className="text-xl font-semibold mt-6">Feedback History</h2>

      {feedbacks.length === 0 ? (
        <p className="mt-2 text-gray-600">No feedbacks yet.</p>
      ) : (
        feedbacks.map((fb) => (
          <div key={fb.id} className="border p-2 mt-2 rounded">
            <p><b>To:</b> Employee #{fb.employee_id}</p>
            <p><b>Strengths:</b> {fb.strengths}</p>
            <p><b>Improvements:</b> {fb.improvements}</p>
            <p><b>Sentiment:</b> {fb.sentiment}</p>
            <p><b>Acknowledged:</b> {fb.acknowledged ? "Yes" : "No"}</p>
          </div>
        ))
      )}
    </div>
  );
}
