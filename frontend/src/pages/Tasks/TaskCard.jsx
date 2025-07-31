import "@/styles/page/_tasks.scss";
import { useEffect, useState } from "react";
import { Timer, MessagesSquare, Plus, EllipsisVertical } from "lucide-react";

import { oykDate, oykDateLessThan } from "@/utils";
import { useTranslation } from "@/services/translation";
import { Avatar, Chip, Heading } from "@/components/common";

function TaskCard({ task, isCompleted }) {
  const { t, lang } = useTranslation();

  return (
    <article key={task.id} className="oyk-tasks-card">
      <header className="oyk-tasks-card-header">
        <h3 className="oyk-tasks-card-header-title">{task.title}</h3>
        {(!isCompleted && (task.priority || task.dueAt)) && (
          <div className="oyk-tasks-card-header-infos">
            {task.priority && (
              <div className="oyk-tasks-card-header-infos-priority">
                {task.priority === "HIGH" && (
                  <Chip color="danger" outline>{t("PriorityHigh")}</Chip>
                )}
                {task.priority === "MEDIUM" && (
                  <Chip color="warning" outline>{t("PriorityMedium")}</Chip>
                )}
                {task.priority === "LOW" && (
                  <Chip color="success" outline>{t("PriorityLow")}</Chip>
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
      <section className="oyk-tasks-card-content">
        {(!isCompleted && task.content && task.content != task.title) && (
          <div className="oyk-tasks-card-content-descritpion">
            <p>
              {task.content.length > 64
                ? task.content.slice(0, 64) + "..."
                : task.content}
            </p>
          </div>
        )}
        {(!isCompleted && task.tags.length > 0) && (
          <div className="oyk-tasks-card-content-tags">
            {task.tags.map((tag) => (
              <Chip key={tag.id} color={tag.color || undefined}>
                {tag.name}
              </Chip>
            ))}
          </div>
        )}
      </section>
      <footer className="oyk-tasks-card-footer">
        <div className="oyk-tasks-card-footer-infos">
          {task.comments > 0 && (
            <div className="oyk-tasks-card-footer-infos-comments">
              <MessagesSquare size={14} />
              <span className="oyk-tasks-card-footer-infos-comments-count">
                {task.comments}
              </span>
            </div>
          )}
          <div className="oyk-tasks-card-footer-infos-assignees">
            <ul>
              {task.assignees.map((assignee) => (
                <li key={assignee.id}>
                  <Avatar
                    name={assignee.name}
                    abbr={assignee.abbr}
                    borderColor="var(--oyk-card-item-bg)"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </article>
  );
}

export default TaskCard;
