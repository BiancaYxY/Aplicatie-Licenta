export const getTeamMembers = async () => {
  const res = await fetch("/api/team/members", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error loading team members!");
  return res.json();
};

export const getTeamPerformance = async () => {
  const res = await fetch("/api/team/performance/total", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error loading team performance!");
  return res.json();
};