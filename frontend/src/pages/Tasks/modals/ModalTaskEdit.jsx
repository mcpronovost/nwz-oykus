import { useEffect, useState } from "react";

import { api } from "@/services/api";
import { useTranslation } from "@/services/translation";
import {
  OykButton,
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
    <Modal title={t("Edit Task")} isOpen={isOpen} onClose={onClose}>
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
        <div className="oyk-form-actions oyk-form-actions-spacing">
          <div className="oyk-form-actions-group">
            <OykButton type="submit" color="primary">
              {t("Save")}
            </OykButton>
            <OykButton type="button" action={onClose} outline>
              {t("Cancel")}
            </OykButton>
          </div>
          <div className="oyk-form-actions-group">
            <OykButton type="button" color="danger" action={() => onClose(true)} outline>
              {t("Delete")}
            </OykButton>
          </div>
        </div>
      </OykForm>
    </Modal>
  );
}
