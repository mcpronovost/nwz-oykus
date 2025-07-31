import { useTranslation } from "@/services/translation";

import { Link } from "@/components/common";

export default function AppBarMenu() {
  const { t } = useTranslation();

  return (
    <section className="oyk-app-bar-menu">
      <nav className="oyk-app-bar-menu-nav">
        <ul className="oyk-app-bar-menu-nav-list">
          <li className="oyk-app-bar-menu-nav-item">
            <Link routeName="about" className="oyk-app-bar-menu-nav-item-link">
              {t("About")}
            </Link>
          </li>
          <li className="oyk-app-bar-menu-nav-item">
            <Link routeName="privacy-policy" className="oyk-app-bar-menu-nav-item-link">
              {t("Privacy Policy")}
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
