import { ArrowLeftFromLine, ArrowRightFromLine, User } from "lucide-react";

import { useStore } from "@/services/store";

import AppBarMenu from "./Menu";
import AppBarNotifications from "./Notifications";
import AppBarUser from "./User";

export default function AppBar() {
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
          <button 
            className="oyk-app-bar-user-button"
            onClick={() => window.location.href = "/en/login"}
          >
            <span className="oyk-app-bar-user-button-name">Sign In</span>
            <span className="oyk-app-bar-user-button-avatar">
              <User size={18} color="var(--oyk-c-primary-fg)" />
            </span>
          </button>
        )}
      </section>
    </header>
  );
}