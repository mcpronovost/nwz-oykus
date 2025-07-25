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

function TaskFormModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Task</h2>
        {/* Form fields will go here */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  useEffect(() => {
    fetch("/api/world/1/tasks")
      .then((res) => res.json())
      .then(setTasks);
  }, []);
  
  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1>Tasks List</h1>
        <button 
          onClick={() => setShowForm(true)}
          style={{
            background: "#3b82f6",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          + New Task
        </button>
      </div>
      <div style={{ display: "grid", gap: "12px" }}>
        {tasks.map((task) => (
          <div key={task.id} className="kanban-card" data-task-id={task.id} onClick={() => setSelectedTask(task)}>
            <div className="card-header">
              <h3 className="card-title">{task.title}</h3>
              <span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
            </div>
            <div className="card-meta">
              <div>👤 {task.author?.username || "Unknown"}</div>
              <div>📅 {new Date(task.createdAt).toLocaleDateString()}</div>
              <div>📊 {task.status?.name}</div>
              {task.assignees?.length > 0 && (
                <div>👥 {task.assignees.length} assigned</div>
              )}
            </div>
          </div>
        ))}
      </div>
      <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      {showForm && <TaskFormModal onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default Tasks; 