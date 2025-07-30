import "@/styles/page/_tasks.scss";
import { useState } from "react";
import { Timer, MessagesSquare, Plus, EllipsisVertical } from "lucide-react";

import { useTranslation } from "@/services/translation";
import { Avatar, Chip, Heading } from "@/components/common";

function Tasks() {
  const { t } = useTranslation();

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Créer la gestion du lore",
      status: 1,
      priority: "high",
      dueDate: "2025-01-12",
      assignees: [
        {
          id: 1,
          name: "John Jones",
          abbr: "JJ",
        },
        {
          id: 2,
          name: "John Doe",
          abbr: "JD",
        },
      ],
      comments: 0,
    },
    {
      id: 2,
      name: "Créer le backend et le frontend pour la gestion des tâches",
      status: 2,
      priority: "medium",
      dueDate: "2025-01-12",
      assignees: [
        {
          id: 1,
          name: "John Jones",
          abbr: "JJ",
        },
      ],
      comments: 12,
    },
    {
      id: 3,
      name: "Créer le visuel de la page Communauté",
      status: 1,
      priority: "low",
      assignees: [
        {
          id: 1,
          name: "John Jones",
          abbr: "JJ",
        },
      ],
      comments: 0,
    },
  ]);
  const [taskStatus, setTaskStatus] = useState([
    {
      id: 1,
      name: "To Do",
      color: "#217097",
    },
    {
      id: 2,
      name: "In Progress",
      color: "#8d6335",
    },
    {
      id: 4,
      name: "In Review",
      color: "#6c3c95",
    },
    {
      id: 3,
      name: "Done",
      color: "#4a8d35",
    },
    {
      id: 5,
      name: "Cancelled",
      color: "#8d3535",
    },
  ]);

  return (
    <section className="oyk-tasks">
      <Heading title={t("Tasks")} />
      <section className="oyk-tasks-status">
        {taskStatus.map((status) => (
          <article key={status.name} className="oyk-tasks-status-item">
            <header className="oyk-tasks-status-item-header">
              <div className="oyk-tasks-status-item-header-icon">
                <span
                  className="oyk-tasks-status-item-header-icon-dot"
                  style={{
                    backgroundColor: status.color || "var(--oyk-primary)",
                  }}
                />
              </div>
              <h2 className="oyk-tasks-status-item-header-title">
                {status.name}
              </h2>
              <div className="oyk-tasks-status-item-header-actions">
                <button className="oyk-tasks-status-item-header-actions-btn">
                  <Plus size={16} />
                </button>
                <button className="oyk-tasks-status-item-header-actions-btn">
                  <EllipsisVertical size={16} />
                </button>
              </div>
            </header>
            <section className="oyk-tasks-status-item-content">
              {tasks
                .filter((task) => task.status === status.id)
                .map((task) => (
                  <article key={task.id} className="oyk-tasks-card">
                    <header className="oyk-tasks-card-header">
                      <h3 className="oyk-tasks-card-header-title">
                        {task.name}
                      </h3>
                      {(task.priority || task.dueDate) && (
                        <div className="oyk-tasks-card-header-infos">
                          {task.priority && (
                            <div className="oyk-tasks-card-header-infos-priority">
                              {task.priority === "high" && (
                                <Chip color="danger">High</Chip>
                              )}
                              {task.priority === "medium" && (
                                <Chip color="warning">Medium</Chip>
                              )}
                              {task.priority === "low" && (
                                <Chip color="success">Low</Chip>
                              )}
                            </div>
                          )}
                          {task.dueDate && (
                            <div className="oyk-tasks-card-header-infos-datedue">
                              <span className="oyk-tasks-card-header-infos-datedue-label">
                                {task.dueDate}
                              </span>
                              <Timer
                                size={14}
                                className="oyk-tasks-card-header-infos-datedue-icon"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </header>
                    <footer className="oyk-tasks-card-footer">
                      <div className="oyk-tasks-card-footer-infos">
                        {task.comments > 0 && (
                          <div className="oyk-tasks-card-footer-infos-comments">
                            <MessagesSquare size={14} />
                            <span className="oyk-tasks-card-footer-infos-comments-count">
                              {task.comments}
                            </span>
                          </div>
                        )}
                        <div className="oyk-tasks-card-footer-infos-assignees">
                          <ul>
                            {task.assignees.map((assignee) => (
                              <li key={assignee.id}>
                                <Avatar
                                  name={assignee.name}
                                  abbr={assignee.abbr}
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </footer>
                  </article>
                ))}
            </section>
          </article>
        ))}
      </section>
    </section>
  );
}

export default Tasks;
