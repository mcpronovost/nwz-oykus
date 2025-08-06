import { Bell, Mail, Smile } from "lucide-react";

export default function AppBarNotifications() {
  return (
    <section className="oyk-app-bar-notifications">
      <div className="oyk-app-bar-notifications-group">
        <button className="oyk-app-bar-notifications-button">
          <Bell size={18} />
        </button>
      </div>
      <div className="oyk-app-bar-notifications-group">
        <button className="oyk-app-bar-notifications-button">
          <Smile size={18} />
        </button>
      </div>
      <div className="oyk-app-bar-notifications-group">
        <button className="oyk-app-bar-notifications-button">
          <Mail size={18} />
        </button>
      </div>
    </section>
  );
}
