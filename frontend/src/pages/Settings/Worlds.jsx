import { useTranslation } from "@/services/translation";
import { OykGrid, OykHeading } from "@/components/common";

export default function SettingsWorlds() {
  const { t } = useTranslation();

  return (
    <OykGrid className="oyk-settings-worlds">
      <OykHeading title={t("Your Worlds")} />
    </OykGrid>
  );
}
