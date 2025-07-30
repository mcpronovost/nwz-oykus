import { useTranslation } from "@/services/translation";

function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("Home")}</h1>
    </div>
  );
}

export default Home; 