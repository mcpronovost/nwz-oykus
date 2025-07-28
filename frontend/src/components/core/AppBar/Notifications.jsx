import { Bell, Mail, Smile } from "lucide-react";

export default function AppBarNotifications() {
  return (
    <section className="nwz-app-bar-notifications">
      <div className="nwz-app-bar-notifications-group">
        <button className="nwz-app-bar-notifications-button">
          <Bell size={18} />
        </button>
      </div>
      <div className="nwz-app-bar-notifications-group">
        <button className="nwz-app-bar-notifications-button">
          <Smile size={18} />
        </button>
      </div>
      <div className="nwz-app-bar-notifications-group">
        <button className="nwz-app-bar-notifications-button">
          <Mail size={18} />
        </button>
      </div>
    </section>
  );
}