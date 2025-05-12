import React, { useEffect, useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";
import {
  fetchFeedbackSummary,
  fetchNPSReport,
  fetchReceivedFeedback
} from "./feedbackApi";
import "./FeedbackManager.css";

const FeedbackManager = () => {
  const [summary, setSummary] = useState("");
  const [npsReport, setNpsReport] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeedbackData = async () => {
      try {
        const [summaryData, npsData, feedbackData] = await Promise.all([
          fetchFeedbackSummary(),
          fetchNPSReport(),
          fetchReceivedFeedback()
        ]);

        setSummary(summaryData);
        setNpsReport(npsData);
        setFeedbacks(feedbackData);
      } catch (error) {
        console.error("Error loading feedback", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeedbackData();
  }, []);

  if (loading) return <p>Se încarcă feedback-ul...</p>;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content feedback-page">
          <h1>Feedback primit</h1>
            <div className="feedback-summary-box">
                <h3 className="feedback-summary-title">Rezumat</h3>
                    {summary ? (
                        <div className="ai-summary">
                            {summary.split(" - ").map((line, index) => (
                            <p key={index} className="ai-summary-line">
                            {line.trim()}
                            </p>
                            ))}
                        </div>
  ) : (
    <p>Se încarcă rezumatul...</p>
  )}
</div>

          <div className="nps-report">
            <h2>Raport NPS</h2>
            {npsReport ? (
              <ul>
                {Object.entries(npsReport).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> Medie {value.average}, NPS {value.nps}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nicio evaluare disponibilă</p>
            )}
          </div>

          <div className="individual-feedback">
            <h2>Feedbackuri individuale</h2>
            {feedbacks.length === 0 ? (
              <p>Nu există feedback momentan.</p>
            ) : (
              <ul>
                {feedbacks.map((fb) => (
                  <li key={fb.id}>
                    <p><strong>Team Dynamics:</strong> {fb.team_dynamics}</p>
                    <p><strong>Coaching:</strong> {fb.coaching}</p>
                    <p><strong>Communication:</strong> {fb.communication}</p>
                    <p><strong>Decision Making:</strong> {fb.decision_making}</p>
                    <p><strong>Motivation:</strong> {fb.motivation}</p>
                    <p><strong>Feedback scris:</strong> {fb.written_feedback}</p>
                    <hr />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackManager;