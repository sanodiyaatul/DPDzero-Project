import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EmployeePage() {
  const { userId } = useParams(); // Getting userId from the URL
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/employee/${userId}/feedbacks`);
      console.log("Fetched feedbacks:", res.data); // Debugging output
      setFeedbacks(res.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const acknowledge = async (id) => {
    await axios.put(`http://localhost:8000/feedback/${id}/acknowledge`);
    fetchFeedbacks();
  };

  useEffect(() => {
    if (userId) fetchFeedbacks();
  }, [userId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Employee Dashboard</h1>

      {feedbacks.length === 0 && <p>No feedbacks available.</p>}

      {feedbacks.map((fb) => (
        <div key={fb.id} className="border p-2 mt-2 rounded">
          <p><b>From Manager:</b> {fb.manager_id}</p>
          <p><b>Strengths:</b> {fb.strengths}</p>
          <p><b>Improvements:</b> {fb.improvements}</p>
          <p><b>Sentiment:</b> {fb.sentiment}</p>
          <p><b>Acknowledged:</b> {fb.acknowledged ? "Yes" : "No"}</p>
          {!fb.acknowledged && (
            <button
              onClick={() => acknowledge(fb.id)}
              className="bg-blue-500 text-white px-3 py-1 mt-2 rounded"
            >
              Acknowledge
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
