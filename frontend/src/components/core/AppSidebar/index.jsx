import { useState } from "react";
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
import OykNavItem from "./NavItem";

export default function AppSidebar() {
  const { storeAppSidebarOpen } = useStore();

  return (
    <aside className={`oyk-app-sidebar ${storeAppSidebarOpen ? "open" : ""}`}>
      <header className="oyk-app-sidebar-header">
        <button className="oyk-app-sidebar-header-button">
          <span className="oyk-app-sidebar-header-button-logo">
            <SquircleDashed size={18} />
          </span>
          <span className="oyk-app-sidebar-header-button-brand">Oykus</span>
        </button>
      </header>
      <section className="oyk-app-sidebar-menu">
        <nav className="oyk-app-sidebar-nav">
          <ul className="oyk-app-sidebar-nav-list">
            <OykNavItem icon={LayoutDashboard} text="Dashboard" href="home" />
            <OykNavItem icon={ListTodo} text="Tasks" href="tasks" />
          </ul>
          <ul className="oyk-app-sidebar-nav-list">
            <OykNavItem icon={ShieldAlert} text="Rulebook" href="rulebook" sideIcon={CircleAlert} sideIconColor="danger" />
            <OykNavItem icon={LibraryBig} text="Lore" href="lore" sideChip="nouveauté" sideChipColor="primary" />
            <OykNavItem icon={Users} text="Community" href="community" sideChip="2" sideChipColor="primary" />
          </ul>
        </nav>
      </section>
      <footer className="oyk-app-sidebar-footer">
        <nav className="oyk-app-sidebar-nav">
          <ul className="oyk-app-sidebar-nav-list">
            <OykNavItem icon={Settings} text="Settings" href="/404" />
          </ul>
        </nav>
      </footer>
    </aside>
  );
}
