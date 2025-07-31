import { useState } from "react";
import { useTranslation } from "@/services/translation";
import { Modal } from "@/components/common";

export default function ModalTaskCreate({ isOpen, onClose, status }) {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    priority: "LOW",
    authorId: "bf50764f-c2e1-427d-9e30-eb199942851b",
    statusId: status.id,
    assignees: [],
    tags: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/world/1/tasks/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to create task");
      }
      onClose(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="oyk-form-group">
          <label htmlFor="title">{t("Title")}</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="oyk-form-group">
          <label htmlFor="content">{t("Content")}</label>
          <textarea id="content" name="content" value={formData.content} onChange={handleChange} />
        </div>
        <div className="oyk-form-group">
          <label htmlFor="priority">{t("Priority")}</label>
          <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
            <option value="LOW">{t("Low")}</option>
            <option value="MEDIUM">{t("Medium")}</option>
            <option value="HIGH">{t("High")}</option>
          </select>
        </div>
        <div className="oyk-form-group">
          <label htmlFor="statusId">{t("Status")}</label>
          <select id="statusId" name="statusId" value={formData.statusId} onChange={handleChange}>
            <option value="1">{t("To Do")}</option>
            <option value="2">{t("In Progress")}</option>
            <option value="3">{t("Done")}</option>
          </select>
        </div>
        <div className="oyk-form-actions">
          <button type="submit">{t("Save")}</button>
          <button type="button" onClick={onClose}>{t("Cancel")}</button>
        </div>
      </form>
    </Modal>
  );
}
