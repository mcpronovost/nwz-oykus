import "@/styles/page/_tasks.scss";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Plus, Settings } from "lucide-react";

import { api } from "@/services/api";
import { useStore } from "@/services/store";
import { useTranslation } from "@/services/translation";
import AppNotAuthorized from "@/components/core/AppNotAuthorized";
import AppNotFound from "@/components/core/AppNotFound";
import { OykButton, OykHeading } from "@/components/common";

import ModalTaskCreate from "./modals/ModalTaskCreate";
import TaskStatus from "./TaskStatus";
import TaskCard from "./TaskCard";

function Tasks() {
  const { currentUser, currentWorld } = useStore();
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [isModalTaskCreateOpen, setIsModalTaskCreateOpen] = useState(false);

  const getTasks = async () => {
    try {
      const data = await api.getTasks(currentWorld.id);
      setTasks(data);
      setStatusOptions(data.map((s) => ({
        label: s.name,
        value: s.id,
      })));
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

  const handleTaskCreateClick = () => {
    setIsModalTaskCreateOpen(true);
  };

  const handleCloseModalTaskCreate = (updated) => {
    setIsModalTaskCreateOpen(false);
    if (updated) {
      getTasks();
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  if (!currentUser || error === 401) {
    return <AppNotAuthorized />;
  }

  if (!currentWorld) {
    return <AppNotFound />;
  }

  return (
    <section className="oyk-page oyk-tasks">
      <ModalTaskCreate
        isOpen={isModalTaskCreateOpen}
        onClose={handleCloseModalTaskCreate}
        statusOptions={statusOptions}
      />
      <OykHeading
        title={t("Tasks")}
        description={t("Tasks description")}
        actions={
          <>
            <OykButton
              color="primary"
              icon={Plus}
              action={handleTaskCreateClick}
            >
              Create a new task
            </OykButton>
            <OykButton icon={Settings} outline />
          </>
        }
      />
      <DndProvider backend={HTML5Backend}>
        <section className="oyk-tasks-status">
          {tasks.map((status) => (
            <article key={status.name} className="oyk-tasks-status-item">
              <TaskStatus
                status={status}
                statusOptions={statusOptions}
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
                      onCloseTaskEdit={getTasks}
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
