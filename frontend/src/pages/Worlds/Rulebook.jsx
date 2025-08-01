import { useStore } from "@/services/store";
import { useTranslation } from "@/services/translation";
import { Heading } from "@/components/common";

export default function Rulebook() {
  const { currentWorld } = useStore();
  const { t } = useTranslation();

  return (
    <section className="oyk-page oyk-rulebook">
      <Heading title={t("Rulebook")} />
    </section>
  );
}
