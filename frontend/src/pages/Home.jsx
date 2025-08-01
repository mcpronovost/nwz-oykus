import { useTranslation } from "@/services/translation";
import { OykHeading } from "@/components/common";

export default function Home() {
  const { t } = useTranslation();

  return (
    <section className="oyk-page oyk-home">
      <OykHeading title={t("Home")} />
    </section>
  );
}
