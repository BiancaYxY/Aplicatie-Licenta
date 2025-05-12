import React, { useState } from "react";
import { useAuth } from "../auth/authContext";
import { submitFeedback } from "./feedbackApi";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";
import "./FeedbackEmployee.css";

const FeedbackForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    team_dynamics: 1,
    coaching: 1,
    communication: 1,
    decision_making: 1,
    motivation: 1,
    written_feedback: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.team_lead_id) return alert("Nu există team_lead_id pentru acest utilizator.");

    const payload = {
      ...formData,
      target_id: user.team_lead_id,
      feedback_for: user.team_lead_id, // la fel ca target_id, conform cerinței
    };

    try {
      await submitFeedback(payload);
      alert("Feedback trimis cu succes!");
      setFormData({
        team_dynamics: 1,
        coaching: 1,
        communication: 1,
        decision_making: 1,
        motivation: 1,
        written_feedback: "",
      });
    } catch (error) {
      console.error("Eroare la trimiterea feedbackului:", error);
      alert("Eroare la trimiterea feedbackului.");
    }
  };

  const renderRatingRow = (label, field) => (
    <div className="feedback-row" key={field}>
      <label>{label}</label>
      <div className="rating-options">
        {[...Array(10)].map((_, i) => (
          <label key={i}>
            <input
              type="radio"
              name={field}
              value={i + 1}
              checked={formData[field] === i + 1}
              onChange={() => handleChange(field, i + 1)}
            />
            {i + 1}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content feedback-form-container">
          <h1>Trimite Feedback</h1>
          <form onSubmit={handleSubmit} className="feedback-form">
            <textarea
              placeholder="Scrie feedback-ul tău aici..."
              value={formData.written_feedback}
              onChange={(e) => handleChange("written_feedback", e.target.value)}
              required
            />

            {renderRatingRow("Dinamica echipei", "team_dynamics")}
            {renderRatingRow("Coaching", "coaching")}
            {renderRatingRow("Comunicare", "communication")}
            {renderRatingRow("Luare decizii", "decision_making")}
            {renderRatingRow("Motivație", "motivation")}

            <button type="submit">Trimite</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
