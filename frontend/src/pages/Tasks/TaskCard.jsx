import { useDrag } from "react-dnd";

import { Chip } from "@/components/common";

import OykTaskCardHeader from "./TaskCardHeader";
import OykTaskCardFooter from "./TaskCardFooter";

export default function TaskCard({ task, isCompleted, statusId, statusName }) {
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
      <OykTaskCardHeader task={task} isCompleted={isCompleted} />
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
