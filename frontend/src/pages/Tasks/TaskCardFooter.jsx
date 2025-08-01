import { MessagesSquare, History } from "lucide-react";

import { OykAvatar } from "@/components/common";

export default function TaskCardFooter({ task }) {
  return (
    <footer className="oyk-tasks-card-footer">
      <div className="oyk-tasks-card-footer-infos">
        {task.history.length > 0 && (
          <div className="oyk-tasks-card-footer-infos-count">
            <History size={14} />
            <span className="oyk-tasks-card-footer-infos-count-total">
              {task.history.length}
            </span>
          </div>
        )}
        {task.comments.length > 0 && (
          <div className="oyk-tasks-card-footer-infos-count">
            <MessagesSquare size={14} />
            <span className="oyk-tasks-card-footer-infos-count-total">
              {task.comments.length}
            </span>
          </div>
        )}
        <div className="oyk-tasks-card-footer-infos-assignees">
          <ul>
            {task.assignees.map((assignee) => (
              <li key={assignee.id}>
                <OykAvatar
                  name={assignee.name}
                  abbr={assignee.abbr}
                  size={24}
                  borderColor="var(--oyk-card-item-bg)"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
