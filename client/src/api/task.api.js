const API_URL = "https://prime-trade-task-dashboard.onrender.com/api/tasks";

export const getTasks = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const createTask = async (title) => {
  const token = localStorage.getItem("token");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  return res.json();
};

export const updateTask = async (id, updates) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`https://prime-trade-task-dashboard.onrender.com/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  return res.json();
};

export const deleteTask = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`https://prime-trade-task-dashboard.onrender.com/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};