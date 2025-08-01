import { Timer, MessagesSquare } from "lucide-react";
import { useDrag } from "react-dnd";

import { oykDate, oykDateLessThan } from "@/utils";
import { useTranslation } from "@/services/translation";
import { Avatar, Chip } from "@/components/common";

import OykTaskCardFooter from "./TaskCardFooter";

export default function TaskCard({ task, isCompleted, statusId, statusName }) {
  const { t, lang } = useTranslation();

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, statusId: statusId, statusName: statusName },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <article
      ref={drag}
      key={task.id}
      className={`oyk-tasks-card ${
        isDragging ? "oyk-tasks-card-dragging" : ""
      }`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <header className="oyk-tasks-card-header">
        <h3
          className={`oyk-tasks-card-header-title ${
            isCompleted ? "oyk-tasks-card-header-title-completed" : ""
          }`}
        >
          {task.title}
        </h3>
        {!isCompleted && (task.priority || task.dueAt) && (
          <div className="oyk-tasks-card-header-infos">
            {task.priority && (
              <div className="oyk-tasks-card-header-infos-priority">
                {task.priority === "HIGH" && (
                  <Chip color="danger" outline>
                    {t("PriorityHigh")}
                  </Chip>
                )}
                {task.priority === "MEDIUM" && (
                  <Chip color="warning" outline>
                    {t("PriorityMedium")}
                  </Chip>
                )}
                {task.priority === "LOW" && (
                  <Chip color="success" outline>
                    {t("PriorityLow")}
                  </Chip>
                )}
              </div>
            )}
            {task.dueAt && (
              <div
                className="oyk-tasks-card-header-infos-due"
                style={{
                  color: oykDateLessThan(task.dueAt, 7)
                    ? "var(--oyk-c-danger)"
                    : "inherit",
                }}
              >
                <span className="oyk-tasks-card-header-infos-due-date">
                  {oykDate(task.dueAt, "date", lang)}
                </span>
                <Timer
                  size={14}
                  className="oyk-tasks-card-header-infos-due-icon"
                />
              </div>
            )}
          </div>
        )}
      </header>
      {!isCompleted && (
        <section className="oyk-tasks-card-content">
          {task.content && task.content != task.title && (
            <div className="oyk-tasks-card-content-descritpion">
              <p>
                {task.content.length > 64
                  ? task.content.slice(0, 64) + "..."
                  : task.content}
              </p>
            </div>
          )}
          {task.tags.length > 0 && (
            <div className="oyk-tasks-card-content-tags">
              {task.tags.map((tag) => (
                <Chip key={tag.id} color={tag.color || undefined}>
                  {tag.name}
                </Chip>
              ))}
            </div>
          )}
        </section>
      )}
      <OykTaskCardFooter task={task} />
    </article>
  );
}
