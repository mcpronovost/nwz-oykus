import { useState } from "react";
import { useDrag } from "react-dnd";

import { OykChip } from "@/components/common";

import OykTaskCardHeader from "./TaskCardHeader";
import OykTaskCardFooter from "./TaskCardFooter";
import ModalTaskEdit from "./modals/ModalTaskEdit";
import ModalTaskDelete from "./modals/ModalTaskDelete";

export default function TaskCard({ task, isCompleted, statusId, statusName, onCloseRefresh = () => {} }) {
  const [isModalTaskEditOpen, setIsModalTaskEditOpen] = useState(false);
  const [isModalTaskDeleteOpen, setIsModalTaskDeleteOpen] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, statusId: statusId, statusName: statusName },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const handleEditTaskClose = (doRefresh = false, showDelete = false) => {
    setIsModalTaskEditOpen(false);
    if (showDelete) {
      setIsModalTaskDeleteOpen(true);
    } else if (doRefresh && onCloseRefresh) {
      onCloseRefresh();
    }
  };

  const handleDeleteTaskClose = (doRefresh = false) => {
    setIsModalTaskDeleteOpen(false);
    if (doRefresh && onCloseRefresh) {
      onCloseRefresh();
    }
  };

  return (
    <>
      <ModalTaskEdit isOpen={isModalTaskEditOpen} onClose={handleEditTaskClose} task={task} statusName={statusName} />
      <ModalTaskDelete isOpen={isModalTaskDeleteOpen} onClose={handleDeleteTaskClose} task={task} />
      <article
        ref={drag}
        key={task.id}
        onClick={() => setIsModalTaskEditOpen(true)}
        className={`oyk-tasks-card ${
          isDragging ? "oyk-tasks-card-dragging" : ""
        }`}
        style={{ opacity: isDragging ? 0.5 : isCompleted ? 0.7 : 1 }}
      >
        <OykTaskCardHeader task={task} isCompleted={isCompleted} />
        {!isCompleted && ((task.content && task.content != task.title) || task.tags.length > 0) && (
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
                  <OykChip key={tag.id} color={tag.color || undefined}>
                    {tag.name}
                  </OykChip>
                ))}
              </div>
            )}
          </section>
        )}
        <OykTaskCardFooter task={task} />
      </article>
    </>
  );
}
