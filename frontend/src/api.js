// All calls to the Express backend live here.
// Base URL comes from VITE_API_URL, defaulting to the local backend.
const BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api/tasks";

// Shared helper: send the request and throw a readable error on failure
async function request(url, options) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

// GET /api/tasks
export const getTasks = () => request(BASE);

// POST /api/tasks
export const createTask = (title) =>
  request(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

// PUT /api/tasks/:id  (updates = { completed } and/or { title })
export const updateTask = (id, updates) =>
  request(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

// DELETE /api/tasks/:id
export const deleteTask = (id) => request(`${BASE}/${id}`, { method: "DELETE" });
