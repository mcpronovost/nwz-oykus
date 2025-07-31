import { User } from "lucide-react";

import { api } from "@/services/api";
import { useRouter } from "@/services/router";
import { useStore } from "@/services/store";
import { Dropdown } from "@/components/common";

export default function AppBarUser() {
  const { n } = useRouter();
  const { currentUser } = useStore();

  const handleLogout = async () => {
    try {
      await api.logout();
      n("login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if server logout fails, clear local data and redirect
      n("login");
    }
  };

  return (
    <section className="oyk-app-bar-user">
    <Dropdown
      toggle={
        <button className="oyk-app-bar-user-button">
          <span className="oyk-app-bar-user-button-name">{currentUser.playerName}</span>
          <span className="oyk-app-bar-user-button-avatar">
            <User size={18} color="var(--oyk-primary-fg)" />
          </span>
        </button>
      }
      menu={[
        {
          label: "Logout",
          onClick: handleLogout,
        },
      ]}
    />
    </section>
  );
}