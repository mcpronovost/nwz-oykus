import { useDrop } from "react-dnd";

import TaskStatusHeader from "./TaskStatusHeader";

function TaskStatus({ status, onDrop, children }) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      if (item.statusId !== status.id) {
        onDrop(item.id, status.id);
      }
    },
    canDrop: (item) => item.statusId !== status.id,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div 
      ref={drop}
      className={`oyk-tasks-status-dropzone ${isOver && canDrop ? "oyk-tasks-status-dropzone-over" : ""}`}
    >
      <TaskStatusHeader status={status} />
      {children}
    </div>
  );
}

export default TaskStatus;
