import { Plus } from "lucide-react";

import { useTranslation } from "@/services/translation";
import { OykButton, OykGrid, OykHeading } from "@/components/common";

export default function SettingsWorlds() {
  const { t } = useTranslation();

  return (
    <OykGrid className="oyk-settings-worlds">
      <OykHeading
        title={t("Your Worlds")}
        actions={
          <>
            <OykButton color="primary" icon={Plus} action={() => {}}>
              {t("Create a new world")}
            </OykButton>
          </>
        }
      />
    </OykGrid>
  );
}
