import "@/styles/page/_tasks.scss";
import { useEffect, useState } from "react";
import { Timer, MessagesSquare, Plus, EllipsisVertical } from "lucide-react";

import { useTranslation } from "@/services/translation";
import { Avatar, Chip, Heading } from "@/components/common";

function Tasks() {
  const { t } = useTranslation();

  const [taskStatus, setTaskStatus] = useState([]);
  const [tasks, setTasks] = useState([]);

  const getTaskStatus = async () => {
    const worldId = 1;
    try {
      const res = await fetch(`/api/world/${worldId}/task-status`);
      const data = await res.json();
      setTaskStatus(data);
    } catch (error) {
      console.error(error);
    } finally {
      getTasks();
    }
  };

  const getTasks = async () => {
    const worldId = 1;
    const res = await fetch(`/api/world/${worldId}/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    getTaskStatus();
  }, []);

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
                .filter((task) => task.statusId === status.id)
                .map((task) => (
                  <article key={task.id} className="oyk-tasks-card">
                    <header className="oyk-tasks-card-header">
                      <h3 className="oyk-tasks-card-header-title">
                        {task.title}
                      </h3>
                      {(task.priority || task.dueDate) && (
                        <div className="oyk-tasks-card-header-infos">
                          {task.priority && (
                            <div className="oyk-tasks-card-header-infos-priority">
                              {task.priority === "HIGH" && (
                                <Chip color="danger">{t("PriorityHigh")}</Chip>
                              )}
                              {task.priority === "MEDIUM" && (
                                <Chip color="warning">{t("PriorityMedium")}</Chip>
                              )}
                              {task.priority === "LOW" && (
                                <Chip color="success">{t("PriorityLow")}</Chip>
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
