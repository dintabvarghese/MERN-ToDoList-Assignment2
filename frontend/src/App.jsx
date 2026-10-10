import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { getTasks, createTask, updateTask, deleteTask } from "./api.js";

export default function App() {
  const [tasks, setTasks] = useState([]); // all tasks, kept in state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all tasks from the backend once, when the page loads
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Add: POST, then put the new task at the top of the list
  const handleAdd = async (title) => {
    try {
      setError("");
      const task = await createTask(title);
      setTasks((prev) => [task, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Toggle complete/incomplete: PUT, then swap the updated task into state
  const handleToggle = async (task) => {
    try {
      setError("");
      const updated = await updateTask(task._id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // Edit title: PUT, then swap the updated task into state
  const handleEdit = async (task, title) => {
    try {
      setError("");
      const updated = await updateTask(task._id, { title });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete: DELETE, then filter the task out of state
  const handleDelete = async (id) => {
    try {
      setError("");
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <main className="app">
      <h1>To-Do List</h1>
      <p className="subtitle">
        {tasks.length === 0 ? "Nothing here yet" : `${remaining} of ${tasks.length} remaining`}
      </p>

      <TaskForm onAdd={handleAdd} />

      {error && <p className="error" role="alert">{error}</p>}

      {loading ? (
        <p className="empty">Loading…</p>
      ) : (
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
}
