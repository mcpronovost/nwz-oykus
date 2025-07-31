import "@/styles/page/_tasks.scss";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useTranslation } from "@/services/translation";
import { Heading } from "@/components/common";

import TaskStatus from "./TaskStatus";
import TaskCard from "./TaskCard";

const worldId = 1;

function Tasks() {
  const { t } = useTranslation();

  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const res = await fetch(`/api/world/${worldId}/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  const updateTaskStatus = async (taskId, newStatusId) => {
    try {
      const res = await fetch(`/api/world/${worldId}/tasks/${taskId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ statusId: newStatusId }),
      });

      if (res.ok) {
        // Refresh tasks after successful update
        await getTasks();
      } else {
        console.error("Failed to update task status");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDrop = (taskId, newStatusId) => {
    updateTaskStatus(taskId, newStatusId);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <section className="oyk-tasks">
      <Heading title={t("Tasks")} />
      <DndProvider backend={HTML5Backend}>
        <section className="oyk-tasks-status">
          {tasks.map((status) => (
            <article key={status.name} className="oyk-tasks-status-item">
              <TaskStatus status={status} onDrop={handleDrop} onTasksUpdate={getTasks}>
                <section
                  className={`oyk-tasks-status-item-content ${
                    status.isCompleted
                      ? "oyk-tasks-status-item-content-completed"
                      : ""
                  }`}
                >
                  {status.tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      isCompleted={status.isCompleted}
                      statusId={status.id}
                    />
                  ))}
                </section>
              </TaskStatus>
            </article>
          ))}
        </section>
      </DndProvider>
    </section>
  );
}

export default Tasks;
