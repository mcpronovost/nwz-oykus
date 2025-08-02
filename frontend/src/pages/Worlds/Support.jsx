import { useStore } from "@/services/store";
import { useTranslation } from "@/services/translation";
import { OykGrid, OykHeading } from "@/components/common";

export default function Support() {
  const { currentWorld } = useStore();
  const { t } = useTranslation();

  return (
    <section className="oyk-page oyk-support">
      <OykHeading title={t("Support")} />
      <OykGrid className="oyk-world-support-frequent">
        <div className="oyk-world-support-frequent-title">
          <h2>{t("Frequently Asked Questions")}</h2>
          <p>{t("Find answers to common questions about the world")}</p>
        </div>
      </OykGrid>
    </section>
  );
}
