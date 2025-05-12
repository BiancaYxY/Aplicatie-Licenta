import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./Dashboard.css";
import { useAuth } from "../auth/authContext";
import { fetchUserProfile, fetchAnnouncements } from "./dashboardApi";

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (user?.id) {
          const profileData = await fetchUserProfile(user.id);
          setProfile(profileData);

          const announcementsData = await fetchAnnouncements();
          setAnnouncements(announcementsData);
        }
      } catch (err) {
        console.error("Error loading data in dashboard!", err);
      }
    };

    loadData();
  }, [user]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content">
          <h1>Bun venit, {profile?.first_name || "utilizator"}!</h1>

          <h2>Anunțuri</h2>
          {announcements.length === 0 ? (
            <p>Nu există anunțuri momentan.</p>
          ) : (
            <ul>
              {announcements.map((announcement) => (
                <li key={announcement.id}>
                  <strong>{announcement.title}</strong>
                  <p>{announcement.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
