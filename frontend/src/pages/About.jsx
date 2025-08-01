import { useTranslation } from "@/services/translation";
import { OykHeading } from "@/components/common";

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="oyk-page oyk-about">
      <OykHeading title={t("About")} />
    </section>
  );
}
