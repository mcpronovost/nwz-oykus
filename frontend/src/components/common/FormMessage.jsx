import { useTranslation } from "@/services/translation";

import OykAlert from "./Alert";

export default function OykFormMessage({ hasError }) {
  const { t } = useTranslation();

  return (
    <div className="oyk-form-message">
      {hasError && (
        <OykAlert title="Error" message={hasError.message || hasError.error || t("An error occurred")} variant="danger" />
      )}
    </div>
  );
}
