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

function TaskFormModal({ onClose, onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    priority: "MEDIUM",
    statusId: "",
    assigneeIds: [],
    tagIds: []
  });
  const [statuses, setStatuses] = useState([]);
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch statuses, tags, and users for the form
    Promise.all([
      fetch("/api/world/1/statuses").then(res => res.json()),
      fetch("/api/world/1/tags").then(res => res.json()),
      fetch("/api/users").then(res => res.json()).catch(() => []) // Fallback if users endpoint doesn't exist
    ]).then(([statusesData, tagsData, usersData]) => {
      setStatuses(statusesData);
      setTags(tagsData);
      setUsers(usersData);
      if (statusesData.length > 0) {
        setFormData(prev => ({ ...prev, statusId: statusesData[0].id }));
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const data = {
        ...formData,
        statusId: parseInt(formData.statusId),
        worldId: 1,
        authorId: "bf50764f-c2e1-427d-9e30-eb199942851b" // Hardcoded for now
      };
      console.log(data);
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        const newTask = await response.json();
        onTaskCreated?.(newTask);
        onClose();
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="content">Description</label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              placeholder="Enter task description"
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => handleInputChange("priority", e.target.value)}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={formData.statusId}
                onChange={(e) => handleInputChange("statusId", e.target.value)}
                required
              >
                {statuses.map(status => (
                  <option key={status.id} value={status.id}>{status.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="assignees">Assignees</label>
            <select
              id="assignees"
              multiple
              value={formData.assigneeIds}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, option => option.value);
                handleInputChange("assigneeIds", selected);
              }}
            >
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.username}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <select
              id="tags"
              multiple
              value={formData.tagIds}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, option => option.value);
                handleInputChange("tagIds", selected);
              }}
            >
              {tags.map(tag => (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}
            </select>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  const fetchTasks = () => {
    fetch("/api/world/1/tasks")
      .then((res) => res.json())
      .then(setTasks);
  };
  
  useEffect(() => {
    fetchTasks();
  }, []);
  
  const handleTaskCreated = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
  };
  
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
      {showForm && <TaskFormModal onClose={() => setShowForm(false)} onTaskCreated={handleTaskCreated} />}
    </div>
  );
}

export default Tasks; 