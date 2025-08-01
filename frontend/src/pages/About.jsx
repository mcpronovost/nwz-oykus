import { useTranslation } from "@/services/translation";
import { Heading } from "@/components/common";

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="oyk-page oyk-about">
      <Heading title={t("About")} />
    </section>
  );
}
