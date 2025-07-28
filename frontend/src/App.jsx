import React, { useState } from "react";
import { RouterProvider, useRouter } from "./services/router";
import "@/styles/main.scss";

import AppSidebar from "./components/core/AppSidebar";
import AppBar from "./components/core/AppBar";
import AppLoading from "./components/core/AppLoading";

function SettingsModal({ onClose }) {
  const [activeTab, setActiveTab] = useState("statuses");
  const [statuses, setStatuses] = useState([]);
  const [tags, setTags] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [newTag, setNewTag] = useState("");

  React.useEffect(() => {
    Promise.all([
      fetch("/api/world/1/statuses").then(res => res.json()),
      fetch("/api/world/1/tags").then(res => res.json())
    ]).then(([statusesData, tagsData]) => {
      setStatuses(statusesData);
      setTags(tagsData);
    });
  }, []);

  const handleCreateStatus = async () => {
    if (!newStatus.trim()) return;
    
    try {
      const response = await fetch("/api/statuses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newStatus, worldId: 1 })
      });
      
      if (response.ok) {
        const createdStatus = await response.json();
        setStatuses(prev => [...prev, createdStatus]);
        setNewStatus("");
      }
    } catch (error) {
      console.error("Error creating status:", error);
    }
  };

  const handleCreateTag = async () => {
    if (!newTag.trim()) return;
    
    try {
      const response = await fetch("/api/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newTag, worldId: 1 })
      });
      
      if (response.ok) {
        const createdTag = await response.json();
        setTags(prev => [...prev, createdTag]);
        setNewTag("");
      }
    } catch (error) {
      console.error("Error creating tag:", error);
    }
  };

  const handleDeleteStatus = async (statusId) => {
    try {
      await fetch(`/api/statuses/${statusId}`, { method: "DELETE" });
      setStatuses(prev => prev.filter(s => s.id !== statusId));
    } catch (error) {
      console.error("Error deleting status:", error);
    }
  };

  const handleDeleteTag = async (tagId) => {
    try {
      await fetch(`/api/tags/${tagId}`, { method: "DELETE" });
      setTags(prev => prev.filter(t => t.id !== tagId));
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ minWidth: "500px" }}>
        <h2>Settings</h2>
        
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
          <button 
            onClick={() => setActiveTab("statuses")}
            className={activeTab === "statuses" ? "btn-primary" : "btn-secondary"}
            style={{ flex: 1 }}
          >
            Statuses
          </button>
          <button 
            onClick={() => setActiveTab("tags")}
            className={activeTab === "tags" ? "btn-primary" : "btn-secondary"}
            style={{ flex: 1 }}
          >
            Tags
          </button>
        </div>

        {activeTab === "statuses" && (
          <div>
            <div className="form-group">
              <label>Create New Status</label>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  placeholder="Enter status name"
                  style={{ flex: 1 }}
                />
                <button onClick={handleCreateStatus} className="btn-primary">
                  Add
                </button>
              </div>
            </div>
            
            <div>
              <h3>Existing Statuses</h3>
              {statuses.map(status => (
                <div key={status.id} style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  padding: "8px",
                  border: "1px solid #404040",
                  borderRadius: "4px",
                  marginBottom: "8px"
                }}>
                  <span>{status.name}</span>
                  <button 
                    onClick={() => handleDeleteStatus(status.id)}
                    className="btn-danger"
                    style={{ padding: "4px 8px", fontSize: "12px" }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "tags" && (
          <div>
            <div className="form-group">
              <label>Create New Tag</label>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Enter tag name"
                  style={{ flex: 1 }}
                />
                <button onClick={handleCreateTag} className="btn-primary">
                  Add
                </button>
              </div>
            </div>
            
            <div>
              <h3>Existing Tags</h3>
              {tags.map(tag => (
                <div key={tag.id} style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  padding: "8px",
                  border: "1px solid #404040",
                  borderRadius: "4px",
                  marginBottom: "8px"
                }}>
                  <span>{tag.name}</span>
                  <button 
                    onClick={() => handleDeleteTag(tag.id)}
                    className="btn-danger"
                    style={{ padding: "4px 8px", fontSize: "12px" }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-actions">
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Layout() {
  const { route } = useRouter();
  const [showSettings, setShowSettings] = useState(false);
  
  return (
    <div className="nwz-app">
      <AppSidebar />
      <div className="nwz-app-core">
        <AppBar />
        <main className="nwz-app-main">
          {(route && route.component) ? (
            <React.Suspense fallback={<AppLoading />}>
              {React.createElement(route.component)}
            </React.Suspense>
          ) : (
            <div>404</div>
          )}
        </main>
      </div>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}

function App() {
  return (
    <RouterProvider>
      <Layout />
    </RouterProvider>
  );
}

export default App; 