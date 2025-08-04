import { ArrowLeftFromLine, ArrowRightFromLine, User } from "lucide-react";

import { useRouter } from "@/services/router";
import { useStore } from "@/services/store";
import { useTranslation } from "@/services/translation";
import { OykButton } from "@/components/common";

import AppBarMenu from "./Menu";
import AppBarNotifications from "./Notifications";
import AppBarUser from "./User";

export default function AppBar() {
  const { n } = useRouter();
  const { t } = useTranslation();
  const { storeAppSidebarOpen, setStoreAppSidebarOpen, currentUser } = useStore();

  const handleToggleSidebar = () => {
    setStoreAppSidebarOpen(!storeAppSidebarOpen);
  };

  return (
    <header className="oyk-app-bar">
      <section className="oyk-app-bar-toggle">
        <button className="oyk-app-bar-toggle-button" onClick={handleToggleSidebar}>
          {storeAppSidebarOpen ? <ArrowLeftFromLine size={18} /> : <ArrowRightFromLine size={18} />}
        </button>
      </section>
      <AppBarMenu />
      <AppBarNotifications />
      <section className="oyk-app-bar-user">
        {currentUser ? (
          <AppBarUser />
        ) : (
          <OykButton 
            className="oyk-app-bar-user-button"
            action={() => n("login")}
            plain
            style={{
              padding: "0",
            }}
          >
            <span className="oyk-app-bar-user-button-name">{t("Sign In")}</span>
            <span className="oyk-app-bar-user-button-avatar">
              <User size={18} color="var(--oyk-c-primary-fg)" />
            </span>
          </OykButton>
        )}
      </section>
    </header>
  );
}