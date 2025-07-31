import { useEffect, useState } from "react";
import { Plus, EllipsisVertical, Edit, Trash2 } from "lucide-react";

import { useTranslation } from "@/services/translation";
import { Dropdown } from "@/components/common";

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
        <Dropdown
          toggle={
            <button className="oyk-tasks-status-item-header-actions-btn">
              <EllipsisVertical size={16} />
            </button>
          }
          menu={[
            {
              label: t("Edit"),
              icon: <Edit size={16} />,
            },
            {
              label: t("Delete"),
              icon: <Trash2 size={16} />,
            },
          ]}
        />
      </div>
    </header>
  );
}
