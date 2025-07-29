import { ArrowLeftFromLine,User } from "lucide-react";
import AppBarMenu from "./Menu";
import AppBarNotifications from "./Notifications";

export default function AppBar() {
  return (
    <header className="oyk-app-bar">
      <section className="oyk-app-bar-toggle">
        <button className="oyk-app-bar-toggle-button">
          <ArrowLeftFromLine size={18} />
        </button>
      </section>
      <AppBarMenu />
      <AppBarNotifications />
      <section className="oyk-app-bar-user">
        <button className="oyk-app-bar-user-button">
          <span className="oyk-app-bar-user-button-name">John Jones</span>
          <span className="oyk-app-bar-user-button-avatar">
            <User size={18} />
          </span>
        </button>
      </section>
    </header>
  );
}