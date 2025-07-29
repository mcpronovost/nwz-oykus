import { useState } from "react";
import {
  LayoutDashboard,
  LibraryBig,
  ListTodo,
  MessagesSquare,
  Settings,
  ShieldAlert,
  SquircleDashed,
  Users,
} from "lucide-react";
import NwzNavItem from "./NavItem";

export default function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`nwz-app-sidebar ${isOpen ? "open" : ""}`}>
      <header className="nwz-app-sidebar-header">
        <button className="nwz-app-sidebar-header-button">
          <span className="nwz-app-sidebar-header-button-logo">
            <SquircleDashed size={18} />
          </span>
          <span className="nwz-app-sidebar-header-button-brand">Oykus</span>
        </button>
      </header>
      <section className="nwz-app-sidebar-menu">
        <nav className="nwz-app-sidebar-nav">
          <ul className="nwz-app-sidebar-nav-list">
            <NwzNavItem icon={LayoutDashboard} text="Dashboard" href="home" />
            <NwzNavItem icon={ListTodo} text="Tasks" href="tasks" />
          </ul>
          <ul className="nwz-app-sidebar-nav-list">
            <NwzNavItem icon={ShieldAlert} text="Rulebook" href="rulebook" />
            <NwzNavItem icon={LibraryBig} text="Lore" href="lore" />
            <NwzNavItem icon={MessagesSquare} text="Forum" href="forum" />
            <NwzNavItem icon={Users} text="Community" href="community" />
          </ul>
        </nav>
      </section>
      <footer className="nwz-app-sidebar-footer">
        <nav className="nwz-app-sidebar-nav">
          <ul className="nwz-app-sidebar-nav-list">
            <NwzNavItem icon={Settings} text="Settings" href="/404" />
          </ul>
        </nav>
      </footer>
    </aside>
  );
}
