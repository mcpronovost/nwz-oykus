import { Timer } from "lucide-react";

import { oykDate, oykDateLessThan } from "@/utils";
import { useTranslation } from "@/services/translation";
import { Chip } from "@/components/common";

export default function TaskCardHeader({ task, isCompleted }) {
  const { t, lang } = useTranslation();

  return (
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
  );
}
