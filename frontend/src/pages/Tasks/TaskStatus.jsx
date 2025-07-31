import { useEffect, useState } from "react";
import { Plus, EllipsisVertical } from "lucide-react";

import { useTranslation } from "@/services/translation";

export default function TaskStatus({ status }) {
  const { t } = useTranslation();

  return (
    <header className="oyk-tasks-status-item-header">
      <div className="oyk-tasks-status-item-header-icon">
        <span
          className="oyk-tasks-status-item-header-icon-dot"
          style={{
            backgroundColor: status.color || "var(--oyk-primary)",
          }}
        />
      </div>
      <h2 className="oyk-tasks-status-item-header-title">
        {status.name}{" "}
        <span className="oyk-tasks-status-item-header-title-count">
          ({status.tasks.length})
        </span>
      </h2>
      <div className="oyk-tasks-status-item-header-actions">
        <button className="oyk-tasks-status-item-header-actions-btn">
          <Plus size={16} />
        </button>
        <button className="oyk-tasks-status-item-header-actions-btn">
          <EllipsisVertical size={16} />
        </button>
      </div>
    </header>
  );
}
