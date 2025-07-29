import Link from "@/components/common/Link";

export default function NavItem({ icon: IconComponent, text, href }) {
  return (
    <li className="nwz-app-sidebar-nav-item">
      <Link routeName={href} className="nwz-app-sidebar-nav-item-link">
        <span className="nwz-app-sidebar-nav-item-link-icon">
          <IconComponent size={18} />
        </span>
        <span className="nwz-app-sidebar-nav-item-link-text">{text}</span>
      </Link>
    </li>
  );
}
