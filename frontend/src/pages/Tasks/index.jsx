import "@/styles/page/_tasks.scss";
import { useEffect, useState } from "react";
import { Plus, EllipsisVertical } from "lucide-react";

import { useTranslation } from "@/services/translation";
import { Heading } from "@/components/common";

import TaskStatus from "./TaskStatus";
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
            <TaskStatus status={status} />
            <section className={`oyk-tasks-status-item-content ${status.isCompleted ? "oyk-tasks-status-item-content-completed" : ""}`}>
              {status.tasks.map((task) => (
                <TaskCard key={task.id} task={task} isCompleted={status.isCompleted} />
              ))}
            </section>
          </article>
        ))}
      </section>
    </section>
  );
}

export default Tasks;
