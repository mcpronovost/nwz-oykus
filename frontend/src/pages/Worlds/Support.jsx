import { useStore } from "@/services/store";
import { useTranslation } from "@/services/translation";
import { OykHeading } from "@/components/common";

export default function Support() {
  const { currentWorld } = useStore();
  const { t } = useTranslation();

  return (
    <section className="oyk-page oyk-support">
      <OykHeading title={t("Support")} />
    </section>
  );
}
