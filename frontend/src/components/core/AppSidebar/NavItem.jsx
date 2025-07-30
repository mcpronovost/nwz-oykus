import { Chip, Link } from "@/components/common";

export default function NavItem({
  icon: IconComponent,
  text,
  href,
  sideIcon: SideIconComponent,
  sideIconColor = "currentColor",
  sideChip,
  sideChipColor = "default",
}) {
  if (sideIconColor !== "currentColor") {
    sideIconColor = `var(--oyk-c-${sideIconColor})`;
  }

  return (
    <li className="oyk-app-sidebar-nav-item">
      <Link routeName={href} className="oyk-app-sidebar-nav-item-link">
        <span className="oyk-app-sidebar-nav-item-link-icon">
          <IconComponent size={18} />
        </span>
        <span className="oyk-app-sidebar-nav-item-link-text">{text}</span>
        {SideIconComponent && (
          <span className="oyk-app-sidebar-nav-item-link-side-icon">
            <SideIconComponent size={16} color={sideIconColor} />
          </span>
        )}
        {sideChip && (
          <span className="oyk-app-sidebar-nav-item-link-side-chip">
            <Chip color={sideChipColor}>{sideChip}</Chip>
          </span>
        )}
      </Link>
    </li>
  );
}
