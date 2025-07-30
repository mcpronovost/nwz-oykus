import { useTranslation } from "@/services/translation";

export default function AppBarMenu() {
  const { t } = useTranslation();

  return (
    <section className="oyk-app-bar-menu">
      <nav className="oyk-app-bar-menu-nav">
        <ul className="oyk-app-bar-menu-nav-list">
          <li className="oyk-app-bar-menu-nav-item">
            <a href="/" className="oyk-app-bar-menu-nav-item-link">
              {t("About")}
            </a>
          </li>
          <li className="oyk-app-bar-menu-nav-item">
            <a href="/" className="oyk-app-bar-menu-nav-item-link">
              {t("Privacy Policy")}
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}
