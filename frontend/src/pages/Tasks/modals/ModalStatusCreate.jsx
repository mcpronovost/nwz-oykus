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

export default function ModalStatusCreate({
  isOpen,
  onClose,
}) {
  const { currentWorld } = useStore();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    sortOrder: "",
  });

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setHasError(null);
    try {
      const data = await api.createTasksStatus(currentWorld.id, formData);
      if (!data.id) {
        throw new Error(
          data.message || data.error || t("Failed to create status")
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
    <Modal title={t("Create a new status")} isOpen={isOpen} onClose={onClose}>
      <OykForm onSubmit={handleSubmit} isLoading={isLoading}>
        <OykFormField
          label={t("Name")}
          name="name"
          defaultValue={formData.name}
          onChange={handleChange}
          required
        />
        <OykFormField
          label={t("Color")}
          name="color"
          type="color"
          defaultValue={formData.color}
          onChange={handleChange}
        />
        <OykFormField
          label={t("Sort order")}
          name="sortOrder"
          type="number"
          defaultValue={formData.sortOrder}
          onChange={handleChange}
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
