import { useEffect, useState } from "react";
import { Edit, Ellipsis, Trash2, X } from "lucide-react";

import { api } from "@/services/api";
import { useTranslation } from "@/services/translation";
import {
  OykButton,
  OykDropdown,
  OykForm,
  OykFormField,
  OykFormMessage,
  Modal,
} from "@/components/common";

export default function ModalTaskEdit({ isOpen, onClose, task }) {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [formData, setFormData] = useState({
    title: task.title,
    content: task.content,
    priority: task.priority,
    tags: task.tags,
    assignees: task.assignees,
    dueAt: task.dueAt ? task.dueAt.substring(0, 10) : "",
  });

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setHasError(null);
    try {
      const res = await api.updateTask(task.worldId, task.id, formData);
      if (res.id) {
        onClose();
      } else {
        throw new Error("An error occurred while updating the task");
      }
    } catch (error) {
      setHasError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setIsLoading(false);
    setHasError(null);
  }, [isOpen]);

  return (
    <Modal
      title={t("Edit Task")}
      isOpen={isOpen}
      onClose={onClose}
      actions={
        <>
          <OykDropdown
            toggle={<OykButton icon={Ellipsis} plain />}
            menu={[
              {
                label: t("Edit"),
                icon: <Edit size={16} />,
                onClick: () => onClose(true),
              },
              {
                label: t("Delete"),
                icon: <Trash2 size={16} />,
                color: "danger",
                onClick: () => onClose(true),
              },
            ]}
          />
          <OykButton icon={X} action={onClose} plain />
        </>
      }
    >
      <OykForm onSubmit={handleSubmit} isLoading={isLoading}>
        <OykFormField
          label={t("Title")}
          name="title"
          defaultValue={formData.title}
          onChange={handleChange}
        />
        <OykFormField
          label={t("Content")}
          name="content"
          defaultValue={formData.content}
          onChange={handleChange}
        />
        <OykFormField
          label={t("Priority")}
          name="priority"
          defaultValue={formData.priority}
          onChange={handleChange}
        />
        <OykFormField
          label={t("Due At")}
          name="dueAt"
          type="date"
          defaultValue={formData.dueAt}
          onChange={handleChange}
        />
        <OykFormMessage hasError={hasError} />
        <div className="oyk-form-actions">
          <OykButton type="submit" color="primary">
            {t("Save")}
          </OykButton>
          <OykButton type="button" action={onClose} outline>
            {t("Cancel")}
          </OykButton>
        </div>
      </OykForm>
    </Modal>
  );
}
