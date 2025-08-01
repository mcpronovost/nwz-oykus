import { User, LogOut, ListTodo, Orbit, Users } from "lucide-react";

import { api } from "@/services/api";
import { useRouter } from "@/services/router";
import { useStore } from "@/services/store";
import { useTranslation } from "@/services/translation";
import { Dropdown } from "@/components/common";

export default function AppBarUser() {
  const { n } = useRouter();
  const { currentUser } = useStore();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await api.logout();
    } finally {
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
          label: t("Your profile"),
          onClick: () => {},
        },
        {
          divider: true,
        },
        {
          label: t("Your worlds"),
          icon: <Orbit size={18} />,
          disabled: true,
          onClick: () => {},
        },
        {
          label: t("Your characters"),
          icon: <Users size={18} />,
          disabled: true,
          onClick: () => {},
        },
        {
          label: t("Your tasks"),
          icon: <ListTodo size={18} />,
          disabled: true,
          onClick: () => {},
        },
        {
          divider: true,
        },
        {
          label: t("Logout"),
          icon: <LogOut size={18} />,
          onClick: handleLogout,
        },
      ]}
    />
    </section>
  );
}