import { useEffect, useState } from "react";
import { Ellipsis, History, Trash2, X } from "lucide-react";

import { api } from "@/services/api";
import { useTranslation } from "@/services/translation";
import { oykDate } from "@/utils/formatters";
import {
  OykAvatar,
  OykButton,
  OykDropdown,
  OykForm,
  OykFormField,
  OykFormMessage,
  Modal,
} from "@/components/common";

export default function ModalTaskEdit({ isOpen, onClose, task, statusName }) {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [isShowHistory, setIsShowHistory] = useState(false);
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
        onClose(true);
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

  const onClickShowHistory = () => {
    setIsShowHistory(!isShowHistory);
  };

  useEffect(() => {
    setIsLoading(false);
    setHasError(null);
    setIsShowHistory(false);
  }, [isOpen]);

  return (
    <Modal
      title={statusName}
      isOpen={isOpen}
      onClose={onClose}
      actions={
        <>
          <OykDropdown
            toggle={<OykButton icon={Ellipsis} plain />}
            menu={[
              {
                label: isShowHistory ? t("Hide history") : t("Show history"),
                icon: <History size={16} />,
                onClick: () => onClickShowHistory(),
              },
              {
                divider: true,
              },
              {
                label: t("Delete"),
                icon: <Trash2 size={16} />,
                color: "danger",
                onClick: () => onClose(false, true),
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
          type="textarea"
          defaultValue={formData.content}
          onChange={handleChange}
        />
        <OykFormField
          label={t("Priority")}
          name="priority"
          type="radio"
          options={[
            { label: t("PriorityNone"), value: "" },
            { label: t("PriorityLow"), value: "LOW" },
            { label: t("PriorityMedium"), value: "MEDIUM" },
            { label: t("PriorityHigh"), value: "HIGH" },
          ]}
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
      {isShowHistory && (
        <section className="oyk-modal-section">
          <header className="oyk-modal-section-header">
            <h3 className="oyk-modal-section-header-title">{t("History")}</h3>
            <OykButton icon={X} action={onClickShowHistory} plain />
          </header>
          <div className="oyk-modal-section-content">
            <ul className="oyk-tasks-history">
              {task.history.map((history) => (
                <li key={history.id}>
                  <div className="oyk-tasks-history-avatar">
                    <OykAvatar
                      name={history.changedBy.playerName}
                      abbr={history.changedBy.abbr}
                      size={32}
                    />
                  </div>
                  <div className="oyk-tasks-history-content">
                    <p>
                      {history.changedBy.playerName} {t("taskHistoryAsChanged")}{" "}
                      "{t(`taskHistory${history.changeType}`)}"{" "}
                      {t("taskHistoryFrom")} "
                      {history.changeType === "PRIORITY"
                        ? t(`Priority${history.oldValue}`)
                        : history.oldValue}
                      " {t("taskHistoryTo")} "
                      {history.changeType === "PRIORITY"
                        ? t(`Priority${history.newValue}`)
                        : history.newValue}
                      "<br />
                      {oykDate(history.createdAt)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </Modal>
  );
}
