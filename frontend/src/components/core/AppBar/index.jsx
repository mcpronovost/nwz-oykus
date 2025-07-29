import { ArrowLeftFromLine,User } from "lucide-react";
import AppBarMenu from "./Menu";
import AppBarNotifications from "./Notifications";

export default function AppBar() {
  return (
    <header className="nwz-app-bar">
      <section className="nwz-app-bar-toggle">
        <button className="nwz-app-bar-toggle-button">
          <ArrowLeftFromLine size={18} />
        </button>
      </section>
      <AppBarMenu />
      <AppBarNotifications />
      <section className="nwz-app-bar-user">
        <button className="nwz-app-bar-user-button">
          <span className="nwz-app-bar-user-button-name">John Jones</span>
          <span className="nwz-app-bar-user-button-avatar">
            <User size={18} />
          </span>
        </button>
      </section>
    </header>
  );
}