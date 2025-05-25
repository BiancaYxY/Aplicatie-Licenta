export const getAllAnnouncements = async () => {
  const res = await fetch("/api/announcements", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Eroare la încărcarea anunțurilor!");
  return res.json();
};

export const createAnnouncement = async ({ title, content }) => {
  const res = await fetch("/api/announcements/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) throw new Error("Eroare la trimiterea anunțului!");
  return res.json();
};

export const deleteAnnouncement = async (id) => {
  const res = await fetch(`/api/announcements/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Eroare la ștergerea anunțului!");
  return res.json();
};
