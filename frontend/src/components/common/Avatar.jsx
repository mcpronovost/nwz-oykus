import { User } from "lucide-react";

export default function OykAvatar({
  name = "",
  abbr = "",
  src,
  icon: IconComponent = User,
  size = 64,
  bgColor = "var(--oyk-c-primary)",
  fgColor = "var(--oyk-c-primary-fg)",
  borderColor = "var(--oyk-card-bg)",
}) {
  return (
    <div
      className="oyk-avatar"
      style={{
        backgroundColor: src ? borderColor : bgColor,
        borderColor: borderColor,
        color: fgColor,
        width: size,
        height: size,
      }}
    >
      {src ? (
        <img src={src} alt={name} className="oyk-avatar-img" />
      ) : abbr || name ? (
        <span className="oyk-avatar-abbr" style={{ fontSize: size * 0.25 }}>
          {abbr || name.charAt(0).toUpperCase()}
        </span>
      ) : (
        <span className="oyk-avatar-icon">
          <IconComponent size={size * 0.5} />
        </span>
      )}
    </div>
  );
}
