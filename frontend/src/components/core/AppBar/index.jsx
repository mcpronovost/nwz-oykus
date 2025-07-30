import { ArrowLeftFromLine, ArrowRightFromLine, User } from "lucide-react";
import { useStore } from "@/services/store";
import AppBarMenu from "./Menu";
import AppBarNotifications from "./Notifications";

export default function AppBar() {
  const { storeAppSidebarOpen, setStoreAppSidebarOpen } = useStore();

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
        <button className="oyk-app-bar-user-button">
          <span className="oyk-app-bar-user-button-name">John Jones</span>
          <span className="oyk-app-bar-user-button-avatar">
            <User size={18} color="var(--oyk-primary-fg)" />
          </span>
        </button>
      </section>
    </header>
  );
}