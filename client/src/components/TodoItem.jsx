import { useState } from "react";

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.title);

  const handleSave = () => {
    const title = text.trim();
    if (title && title !== todo.title) onUpdate(todo._id, { title });
    else setText(todo.title);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(todo.title);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onUpdate(todo._id, { completed: !todo.completed })}
        aria-label={`Mark "${todo.title}" as ${todo.completed ? "not done" : "done"}`}
      />

      {isEditing ? (
        <input
          className="edit-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
          autoFocus
        />
      ) : (
        <div className="todo-text" onDoubleClick={() => setIsEditing(true)}>
          <span className="title">{todo.title}</span>
          <span className="meta">
            Added{" "}
            {new Date(todo.createdAt).toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
      )}

      {!isEditing && (
        <div className="actions">
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button className="delete" onClick={() => onDelete(todo._id)}>
            Delete
          </button>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
