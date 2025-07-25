import React, { useEffect, useState } from "react";
import "../styles/core/base.scss";

function TaskModal({ task, onClose }) {
  if (!task) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{task.title}</h2>
        <p><strong>Priority:</strong> <span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span></p>
        <p><strong>Status:</strong> {task.status?.name}</p>
        <p><strong>Content:</strong> {task.content}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function Kanban() {
  const [columns, setColumns] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  
  useEffect(() => {
    fetch("/api/world/1/kanban")
      .then((res) => res.json())
      .then(setColumns);
  }, []);
  
  const getStatusColor = (statusName) => {
    const status = statusName?.toLowerCase();
    if (status?.includes("todo")) return "qualified";
    if (status?.includes("progress")) return "contact";
    if (status?.includes("review")) return "review";
    if (status?.includes("done")) return "negotiation";
    return "review";
  };
  
  return (
    <div className="kanban-board">
      {columns.map((col) => (
        <div key={col.id} className="kanban-column" data-status-id={col.id}>
          <h2>
            <span className={`status-indicator ${getStatusColor(col.name)}`}></span>
            {col.name}
          </h2>
          {col.tasks.map((task) => (
            <div key={task.id} className="kanban-card" data-task-id={task.id} onClick={() => setSelectedTask(task)}>
              <div className="card-header">
                <h3 className="card-title">{task.title}</h3>
                <span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
              </div>
              <div className="card-meta">
                <div>👤 {task.author?.username || "Unknown"}</div>
                <div>📅 {new Date(task.createdAt).toLocaleDateString()}</div>
                {task.assignees?.length > 0 && (
                  <div>👥 {task.assignees.length} assigned</div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
      <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
}

export default Kanban; 