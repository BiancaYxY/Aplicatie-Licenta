import React, { useEffect, useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";
import "./Profile.css";
import { useAuth } from "../auth/authContext";
import { fetchUserProfile } from "../dashboard/dashboardApi";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (user?.id) {
        const data = await fetchUserProfile(user.id);
        setProfile(data);
      }
    };
    loadProfile();
  }, [user]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content">
           <h1>Profilul meu</h1>
           <img src="/profile.png" alt="Profile" className="profile-image" />
          {profile ? (
            <div className="profile-details">
              <p><strong>Nume:</strong> {profile.last_name}</p>
              <p><strong>Prenume:</strong> {profile.first_name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Rol:</strong> {profile.rank}</p>
            </div>
          ) : (
            <p>Se încarcă datele...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;