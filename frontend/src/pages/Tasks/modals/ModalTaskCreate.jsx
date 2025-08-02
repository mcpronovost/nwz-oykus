import { useState } from "react";

import { api } from "@/services/api";
import { useStore } from "@/services/store";
import { useTranslation } from "@/services/translation";
import {
  OykButton,
  OykForm,
  OykFormField,
  OykFormMessage,
  Modal,
} from "@/components/common";

export default function ModalTaskCreate({
  isOpen,
  onClose,
  status,
  statusOptions,
}) {
  const { currentUser, currentWorld } = useStore();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    priority: "",
    authorId: currentUser.id,
    statusId: status?.id || "",
    assignees: [],
    tags: [],
  });

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setHasError(null);
    try {
      const data = await api.createTask(currentWorld.id, formData);
      if (!data.id) {
        throw new Error(
          data.message || data.error || t("Failed to create task")
        );
      }
      onClose(true);
    } catch (error) {
      setHasError(
        error.message || error.error || error || t("An error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal title={t("Create a new task")} isOpen={isOpen} onClose={onClose}>
      <OykForm onSubmit={handleSubmit} isLoading={isLoading}>
        <OykFormField
          label={t("Title")}
          name="title"
          defaultValue={formData.title}
          onChange={handleChange}
          required
        />
        <OykFormField
          label={t("Content")}
          name="content"
          type="textarea"
          defaultValue={formData.content}
          onChange={handleChange}
        />
        <OykFormField
          label={t("Priority")}
          name="priority"
          type="select"
          options={[
            { label: t("Low"), value: "LOW" },
            { label: t("Medium"), value: "MEDIUM" },
            { label: t("High"), value: "HIGH" },
          ]}
          defaultValue={formData.priority}
          onChange={handleChange}
        />
        <OykFormField
          label={t("Status")}
          name="statusId"
          type="select"
          options={statusOptions}
          defaultValue={formData.statusId}
          onChange={handleChange}
          required
        />
        <OykFormMessage hasError={hasError} />
        <div className="oyk-form-actions">
          <OykButton type="submit" color="primary">
            {t("Save")}
          </OykButton>
          <OykButton outline action={onClose}>
            {t("Cancel")}
          </OykButton>
        </div>
      </OykForm>
    </Modal>
  );
}
