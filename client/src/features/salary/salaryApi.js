export const fetchMySalaries = async () => {
  const res = await fetch("/api/salary", { credentials: "include" });
  return await res.json();
};

export const downloadPayslip = async () => {
  const res = await fetch("/api/salary/payslip/download", {
    method: "GET",
    credentials: "include",
  });
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "fluturas_salariu.pdf");
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const setSalary = async (data) => {
  const res = await fetch("/api/salary/set", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error adding salary!");
  }
};

export const updateSalary = async (salaryId, data) => {
  const res = await fetch(`/api/salary/update/${salaryId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error when updating salary!");
  }
};

export const fetchAllUsers = async () => {
  const res = await fetch("/api/users/all", {
    credentials: "include"
  });
  return await res.json();
};

export const fetchAllSalaries = async () => {
  const res = await fetch("/api/salary/all", {
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error getting all salaries!");
  }

  return await res.json();
};
