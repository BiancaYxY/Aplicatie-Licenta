export const fetchMyLeaves = async () => {
  const res = await fetch("/api/leave/status", {
    credentials: "include",
  });
  return await res.json();
};

export const requestLeave = async (leaveData) => {
  await fetch("/api/leave/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(leaveData),
  });
};

export const fetchTeamLeaves = async () => {
  const res = await fetch("/api/leave", { credentials: "include" });
  return await res.json();
};

export const updateLeaveStatus = async (leaveId, status) => {
  const res = await fetch("/api/leave/set-status", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ leaveId, status }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("Backend error:", errorData.message);
    throw new Error(errorData.message || "Invalid Request");
  }
};

export const fetchUserById = async (userId) => {
  const res = await fetch(`/api/users/profile/${userId}`, {
    credentials: "include",
  });
  return await res.json();
};
