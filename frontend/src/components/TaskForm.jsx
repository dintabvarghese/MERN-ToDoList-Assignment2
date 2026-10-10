import { useState } from "react";

// Form for adding a new task
export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the browser's full page reload
    if (!title.trim()) return;
    await onAdd(title);
    setTitle(""); // clear the input
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task…"
        aria-label="New task title"
      />
      <button type="submit">Add</button>
    </form>
  );
}
