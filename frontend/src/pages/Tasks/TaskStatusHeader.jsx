import { useEffect, useState } from "react";
import { Plus, EllipsisVertical, Edit, Trash2 } from "lucide-react";

import { useTranslation } from "@/services/translation";
import { Dropdown, Modal } from "@/components/common";

import ModalTaskCreate from "./modals/ModalTaskCreate";
import ModalStatusEdit from "./modals/ModalStatusEdit";

export default function TaskStatusHeader({ status, statusOptions = [], onTasksUpdate = () => {} }) {
  const { t } = useTranslation();

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const handleCreateClick = () => {
    setIsModalCreateOpen(true);
  };

  const handleCloseModalCreate = (updated) => {
    setIsModalCreateOpen(false);
    if (updated) {
      onTasksUpdate();
    }
  };

  const handleEditClick = () => {
    setIsModalEditOpen(true);
  };

  const handleCloseModalEdit = (updated) => {
    setIsModalEditOpen(false);
    if (updated) {
      onTasksUpdate();
    }
  };

  const handleDeleteClick = () => {
    setIsModalDeleteOpen(true);
  };

  const handleCloseModalDelete = (updated) => {
    setIsModalDeleteOpen(false);
    if (updated) {
      onTasksUpdate();
    }
  };

  return (
    <>
      <ModalTaskCreate
        isOpen={isModalCreateOpen}
        onClose={handleCloseModalCreate}
        status={status}
        statusOptions={statusOptions}
      />
      <ModalStatusEdit
        isOpen={isModalEditOpen}
        onClose={handleCloseModalEdit}
        status={status}
      />
      <Modal
        isOpen={isModalDeleteOpen}
        onClose={handleCloseModalDelete}
        status={status}
      >
        <p>Delete</p>
      </Modal>
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
          <button className="oyk-tasks-status-item-header-actions-btn" onClick={handleCreateClick}>
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
                onClick: handleEditClick,
              },
              {
                label: t("Delete"),
                icon: <Trash2 size={16} />,
                onClick: handleDeleteClick,
              },
            ]}
          />
        </div>
      </header>
    </>
  );
}
