import { useState } from "react";

// One task row: checkbox, title (editable), edit and delete buttons
export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const save = async () => {
    const title = draft.trim();
    if (title && title !== task.title) {
      await onEdit(task, title);
    }
    setEditing(false);
  };

  const cancel = () => {
    setDraft(task.title);
    setEditing(false);
  };

  return (
    <li className={`task-item ${task.completed ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
        aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
      />

      {editing ? (
        <input
          className="edit-input"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") cancel();
          }}
          onBlur={save}
        />
      ) : (
        <span className="title">{task.title}</span>
      )}

      {!editing && (
        <button className="ghost" onClick={() => setEditing(true)}>
          Edit
        </button>
      )}
      <button className="danger" onClick={() => onDelete(task._id)}>
        Delete
      </button>
    </li>
  );
}
