import { useState } from "react";

import { api } from "@/services/api";
import { useStore } from "@/services/store";
import { useTranslation } from "@/services/translation";
import { OykButton, OykForm, OykFormField, OykFormMessage, Modal } from "@/components/common";

export default function ModalStatusEdit({ isOpen, onClose, status }) {
  const { currentWorld } = useStore();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [formData, setFormData] = useState({
    name: status.name,
    color: status.color,
    sortOrder: status.sortOrder,
  });

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setHasError(null);
    try {
      const data = await api.updateTasksStatus(currentWorld.id, status.id, formData);
      if (!data.id) {
        throw new Error(
          data.message || data.error || t("Failed to edit status")
        );
      }
      onClose(true);
    } catch (error) {
      if ([401, 403].includes(error?.status)) {
        setHasError({
          message: t("You are not allowed to edit this status"),
        });
      } else {
        setHasError({
          message: t("An error occurred while editing the status"),
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal title={t("Edit Status")} isOpen={isOpen} onClose={onClose}>
      <OykForm onSubmit={handleSubmit} isLoading={isLoading}>
        <OykFormField
          label={t("Name")}
          name="name"
          defaultValue={formData.name}
          onChange={handleChange}
        />
        <OykFormField
          label={t("Colour")}
          name="color"
          type="color"
          defaultValue={formData.color}
          onChange={handleChange}
        />
        <OykFormField
          label={t("Sort Order")}
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
          <OykButton type="button" action={onClose} outline>
            {t("Cancel")}
          </OykButton>
        </div>
      </OykForm>
    </Modal>
  );
}
