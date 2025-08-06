import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { useStore } from "@/services/store";

import AppBarMenu from "./Menu";
import AppBarNotifications from "./Notifications";
import AppBarAuth from "./Auth";
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
      <section className="oyk-app-bar-user">{currentUser ? <AppBarUser /> : <AppBarAuth />}</section>
    </header>
  );
}
