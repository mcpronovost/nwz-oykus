import "@/styles/page/_tasks.scss";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { api } from "@/services/api";
import { useStore } from "@/services/store";
import { useTranslation } from "@/services/translation";
import AppNotAuthorized from "@/components/core/AppNotAuthorized";
import AppNotFound from "@/components/core/AppNotFound";
import { Heading } from "@/components/common";

import TaskStatus from "./TaskStatus";
import TaskCard from "./TaskCard";

function Tasks() {
  const { currentWorld } = useStore();
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const data = await api.getTasks(currentWorld.id);
      setTasks(data);
    } catch (error) {
      if (error?.status === 401) {
        setError(401);
      } else {
        setError(t("An error occurred while fetching tasks"));
      }
    }
  };

  const updateTaskStatus = async (
    taskId,
    newStatusId,
    oldStatusName,
    newStatusName
  ) => {
    try {
      await api.updateTaskStatus(
        currentWorld.id,
        taskId,
        newStatusId,
        oldStatusName,
        newStatusName
      );
      await getTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDrop = (taskId, newStatusId, oldStatusName, newStatusName) => {
    updateTaskStatus(taskId, newStatusId, oldStatusName, newStatusName);
  };

  useEffect(() => {
    getTasks();
  }, []);

  if (error === 401) {
    return <AppNotAuthorized />;
  }

  if (!currentWorld) {
    return <AppNotFound />;
  }

  return (
    <section className="oyk-tasks">
      <Heading title={t("Tasks")} />
      <DndProvider backend={HTML5Backend}>
        <section className="oyk-tasks-status">
          {tasks.map((status) => (
            <article key={status.name} className="oyk-tasks-status-item">
              <TaskStatus
                status={status}
                onDrop={handleDrop}
                onTasksUpdate={getTasks}
              >
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
                      statusName={status.name}
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
