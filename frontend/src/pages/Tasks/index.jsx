import "@/styles/page/_tasks.scss";
import { useEffect, useState } from "react";
import { Timer, MessagesSquare, Plus, EllipsisVertical } from "lucide-react";

import { useTranslation } from "@/services/translation";
import { Avatar, Chip, Heading } from "@/components/common";
import TaskCard from "./TaskCard";

function Tasks() {
  const { t } = useTranslation();

  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const worldId = 1;
    const res = await fetch(`/api/world/${worldId}/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <section className="oyk-tasks">
      <Heading title={t("Tasks")} />
      <section className="oyk-tasks-status">
        {tasks.map((status) => (
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
                {status.name}{" "}
                <span className="oyk-tasks-status-item-header-title-count">
                  ({status.tasks.length})
                </span>
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
              {status.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </section>
          </article>
        ))}
      </section>
    </section>
  );
}

export default Tasks;
