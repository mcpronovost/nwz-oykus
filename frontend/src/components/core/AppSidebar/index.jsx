import {
  CircleAlert,
  LayoutDashboard,
  LibraryBig,
  ListTodo,
  Settings,
  ShieldAlert,
  SquircleDashed,
  Users,
} from "lucide-react";
import { useStore } from "@/services/store";
import { useTranslation } from "@/services/translation";
import OykNavItem from "./NavItem";

export default function AppSidebar() {
  const { storeAppSidebarOpen } = useStore();
  const { t } = useTranslation();

  return (
    <aside className={`oyk-app-sidebar ${storeAppSidebarOpen ? "open" : ""}`}>
      <header className="oyk-app-sidebar-header">
        <button className="oyk-app-sidebar-header-button">
          <span className="oyk-app-sidebar-header-button-logo">
            <SquircleDashed size={18} color="var(--oyk-primary-fg)" />
          </span>
          <span className="oyk-app-sidebar-header-button-brand">Oykus</span>
        </button>
      </header>
      <section className="oyk-app-sidebar-menu">
        <nav className="oyk-app-sidebar-nav">
          <ul className="oyk-app-sidebar-nav-list">
            <OykNavItem icon={LayoutDashboard} text={t("Dashboard")} href="home" />
            <OykNavItem icon={ListTodo} text={t("Tasks")} href="tasks" />
          </ul>
          <ul className="oyk-app-sidebar-nav-list">
            <OykNavItem icon={ShieldAlert} text={t("Rulebook")} href="rulebook" disabled />
            <OykNavItem icon={LibraryBig} text={t("Lore")} href="lore" disabled />
            <OykNavItem icon={Users} text={t("Community")} href="community" disabled />
          </ul>
        </nav>
      </section>
      <footer className="oyk-app-sidebar-footer">
        <nav className="oyk-app-sidebar-nav">
          <ul className="oyk-app-sidebar-nav-list">
            <OykNavItem icon={Settings} text={t("Settings")} href="settings" />
          </ul>
        </nav>
      </footer>
    </aside>
  );
}
