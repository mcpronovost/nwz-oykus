import { useTranslation } from "@/services/translation";
import { Heading } from "@/components/common";

export default function Home() {
  const { t } = useTranslation();

  return (
    <section className="oyk-page oyk-home">
      <Heading title={t("Home")} />
    </section>
  );
}
